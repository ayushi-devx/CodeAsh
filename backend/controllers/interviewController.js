import axios from 'axios';
import dotenv from 'dotenv';
import Interview from '../models/Interview.js';

// Ensure dotenv is loaded
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Debug: Log API key status on load
console.log('🔐 OpenRouter API Key loaded:', OPENROUTER_API_KEY ? `${OPENROUTER_API_KEY.substring(0, 15)}...` : 'NOT FOUND');
console.log('🔐 Full key length:', OPENROUTER_API_KEY?.length || 0);

// Call OpenRouter API
async function callOpenRouter(messages, temperature = 0.7) {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-3.5-turbo', // Reliable paid model
        messages: messages,
        temperature: temperature
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5177',
          'X-Title': 'CodeAsh Interview'
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    throw error;
  }
}

// Start new interview
export const startInterview = async (req, res) => {
  try {
    const { role, experienceLevel } = req.body;
    const userId = req.user.id;

    if (!role || !experienceLevel) {
      return res.status(400).json({
        success: false,
        message: 'Role and experience level are required'
      });
    }

    // Check if OpenRouter API key is valid
    const hasValidApiKey = OPENROUTER_API_KEY && 
                          OPENROUTER_API_KEY.length > 20 &&
                          OPENROUTER_API_KEY.startsWith('sk-or-v1-');

    console.log('🔑 OpenRouter API Key Status:', hasValidApiKey ? 'Valid' : 'Invalid');

    let questions = [];

    if (hasValidApiKey) {
      try {
        console.log('🤖 Generating questions with OpenRouter AI...');
        
        // Generate questions using OpenRouter AI
        const prompt = `You are an expert technical interviewer. Generate 10 progressive interview questions for a ${role} position at ${experienceLevel} level.

Requirements:
- Questions should be technical and role-specific
- Start with easier questions and gradually increase difficulty
- Cover different aspects of the role
- Include practical scenarios
- Each question should test different skills

Return ONLY a JSON array with this exact format:
[
  {
    "questionNumber": 1,
    "question": "Question text here",
    "expectedTopics": ["topic1", "topic2", "topic3"]
  }
]

Generate exactly 10 questions.`;

        const messages = [
          { role: 'user', content: prompt }
        ];

        const responseText = await callOpenRouter(messages, 0.8);
        console.log('✅ OpenRouter AI response received');

        // Extract JSON from response
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          questions = JSON.parse(jsonMatch[0]);
          console.log(`✅ Generated ${questions.length} questions with AI`);
        }
      } catch (aiError) {
        console.error('❌ OpenRouter AI error, falling back to mock questions:', aiError.message);
      }
    } else {
      console.log('⚠️ No valid API key, using fallback questions');
    }

    // Fallback to mock questions if AI fails or no API key
    if (questions.length === 0) {
      questions = generateMockQuestions(role, experienceLevel);
      console.log(`📝 Using ${questions.length} mock questions`);
    }

    // Create interview session
    const interview = await Interview.create({
      userId,
      role,
      experienceLevel,
      questions: questions.map(q => ({
        questionNumber: q.questionNumber,
        question: q.question,
        expectedTopics: q.expectedTopics || []
      })),
      status: 'in-progress'
    });

    res.json({
      success: true,
      data: {
        interviewId: interview._id,
        role: interview.role,
        experienceLevel: interview.experienceLevel,
        totalQuestions: interview.questions.length,
        currentQuestion: interview.questions[0]
      }
    });
  } catch (error) {
    console.error('Start interview error:', error);
    res.status(500).json({
      success: false,
      message: 'Error starting interview',
      error: error.message
    });
  }
};

