import axios from 'axios';
import Problem from '../models/Problem.js';
import User from '../models/User.js';
import { executeCode as simpleExecute } from '../utils/simpleExecutor.js';

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  c: 50
};

// Run code with test cases
export const runCode = async (req, res) => {
  try {
    const { code, language, problemId, customInput } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        message: 'Code and language are required'
      });
    }

    // If custom input, just run once
    if (customInput !== undefined) {
      try {
        const result = await executeCode(code, language, customInput);
        
        return res.json({
          success: true,
          data: {
            results: [{
              input: customInput,
              expectedOutput: '',
              actualOutput: result.stdout || result.stderr || result.compile_output || '',
              passed: !result.stderr && !result.compile_output,
              runtime: result.time,
              memory: result.memory,
              status: result.status.description,
              error: result.stderr || result.compile_output,
              statusId: result.status.id
            }],
            passed: !result.stderr && !result.compile_output ? 1 : 0,
            total: 1,
            allPassed: !result.stderr && !result.compile_output
          }
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Execution error',
          error: error.message
        });
      }
    }

    // Run with problem test cases
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Get public test cases only
    const testCases = problem.testCases.filter(tc => !tc.isHidden);

    if (testCases.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No test cases available'
      });
    }

    const results = [];

    // Execute code for each test case
    for (const testCase of testCases) {
      try {
        const submission = await executeCode(code, language, testCase.input);
        
        // Check if compilation error
        if (submission.compile_output) {
          results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: '',
            passed: false,
            runtime: '0ms',
            memory: '0KB',
            status: 'Compilation Error',
            error: submission.compile_output,
            statusId: 6
          });
          break; // Stop on compilation error
        }

        // Check if runtime error
        if (submission.stderr && submission.status.id !== 3) {
          results.push({
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: '',
            passed: false,
            runtime: submission.time || '0ms',
            memory: submission.memory || '0KB',
            status: 'Runtime Error',
            error: submission.stderr,
            statusId: submission.status.id
          });
          break; // Stop on runtime error
        }

        const passed = submission.stdout?.trim() === testCase.output.trim();

        results.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: submission.stdout || '',
          passed,
          runtime: submission.time ? `${submission.time}s` : '0ms',
          memory: submission.memory ? `${submission.memory}KB` : '0KB',
          status: submission.status.description,
          error: submission.stderr || '',
          statusId: submission.status.id
        });

        // Stop if test case fails
        if (!passed) break;

      } catch (error) {
        results.push({
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: '',
          passed: false,
          error: error.message,
          status: 'Error',
          statusId: 0
        });
        break;
      }
    }

    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;

    res.json({
      success: true,
      data: {
        results,
        passed: passedCount,
        total: totalCount,
        allPassed: passedCount === totalCount && totalCount === testCases.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error running code',
      error: error.message
    });
  }
};

