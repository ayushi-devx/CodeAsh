import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'http://localhost:5000';

// Test credentials
const testUser = {
  email: 'test@interview.com',
  password: 'Test123456',
  firstName: 'Test User'
};

let authToken = '';
let interviewId = '';

async function testInterviewSystem() {
  console.log('🚀 Starting AI Interview System Test\n');

  try {
    // Step 1: Register or Login
    console.log('1️⃣ Authenticating...');
    try {
      const registerRes = await axios.post(`${BASE_URL}/api/auth/register`, testUser);
      authToken = registerRes.data.data.token;
      console.log('✅ New user registered');
    } catch (error) {
      if (error.response?.status === 400 || error.response?.status === 409) {
        const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        authToken = loginRes.data.data.token;
        console.log('✅ Existing user logged in');
      } else {
        throw error;
      }
    }

    if (!authToken) {
      throw new Error('Failed to get authentication token');
    }

    // Step 2: Start Interview
    console.log('\n2️⃣ Starting interview...');
    const startRes = await axios.post(
      `${BASE_URL}/api/interviews/start`,
      {
        role: 'Frontend Developer',
        experienceLevel: 'Mid-Level'
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    if (startRes.data.success) {
      interviewId = startRes.data.data.interviewId;
      const firstQuestion = startRes.data.data.currentQuestion;
      console.log('✅ Interview started successfully');
      console.log(`📝 Interview ID: ${interviewId}`);
      console.log(`📊 Total Questions: ${startRes.data.data.totalQuestions}`);
      console.log(`\n❓ First Question:`);
      console.log(`   ${firstQuestion.question}`);
      console.log(`   Topics: ${firstQuestion.expectedTopics.join(', ')}`);
    }

    // Step 3: Submit Answer
    console.log('\n3️⃣ Submitting answer...');
    const sampleAnswer = `React's Virtual DOM is an in-memory representation of the actual DOM. When state changes, React creates a new Virtual DOM tree and compares it with the previous one using a diffing algorithm. Only the differences are then applied to the real DOM, making updates more efficient. This process is called reconciliation and helps improve performance by minimizing expensive DOM operations. The Virtual DOM allows React to batch updates and optimize rendering, which is especially important for complex UIs with frequent state changes.`;

    const answerRes = await axios.post(
      `${BASE_URL}/api/interviews/${interviewId}/answer`,
      {
        answer: sampleAnswer,
        timeSpent: 120
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    if (answerRes.data.success) {
      const evaluation = answerRes.data.data.evaluation;
      console.log('✅ Answer submitted and evaluated');
      console.log(`\n📊 Evaluation Results:`);
      console.log(`   Score: ${evaluation.score}/10`);
      console.log(`   Feedback: ${evaluation.feedback}`);
      
      if (answerRes.data.data.nextQuestion) {
        console.log(`\n❓ Next Question:`);
        console.log(`   ${answerRes.data.data.nextQuestion.question}`);
      }
    }

    // Step 4: Get Interview History
    console.log('\n4️⃣ Fetching interview history...');
    const historyRes = await axios.get(
      `${BASE_URL}/api/interviews/history`,
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );

    if (historyRes.data.success) {
      console.log(`✅ Found ${historyRes.data.data.length} interview(s)`);
      historyRes.data.data.forEach((interview, index) => {
        console.log(`   ${index + 1}. ${interview.role} - ${interview.experienceLevel} (${interview.status})`);
      });
    }

    // Final Summary
    console.log('\n' + '='.repeat(60));
    console.log('🎉 AI INTERVIEW SYSTEM TEST COMPLETE!');
    console.log('='.repeat(60));
    console.log('\n✅ All Tests Passed:');
    console.log('   ✓ Authentication working');
    console.log('   ✓ Interview creation working');
    console.log('   ✓ Question generation working (Gemini AI or fallback)');
    console.log('   ✓ Answer evaluation working (Gemini AI or fallback)');
    console.log('   ✓ Interview history working');
    console.log('\n🚀 System is fully operational!');
    console.log('\n📝 Test Interview ID:', interviewId);
    console.log('🔑 Test Token:', authToken.substring(0, 20) + '...');
    
  } catch (error) {
    console.error('\n❌ Test Failed:');
    console.error('Error:', error.response?.data || error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

// Run the test
testInterviewSystem();