// Mock question generator
function generateMockQuestions(role, experienceLevel) {
  const questionBank = {
    'Frontend Developer': [
      { q: 'Explain the difference between let, const, and var in JavaScript', topics: ['JavaScript', 'Variables', 'Scope'] },
      { q: 'What is the Virtual DOM in React and how does it work?', topics: ['React', 'Virtual DOM', 'Performance'] },
      { q: 'How do you handle state management in React applications?', topics: ['React', 'State', 'Redux'] },
      { q: 'Explain CSS Flexbox and its main properties', topics: ['CSS', 'Flexbox', 'Layout'] },
      { q: 'What are React Hooks and why were they introduced?', topics: ['React', 'Hooks', 'Functional Components'] },
      { q: 'How do you optimize React application performance?', topics: ['React', 'Performance', 'Optimization'] },
      { q: 'Explain event handling and event delegation in JavaScript', topics: ['JavaScript', 'Events', 'DOM'] },
      { q: 'What is JSX and how is it different from HTML?', topics: ['React', 'JSX', 'Syntax'] },
      { q: 'How do you make API calls in React? Explain different approaches', topics: ['React', 'API', 'Async'] },
      { q: 'Explain the component lifecycle in React', topics: ['React', 'Lifecycle', 'Components'] }
    ],
    'Backend Developer': [
      { q: 'Explain REST API principles and best practices', topics: ['REST', 'API', 'HTTP'] },
      { q: 'What is the difference between SQL and NoSQL databases?', topics: ['Databases', 'SQL', 'NoSQL'] },
      { q: 'How do you implement authentication and authorization?', topics: ['Security', 'Auth', 'JWT'] },
      { q: 'Explain the MVC architecture pattern', topics: ['Architecture', 'MVC', 'Design Patterns'] },
      { q: 'What is middleware in Express.js and how do you use it?', topics: ['Express', 'Middleware', 'Node.js'] },
      { q: 'How do you handle errors in Node.js applications?', topics: ['Node.js', 'Error Handling', 'Best Practices'] },
      { q: 'Explain database indexing and its importance', topics: ['Databases', 'Indexing', 'Performance'] },
      { q: 'What is JWT and how does it work?', topics: ['JWT', 'Authentication', 'Security'] },
      { q: 'How do you secure an API?', topics: ['Security', 'API', 'Best Practices'] },
      { q: 'Explain async/await and Promises in JavaScript', topics: ['JavaScript', 'Async', 'Promises'] }
    ]
  };

  // Get questions for role or use Frontend as default
  const roleQuestions = questionBank[role] || questionBank['Frontend Developer'];
  
  return roleQuestions.map((item, index) => ({
    questionNumber: index + 1,
    question: item.q,
    expectedTopics: item.topics
  }));
}

// Get current question
export const getCurrentQuestion = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const userId = req.user.id;

    const interview = await Interview.findOne({ _id: interviewId, userId });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    const currentQuestion = interview.questions[interview.currentQuestionIndex];

    res.json({
      success: true,
      data: {
        questionNumber: interview.currentQuestionIndex + 1,
        totalQuestions: interview.questions.length,
        question: currentQuestion.question,
        expectedTopics: currentQuestion.expectedTopics,
        isLastQuestion: interview.currentQuestionIndex === interview.questions.length - 1
      }
    });
  } catch (error) {
    console.error('Get question error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching question',
      error: error.message
    });
  }
};

// Submit answer
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { answer, timeSpent } = req.body;
    const userId = req.user.id;

    const interview = await Interview.findOne({ _id: interviewId, userId });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    const currentQuestion = interview.questions[interview.currentQuestionIndex];

    // Check if OpenRouter API key is valid
    const hasValidApiKey = OPENROUTER_API_KEY && 
                          OPENROUTER_API_KEY.length > 20 &&
                          OPENROUTER_API_KEY.startsWith('sk-or-v1-');

    let evaluation = null;

    if (hasValidApiKey) {
      try {
        // Evaluate answer using OpenRouter AI
        const evaluationPrompt = `You are an expert technical interviewer evaluating a candidate's answer.

Role: ${interview.role}
Experience Level: ${interview.experienceLevel}

Question: ${currentQuestion.question}
Expected Topics: ${currentQuestion.expectedTopics.join(', ')}

Candidate's Answer: ${answer}

Evaluate the answer and provide:
1. Score (0-10)
2. Brief feedback (2-3 sentences)
3. What was good
4. What could be improved

Return ONLY a JSON object with this exact format:
{
  "score": 7,
  "feedback": "Your answer demonstrates...",
  "strengths": "Good understanding of...",
  "improvements": "Could improve by..."
}`;

        const messages = [
          { role: 'user', content: evaluationPrompt }
        ];

        const responseText = await callOpenRouter(messages, 0.7);

        // Extract JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          evaluation = JSON.parse(jsonMatch[0]);
        }
      } catch (aiError) {
        console.error('OpenRouter AI evaluation error, using mock evaluation:', aiError.message);
      }
    }

    // Fallback to mock evaluation if AI fails
    if (!evaluation) {
      evaluation = generateMockEvaluation(answer, currentQuestion);
    }

    // Update question with answer and evaluation
    currentQuestion.userAnswer = answer;
    currentQuestion.timeSpent = timeSpent || 0;
    currentQuestion.score = evaluation.score;
    currentQuestion.feedback = evaluation.feedback;
    currentQuestion.answeredAt = new Date();

    // Move to next question
    interview.currentQuestionIndex += 1;

    // If last question, mark as completed
    if (interview.currentQuestionIndex >= interview.questions.length) {
      interview.status = 'completed';
      interview.endTime = new Date();
      interview.calculateOverallScore();

      // Generate overall feedback
      let overallFeedback = null;
      
      if (hasValidApiKey) {
        try {
          const overallPrompt = `Based on this interview performance, provide:
1. Top 3 strengths
2. Top 3 areas for improvement
3. 3 specific recommendations

Interview Details:
- Role: ${interview.role}
- Level: ${interview.experienceLevel}
- Average Score: ${interview.overallScore}/100

Return ONLY a JSON object:
{
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "recommendations": ["rec1", "rec2", "rec3"]
}`;

          const messages = [
            { role: 'user', content: overallPrompt }
          ];

          const responseText = await callOpenRouter(messages, 0.7);
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);

          if (jsonMatch) {
            overallFeedback = JSON.parse(jsonMatch[0]);
          }
        } catch (aiError) {
          console.error('OpenRouter AI overall feedback error, using mock:', aiError.message);
        }
      }

      // Fallback to mock overall feedback
      if (!overallFeedback) {
        overallFeedback = generateMockOverallFeedback(interview);
      }

      interview.strengths = overallFeedback.strengths;
      interview.improvements = overallFeedback.improvements;
      interview.recommendations = overallFeedback.recommendations;
    }

    await interview.save();

    res.json({
      success: true,
      data: {
        evaluation: {
          score: evaluation.score,
          feedback: evaluation.feedback
        },
        isCompleted: interview.status === 'completed',
        nextQuestion: interview.currentQuestionIndex < interview.questions.length
          ? interview.questions[interview.currentQuestionIndex]
          : null
      }
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting answer',
      error: error.message
    });
  }
};