// Submit code (run all test cases including hidden)
export const submitCode = async (req, res) => {
  try {
    const { code, language, problemId } = req.body;
    const userId = req.user.id;

    if (!code || !language || !problemId) {
      return res.status(400).json({
        success: false,
        message: 'Code, language, and problemId are required'
      });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    const user = await User.findById(userId);

    // Run all test cases (including hidden)
    const results = [];
    let totalRuntime = 0;
    let maxMemory = 0;
    let compilationError = null;
    let runtimeError = null;

    for (let i = 0; i < problem.testCases.length; i++) {
      const testCase = problem.testCases[i];
      
      try {
        const submission = await executeCode(code, language, testCase.input);
        
        // Check for compilation error
        if (submission.compile_output) {
          compilationError = submission.compile_output;
          results.push({
            testCase: i + 1,
            passed: false,
            runtime: '0ms',
            memory: '0KB',
            status: 'Compilation Error',
            isHidden: testCase.isHidden
          });
          break;
        }

        // Check for runtime error
        if (submission.stderr && submission.status.id !== 3) {
          runtimeError = submission.stderr;
          results.push({
            testCase: i + 1,
            passed: false,
            runtime: submission.time ? `${submission.time}s` : '0ms',
            memory: submission.memory ? `${submission.memory}KB` : '0KB',
            status: 'Runtime Error',
            isHidden: testCase.isHidden
          });
          break;
        }

        const passed = submission.stdout?.trim() === testCase.output.trim();

        results.push({
          testCase: i + 1,
          passed,
          runtime: submission.time ? `${submission.time}s` : '0ms',
          memory: submission.memory ? `${submission.memory}KB` : '0KB',
          status: submission.status.description,
          isHidden: testCase.isHidden
        });

        totalRuntime += parseFloat(submission.time || 0);
        maxMemory = Math.max(maxMemory, parseFloat(submission.memory || 0));

        // If any test case fails, break early
        if (!passed) break;

      } catch (error) {
        results.push({
          testCase: i + 1,
          passed: false,
          error: error.message,
          status: 'Error',
          isHidden: testCase.isHidden
        });
        break;
      }
    }

    const passedCount = results.filter(r => r.passed).length;
    const totalCount = problem.testCases.length;
    const allPassed = passedCount === totalCount;

    // Determine final status
    let finalStatus = 'Wrong Answer';
    if (compilationError) {
      finalStatus = 'Compilation Error';
    } else if (runtimeError) {
      finalStatus = 'Runtime Error';
    } else if (allPassed) {
      finalStatus = 'Accepted';
    }

    // Update user statistics
    user.totalSubmissions += 1;
    
    if (allPassed) {
      user.acceptedSubmissions += 1;
      
      // Check if already solved
      const alreadySolved = user.solvedProblems.some(
        sp => sp.problemId.toString() === problemId
      );

      if (!alreadySolved) {
        user.solvedProblems.push({
          problemId,
          language,
          runtime: totalRuntime / totalCount
        });
        user.updateStreak();
      }

      // Remove from attempted if exists
      user.attemptedProblems = user.attemptedProblems.filter(
        ap => ap.toString() !== problemId
      );
    } else {
      // Add to attempted if not already there
      if (!user.attemptedProblems.includes(problemId)) {
        user.attemptedProblems.push(problemId);
      }
    }

    // Update language stats
    if (user.languageStats[language] !== undefined) {
      user.languageStats[language] += 1;
    }

    // Add to submission history
    user.submissions.push({
      problemId,
      language,
      code,
      status: finalStatus,
      runtime: totalRuntime / totalCount,
      memory: maxMemory
    });

    await user.save();

    // Update problem statistics
    problem.totalSubmissions += 1;
    if (allPassed) {
      problem.totalAccepted += 1;
      problem.acceptanceRate = ((problem.totalAccepted / problem.totalSubmissions) * 100).toFixed(1);
    }
    await problem.save();

    res.json({
      success: true,
      data: {
        status: finalStatus,
        passed: passedCount,
        total: totalCount,
        runtime: (totalRuntime / Math.max(passedCount, 1)).toFixed(2),
        memory: maxMemory.toFixed(2),
        results,
        compilationError,
        runtimeError
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting code',
      error: error.message
    });
  }
};

// Execute code using Judge0 API (Local Docker or RapidAPI) with fallback to simple executor
async function executeCode(code, language, input) {
  const languageId = LANGUAGE_IDS[language];
  
  if (!languageId) {
    throw new Error('Unsupported language');
  }

  // Try Judge0 first
  try {
    // Use local Judge0 Docker instance (default) or RapidAPI
    const isLocalJudge0 = process.env.JUDGE0_LOCAL === 'true';
    const baseURL = isLocalJudge0 
      ? (process.env.JUDGE0_URL || 'http://localhost:2358')
      : process.env.JUDGE0_API_URL;

    // Create submission
    const createConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    };

    // Add RapidAPI headers if using RapidAPI
    if (!isLocalJudge0) {
      createConfig.headers['X-RapidAPI-Key'] = process.env.JUDGE0_API_KEY;
      createConfig.headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
    }

    const createResponse = await axios.post(
      `${baseURL}/submissions?base64_encoded=true&wait=false`,
      {
        source_code: Buffer.from(code).toString('base64'),
        language_id: languageId,
        stdin: Buffer.from(input).toString('base64'),
        cpu_time_limit: 2,
        memory_limit: 128000
      },
      createConfig
    );

    const token = createResponse.data.token;

    // Poll for result
    let result;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 500));

      const getConfig = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (!isLocalJudge0) {
        getConfig.headers['X-RapidAPI-Key'] = process.env.JUDGE0_API_KEY;
        getConfig.headers['X-RapidAPI-Host'] = 'judge0-ce.p.rapidapi.com';
      }

      const getResponse = await axios.get(
        `${baseURL}/submissions/${token}?base64_encoded=true`,
        getConfig
      );

      result = getResponse.data;

      if (result.status.id > 2) {
        break;
      }

      attempts++;
    }

    return {
      stdout: result.stdout ? Buffer.from(result.stdout, 'base64').toString() : '',
      stderr: result.stderr ? Buffer.from(result.stderr, 'base64').toString() : '',
      compile_output: result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '',
      time: result.time,
      memory: result.memory,
      status: result.status
    };
  } catch (error) {
    // Fallback to simple executor if Judge0 fails (Windows compatibility)
    console.log('Judge0 failed, using simple executor fallback:', error.message);
    
    // Only use fallback for JavaScript and Python
    if (language === 'javascript' || language === 'python') {
      try {
        return await simpleExecute(code, language, input);
      } catch (fallbackError) {
        throw new Error(`Execution error: ${fallbackError.message}`);
      }
    }
    
    throw new Error(`Execution error: ${error.message}`);
  }
}

export default {
  runCode,
  submitCode
};
