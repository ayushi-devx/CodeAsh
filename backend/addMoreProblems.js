import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const newProblems = [
  {
    title: 'Find Remainder',
    slug: 'find-remainder',
    description: `Given two integers a and b, return the remainder when a is divided by b.

Example:
- Input: a = 10, b = 3
- Output: 1
- Explanation: 10 divided by 3 gives quotient 3 and remainder 1`,
    difficulty: 'Easy',
    tags: ['Math'],
    companies: [],
    acceptanceRate: 95.0,
    constraints: [
      '1 <= a, b <= 10^9',
      'b != 0'
    ],
    examples: [
      { input: 'a = 10, b = 3', output: '1' },
      { input: 'a = 15, b = 4', output: '3' }
    ],
    testCases: [
      { input: '10\n3', output: '1', isHidden: false },
      { input: '15\n4', output: '3', isHidden: false },
      { input: '100\n7', output: '2', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const lines = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const a = parseInt(lines[0]);
const b = parseInt(lines[1]);

function findRemainder(a, b) {
    // Write your code here
    return a % b;
}

console.log(findRemainder(a, b));`
      },
      {
        language: 'python',
        code: `import sys
lines = sys.stdin.read().strip().split('\\n')
a = int(lines[0])
b = int(lines[1])

def find_remainder(a, b):
    # Write your code here
    return a % b

print(find_remainder(a, b))`
      }
    ],
    order: 4
  },
  {
    title: 'Given 2 Integer Find the Remainder',
    slug: 'given-2-integer-find-remainder',
    description: `Write a program that takes two integers and returns their remainder after division.`,
    difficulty: 'Easy',
    tags: ['Math'],
    companies: [],
    acceptanceRate: 94.5,
    constraints: ['1 <= a, b <= 1000'],
    examples: [{ input: 'a = 7, b = 2', output: '1' }],
    testCases: [
      { input: '7\n2', output: '1', isHidden: false },
      { input: '20\n6', output: '2', isHidden: false }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const lines = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const a = parseInt(lines[0]);
const b = parseInt(lines[1]);
console.log(a % b);`
      }
    ],
    order: 5
  },
  {
    title: 'Check Palindrome',
    slug: 'check-palindrome',
    description: `Given a string, check if it is a palindrome. A palindrome is a word that reads the same backward as forward.

Example:
- "racecar" → true
- "hello" → false`,
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers'],
    companies: [],
    acceptanceRate: 88.0,
    constraints: ['1 <= s.length <= 1000'],
    examples: [
      { input: 's = "racecar"', output: 'true' },
      { input: 's = "hello"', output: 'false' }
    ],
    testCases: [
      { input: 'racecar', output: 'true', isHidden: false },
      { input: 'hello', output: 'false', isHidden: false },
      { input: 'madam', output: 'true', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const s = require('fs').readFileSync(0, 'utf-8').trim();

function isPalindrome(s) {
    // Write your code here
    let left = 0, right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
}

console.log(isPalindrome(s));`
      }
    ],
    order: 6
  },
  {
    title: 'Sum of Digits',
    slug: 'sum-of-digits',
    description: `Given an integer, return the sum of its digits.

Example:
- Input: 123
- Output: 6 (1 + 2 + 3)`,
    difficulty: 'Easy',
    tags: ['Math', 'String'],
    companies: [],
    acceptanceRate: 92.0,
    constraints: ['0 <= n <= 10^9'],
    examples: [
      { input: 'n = 123', output: '6' },
      { input: 'n = 456', output: '15' }
    ],
    testCases: [
      { input: '123', output: '6', isHidden: false },
      { input: '456', output: '15', isHidden: false },
      { input: '9999', output: '36', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

function sumOfDigits(n) {
    // Write your code here
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
}

console.log(sumOfDigits(n));`
      }
    ],
    order: 7
  },
  {
    title: 'Find Maximum Element',
    slug: 'find-maximum-element',
    description: `Given an array of integers, find and return the maximum element.

Example:
- Input: [3, 7, 2, 9, 1]
- Output: 9`,
    difficulty: 'Easy',
    tags: ['Array'],
    companies: [],
    acceptanceRate: 96.0,
    constraints: ['1 <= arr.length <= 10^5'],
    examples: [
      { input: 'arr = [3, 7, 2, 9, 1]', output: '9' },
      { input: 'arr = [1, 2, 3]', output: '3' }
    ],
    testCases: [
      { input: '3 7 2 9 1', output: '9', isHidden: false },
      { input: '1 2 3', output: '3', isHidden: false },
      { input: '100 50 75 200 25', output: '200', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const arr = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function findMax(arr) {
    // Write your code here
    return Math.max(...arr);
}

console.log(findMax(arr));`
      }
    ],
    order: 8
  },
  {
    title: 'Count Vowels',
    slug: 'count-vowels',
    description: `Given a string, count the number of vowels (a, e, i, o, u) in it. Consider both uppercase and lowercase.

Example:
- Input: "Hello World"
- Output: 3 (e, o, o)`,
    difficulty: 'Easy',
    tags: ['String'],
    companies: [],
    acceptanceRate: 90.0,
    constraints: ['1 <= s.length <= 10^4'],
    examples: [
      { input: 's = "Hello World"', output: '3' },
      { input: 's = "Programming"', output: '3' }
    ],
    testCases: [
      { input: 'Hello World', output: '3', isHidden: false },
      { input: 'Programming', output: '3', isHidden: false },
      { input: 'aeiouAEIOU', output: '10', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const s = require('fs').readFileSync(0, 'utf-8').trim();

function countVowels(s) {
    // Write your code here
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of s) {
        if (vowels.includes(char)) count++;
    }
    return count;
}

console.log(countVowels(s));`
      }
    ],
    order: 9
  }
];

async function addProblems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ MongoDB connected');

    await Problem.insertMany(newProblems);
    console.log('✅ Added', newProblems.length, 'new problems');

    const total = await Problem.countDocuments();
    console.log('📊 Total problems in database:', total);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding problems:', error);
    process.exit(1);
  }
}

addProblems();