// Get interview report
export const getInterviewReport = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const userId = req.user.id;

    const interview = await Interview.findOne({ _id: interviewId, userId });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }

    res.json({
      success: true,
      data: {
        role: interview.role,
        experienceLevel: interview.experienceLevel,
        overallScore: interview.overallScore,
        totalQuestions: interview.questions.length,
        answeredQuestions: interview.questions.filter(q => q.userAnswer).length,
        startTime: interview.startTime,
        endTime: interview.endTime,
        totalTimeSpent: interview.totalTimeSpent,
        strengths: interview.strengths,
        improvements: interview.improvements,
        recommendations: interview.recommendations,
        questions: interview.questions.map(q => ({
          questionNumber: q.questionNumber,
          question: q.question,
          userAnswer: q.userAnswer,
          score: q.score,
          feedback: q.feedback,
          timeSpent: q.timeSpent
        }))
      }
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching report',
      error: error.message
    });
  }
};

// Get user's interview history
export const getInterviewHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const interviews = await Interview.find({ userId })
      .select('role experienceLevel overallScore status startTime endTime')
      .sort({ startTime: -1 })
      .limit(10);

    res.json({
      success: true,
      data: interviews
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching history',
      error: error.message
    });
  }
};

export default {
  startInterview,
  getCurrentQuestion,
  submitAnswer,
  getInterviewReport,
  getInterviewHistory
};

// Mock evaluation generator
function generateMockEvaluation(answer, question) {
  const answerLength = answer.length;
  const hasKeywords = question.expectedTopics.some(topic => 
    answer.toLowerCase().includes(topic.toLowerCase())
  );
  
  let score = 5; // Base score
  
  // Adjust score based on answer quality
  if (answerLength > 200) score += 2;
  if (answerLength > 400) score += 1;
  if (hasKeywords) score += 2;
  
  score = Math.min(10, score); // Cap at 10
  
  const feedback = score >= 7 
    ? "Your answer demonstrates a good understanding of the concept. You've covered the main points effectively."
    : score >= 5
    ? "Your answer shows basic understanding. Consider adding more details and examples to strengthen your response."
    : "Your answer needs more depth. Try to explain the concept more thoroughly with specific examples.";
  
  return {
    score,
    feedback,
    strengths: hasKeywords ? "Good use of relevant terminology" : "Clear communication",
    improvements: answerLength < 200 ? "Provide more detailed explanations" : "Consider adding practical examples"
  };
}

// Mock overall feedback generator
function generateMockOverallFeedback(interview) {
  const score = interview.overallScore;
  
  const strengths = score >= 70 
    ? [
        "Strong technical knowledge demonstrated across multiple topics",
        "Clear and structured communication style",
        "Good understanding of best practices and industry standards"
      ]
    : [
        "Shows foundational understanding of core concepts",
        "Willing to engage with challenging questions",
        "Demonstrates problem-solving approach"
      ];
  
  const improvements = score >= 70
    ? [
        "Could provide more real-world examples in answers",
        "Consider discussing trade-offs and alternatives more",
        "Expand on edge cases and error handling"
      ]
    : [
        "Strengthen understanding of fundamental concepts",
        "Practice explaining technical concepts more clearly",
        "Study common design patterns and best practices"
      ];
  
  const recommendations = [
    `Continue practicing ${interview.role} interview questions`,
    "Build projects to gain hands-on experience",
    "Review and study areas where you scored lower"
  ];
  
  return { strengths, improvements, recommendations };
}
