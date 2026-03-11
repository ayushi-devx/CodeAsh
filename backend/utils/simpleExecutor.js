// Simple code executor for Windows (Judge0 alternative)
// This is a workaround since Judge0 Docker doesn't work on Windows
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, '../temp');

// Ensure temp directory exists
async function ensureTempDir() {
  try {
    await fs.mkdir(TEMP_DIR, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
}

// Execute JavaScript code
async function executeJavaScript(code, input) {
  await ensureTempDir();
  
  // Use .cjs extension for CommonJS compatibility
  const filename = `script_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.cjs`;
  const filepath = path.join(TEMP_DIR, filename);
  
  try {
    // Fix quote escaping issues - handle multiple levels of escaping
    let cleanCode = code;
    // Remove extra backslashes from JSON encoding
    cleanCode = cleanCode.replace(/\\\\"/g, '"');
    cleanCode = cleanCode.replace(/\\\\'/g, "'");
    cleanCode = cleanCode.replace(/\\\\n/g, '\n');
    cleanCode = cleanCode.replace(/\\\\t/g, '\t');
    cleanCode = cleanCode.replace(/\\"/g, '"');
    cleanCode = cleanCode.replace(/\\'/g, "'");
    
    // Write code to file
    await fs.writeFile(filepath, cleanCode);
    
    // Create input file
    const inputFile = filepath.replace('.cjs', '_input.txt');
    await fs.writeFile(inputFile, input);
    
    const startTime = Date.now();
    
    // Execute with input redirection
    const { stdout, stderr } = await execAsync(
      `node "${filepath}" < "${inputFile}"`,
      {
        timeout: 5000, // 5 second timeout
        maxBuffer: 1024 * 1024 // 1MB buffer
      }
    );
    
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    
    // Cleanup
    await fs.unlink(filepath).catch(() => {});
    await fs.unlink(inputFile).catch(() => {});
    
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      time: executionTime.toFixed(3),
      memory: 0, // Not available in simple execution
      status: { id: 3, description: 'Accepted' },
      compile_output: null
    };
  } catch (error) {
    // Cleanup on error
    await fs.unlink(filepath).catch(() => {});
    await fs.unlink(filepath.replace('.cjs', '_input.txt')).catch(() => {});
    
    if (error.killed) {
      return {
        stdout: '',
        stderr: 'Time Limit Exceeded',
        time: '5.000',
        memory: 0,
        status: { id: 5, description: 'Time Limit Exceeded' },
        compile_output: null
      };
    }
    
    return {
      stdout: '',
      stderr: error.stderr || error.message,
      time: '0.000',
      memory: 0,
      status: { id: 11, description: 'Runtime Error' },
      compile_output: null
    };
  }
}

// Execute Python code
async function executePython(code, input) {
  await ensureTempDir();
  
  const filename = `script_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.py`;
  const filepath = path.join(TEMP_DIR, filename);
  
  try {
    // Fix quote escaping issues
    let cleanCode = code;
    cleanCode = cleanCode.replace(/\\\\"/g, '"');
    cleanCode = cleanCode.replace(/\\\\'/g, "'");
    cleanCode = cleanCode.replace(/\\\\n/g, '\n');
    cleanCode = cleanCode.replace(/\\\\t/g, '\t');
    cleanCode = cleanCode.replace(/\\"/g, '"');
    cleanCode = cleanCode.replace(/\\'/g, "'");
    
    await fs.writeFile(filepath, cleanCode);
    
    const inputFile = filepath.replace('.py', '_input.txt');
    await fs.writeFile(inputFile, input);
    
    const startTime = Date.now();
    
    const { stdout, stderr } = await execAsync(
      `python "${filepath}" < "${inputFile}"`,
      {
        timeout: 5000,
        maxBuffer: 1024 * 1024
      }
    );
    
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    
    await fs.unlink(filepath).catch(() => {});
    await fs.unlink(inputFile).catch(() => {});
    
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      time: executionTime.toFixed(3),
      memory: 0,
      status: { id: 3, description: 'Accepted' },
      compile_output: null
    };
  } catch (error) {
    await fs.unlink(filepath).catch(() => {});
    await fs.unlink(filepath.replace('.py', '_input.txt')).catch(() => {});
    
    if (error.killed) {
      return {
        stdout: '',
        stderr: 'Time Limit Exceeded',
        time: '5.000',
        memory: 0,
        status: { id: 5, description: 'Time Limit Exceeded' },
        compile_output: null
      };
    }
    
    return {
      stdout: '',
      stderr: error.stderr || error.message,
      time: '0.000',
      memory: 0,
      status: { id: 11, description: 'Runtime Error' },
      compile_output: null
    };
  }
}

// Execute Go code
async function executeGo(code, input) {
  await ensureTempDir();
  
  const filename = `script_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.go`;
  const filepath = path.join(TEMP_DIR, filename);
  
  try {
    let cleanCode = code;
    cleanCode = cleanCode.replace(/\\\\"/g, '"');
    cleanCode = cleanCode.replace(/\\\\'/g, "'");
    cleanCode = cleanCode.replace(/\\\\n/g, '\n');
    cleanCode = cleanCode.replace(/\\\\t/g, '\t');
    cleanCode = cleanCode.replace(/\\"/g, '"');
    cleanCode = cleanCode.replace(/\\'/g, "'");
    
    await fs.writeFile(filepath, cleanCode);
    
    const inputFile = filepath.replace('.go', '_input.txt');
    await fs.writeFile(inputFile, input);
    
    const startTime = Date.now();
    
    const { stdout, stderr } = await execAsync(
      `go run "${filepath}" < "${inputFile}"`,
      {
        timeout: 10000, // Go compilation takes more time
        maxBuffer: 1024 * 1024
      }
    );
    
    const endTime = Date.now();
    const executionTime = (endTime - startTime) / 1000;
    
    await fs.unlink(filepath).catch(() => {});
    await fs.unlink(inputFile).catch(() => {});
    
    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      time: executionTime.toFixed(3),
      memory: 0,
      status: { id: 3, description: 'Accepted' },
      compile_output: null
    };
  } catch (error) {
    await fs.unlink(filepath).catch(() => {});
    await fs.unlink(filepath.replace('.go', '_input.txt')).catch(() => {});
    
    if (error.killed) {
      return {
        stdout: '',
        stderr: 'Time Limit Exceeded',
        time: '10.000',
        memory: 0,
        status: { id: 5, description: 'Time Limit Exceeded' },
        compile_output: null
      };
    }
    
    return {
      stdout: '',
      stderr: error.stderr || error.message,
      time: '0.000',
      memory: 0,
      status: { id: 11, description: 'Runtime Error' },
      compile_output: null
    };
  }
}

// Main executor function
export async function executeCode(code, language, input) {
  try {
    switch (language.toLowerCase()) {
      case 'javascript':
        return await executeJavaScript(code, input);
      case 'python':
        return await executePython(code, input);
      case 'go':
        return await executeGo(code, input);
      default:
        return {
          stdout: '',
          stderr: `Language ${language} not supported in simple executor. Use external Judge0 server.`,
          time: '0.000',
          memory: 0,
          status: { id: 13, description: 'Internal Error' },
          compile_output: null
        };
    }
  } catch (error) {
    return {
      stdout: '',
      stderr: error.message,
      time: '0.000',
      memory: 0,
      status: { id: 13, description: 'Internal Error' },
      compile_output: null
    };
  }
}

export default { executeCode };
