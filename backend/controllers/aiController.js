import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Feature 1: Code Explanation
export const explainCode = async (req, res) => {
  try {
    const { code, language, problemTitle } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Code is required'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert programming tutor. Explain the following ${language} code for the problem "${problemTitle}".

Code:
\`\`\`${language}
${code}
\`\`\`

Provide:
1. Brief overview of what the code does
2. Step-by-step explanation of the logic
3. Time and space complexity
4. Any potential improvements or issues

Keep it concise and beginner-friendly.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const explanation = response.text();

    res.json({
      success: true,
      data: {
        explanation
      }
    });
  } catch (error) {
    console.error('AI Explanation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating explanation',
      error: error.message
    });
  }
};

// Feature 2: AI Tutor Chat
export const chatWithAI = async (req, res) => {
  try {
    const { message, problemContext, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = `You are a helpful coding tutor assistant. `;
    
    if (problemContext) {
      prompt += `The user is working on: "${problemContext.title}"\n\n`;
      prompt += `Problem Description: ${problemContext.description}\n\n`;
    }

    if (conversationHistory && conversationHistory.length > 0) {
      prompt += `Previous conversation:\n`;
      conversationHistory.forEach(msg => {
        prompt += `${msg.role}: ${msg.content}\n`;
      });
      prompt += `\n`;
    }

    prompt += `User: ${message}\n\nProvide a helpful, concise response. If they're stuck, give hints without giving away the complete solution.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiResponse = response.text();

    res.json({
      success: true,
      data: {
        message: aiResponse
      }
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in AI chat',
      error: error.message
    });
  }
};

// Feature 3: Problem Generator
export const generateProblem = async (req, res) => {
  try {
    const { topic, difficulty, style } = req.body;

    if (!topic || !difficulty) {
      return res.status(400).json({
        success: false,
        message: 'Topic and difficulty are required'
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Generate a ${difficulty} level coding problem on the topic: ${topic}.

${style ? `Style: ${style}` : ''}

Provide the problem in this exact JSON format:
{
  "title": "Problem Title",
  "description": "Detailed problem description with examples",
  "difficulty": "${difficulty}",
  "tags": ["tag1", "tag2"],
  "constraints": ["constraint1", "constraint2"],
  "examples": [
    {
      "input": "example input",
      "output": "example output",
      "explanation": "why this output"
    }
  ],
  "hints": ["hint1", "hint2"],
  "testCases": [
    {
      "input": "test input",
      "output": "expected output"
    }
  ]
}

Make it interesting and educational. Similar to LeetCode style problems.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let problemText = response.text();

    // Try to extract JSON from response
    const jsonMatch = problemText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const problemData = JSON.parse(jsonMatch[0]);
      
      res.json({
        success: true,
        data: problemData
      });
    } else {
      // If JSON parsing fails, return raw text
      res.json({
        success: true,
        data: {
          title: `${topic} Problem`,
          description: problemText,
          difficulty,
          tags: [topic],
          rawResponse: true
        }
      });
    }
  } catch (error) {
    console.error('Problem Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating problem',
      error: error.message
    });
  }
};

// Get AI Hints for a problem
export const getHints = async (req, res) => {
  try {
    const { problemTitle, problemDescription, userCode } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Problem: ${problemTitle}

Description: ${problemDescription}

${userCode ? `User's current code:\n\`\`\`\n${userCode}\n\`\`\`` : ''}

Provide 3 progressive hints to help solve this problem:
1. A gentle nudge in the right direction
2. A more specific hint about the approach
3. A hint about implementation details

Don't give away the complete solution. Keep hints educational.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const hints = response.text();

    res.json({
      success: true,
      data: {
        hints
      }
    });
  } catch (error) {
    console.error('Hints Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating hints',
      error: error.message
    });
  }
};

export default {
  explainCode,
  chatWithAI,
  generateProblem,
  getHints
};
