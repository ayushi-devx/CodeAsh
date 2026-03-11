import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test credentials - update with your actual test user
const TEST_USER = {
  email: 'test@example.com',
  password: 'test123'
};

let authToken = '';

async function login() {
  try {
    console.log('🔐 Logging in...');
    const response = await axios.post(`${BASE_URL}/auth/login`, TEST_USER);
    authToken = response.data.token;
    console.log('✅ Login successful!\n');
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    console.log('\n💡 Please register a user first or update TEST_USER credentials\n');
    return false;
  }
}

async function testExplainCode() {
  try {
    console.log('📝 Testing Code Explanation...');
    const response = await axios.post(
      `${BASE_URL}/ai/explain-code`,
      {
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
        language: 'javascript',
        problemTitle: 'Two Sum'
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log('✅ Code Explanation Response:');
    console.log(response.data.data.explanation.substring(0, 200) + '...\n');
  } catch (error) {
    console.error('❌ Code Explanation failed:', error.response?.data?.message || error.message);
  }
}

async function testChat() {
  try {
    console.log('💬 Testing AI Chat...');
    const response = await axios.post(
      `${BASE_URL}/ai/chat`,
      {
        message: 'What is the time complexity of a hash map lookup?',
        problemContext: {
          title: 'Two Sum',
          description: 'Find two numbers that add up to target'
        },
        conversationHistory: []
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log('✅ Chat Response:');
    console.log(response.data.data.message.substring(0, 200) + '...\n');
  } catch (error) {
    console.error('❌ Chat failed:', error.response?.data?.message || error.message);
  }
}

async function testHints() {
  try {
    console.log('💡 Testing Hints Generation...');
    const response = await axios.post(
      `${BASE_URL}/ai/hints`,
      {
        problemTitle: 'Two Sum',
        problemDescription: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        userCode: ''
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log('✅ Hints Response:');
    console.log(response.data.data.hints.substring(0, 200) + '...\n');
  } catch (error) {
    console.error('❌ Hints failed:', error.response?.data?.message || error.message);
  }
}

async function testProblemGenerator() {
  try {
    console.log('🎲 Testing Problem Generator...');
    const response = await axios.post(
      `${BASE_URL}/ai/generate-problem`,
      {
        topic: 'Arrays',
        difficulty: 'Medium',
        style: 'LeetCode'
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log('✅ Generated Problem:');
    console.log('Title:', response.data.data.title);
    console.log('Difficulty:', response.data.data.difficulty);
    console.log('Description:', response.data.data.description?.substring(0, 150) + '...\n');
  } catch (error) {
    console.error('❌ Problem Generator failed:', error.response?.data?.message || error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting AI Features Test Suite\n');
  console.log('=' .repeat(50) + '\n');

  const loggedIn = await login();
  if (!loggedIn) {
    console.log('⚠️  Cannot proceed without authentication');
    return;
  }

  await testExplainCode();
  await testChat();
  await testHints();
  await testProblemGenerator();

  console.log('=' .repeat(50));
  console.log('✅ All tests completed!\n');
}

runTests();
