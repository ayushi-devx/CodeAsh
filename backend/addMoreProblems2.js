import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const moreProblems = [
  {
    title: 'Reverse Array',
    slug: 'reverse-array',
    description: `Given an array, reverse it in-place and return the reversed array.

Example:
- Input: [1, 2, 3, 4, 5]
- Output: [5, 4, 3, 2, 1]`,
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    companies: [],
    acceptanceRate: 93.0,
    constraints: ['1 <= arr.length <= 10^5'],
    examples: [
      { input: 'arr = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' }
    ],
    testCases: [
      { input: '1 2 3 4 5', output: '5 4 3 2 1', isHidden: false },
      { input: '10 20 30', output: '30 20 10', isHidden: false },
      { input: '7', output: '7', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const arr = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function reverseArray(arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr;
}

console.log(reverseArray(arr).join(' '));`
      }
    ],
    order: 10
  },
  {
    title: 'Find Second Largest',
    slug: 'find-second-largest',
    description: `Given an array of integers, find the second largest element.

Example:
- Input: [3, 7, 2, 9, 1]
- Output: 7`,
    difficulty: 'Easy',
    tags: ['Array'],
    companies: [],
    acceptanceRate: 85.0,
    constraints: ['2 <= arr.length <= 10^5'],
    examples: [
      { input: 'arr = [3, 7, 2, 9, 1]', output: '7' }
    ],
    testCases: [
      { input: '3 7 2 9 1', output: '7', isHidden: false },
      { input: '10 20 30', output: '20', isHidden: false },
      { input: '5 5 5 4', output: '4', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const arr = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function findSecondLargest(arr) {
    let first = -Infinity, second = -Infinity;
    for (let num of arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num !== first) {
            second = num;
        }
    }
    return second;
}

console.log(findSecondLargest(arr));`
      }
    ],
    order: 11
  },
  {
    title: 'Check Prime Number',
    slug: 'check-prime-number',
    description: `Given a number n, check if it is a prime number. A prime number is only divisible by 1 and itself.

Example:
- Input: 7
- Output: true
- Input: 10
- Output: false`,
    difficulty: 'Easy',
    tags: ['Math'],
    companies: [],
    acceptanceRate: 87.0,
    constraints: ['1 <= n <= 10^6'],
    examples: [
      { input: 'n = 7', output: 'true' },
      { input: 'n = 10', output: 'false' }
    ],
    testCases: [
      { input: '7', output: 'true', isHidden: false },
      { input: '10', output: 'false', isHidden: false },
      { input: '2', output: 'true', isHidden: true },
      { input: '1', output: 'false', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

function isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

console.log(isPrime(n));`
      }
    ],
    order: 12
  },
  {
    title: 'Factorial of Number',
    slug: 'factorial-of-number',
    description: `Calculate the factorial of a given number n. Factorial of n (n!) is the product of all positive integers less than or equal to n.

Example:
- Input: 5
- Output: 120 (5! = 5 × 4 × 3 × 2 × 1)`,
    difficulty: 'Easy',
    tags: ['Math', 'Recursion'],
    companies: [],
    acceptanceRate: 91.0,
    constraints: ['0 <= n <= 20'],
    examples: [
      { input: 'n = 5', output: '120' },
      { input: 'n = 0', output: '1' }
    ],
    testCases: [
      { input: '5', output: '120', isHidden: false },
      { input: '0', output: '1', isHidden: false },
      { input: '10', output: '3628800', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(n));`
      }
    ],
    order: 13
  },
  {
    title: 'Fibonacci Number',
    slug: 'fibonacci-number',
    description: `Return the nth Fibonacci number. The Fibonacci sequence is: 0, 1, 1, 2, 3, 5, 8, 13, 21...

Example:
- Input: 6
- Output: 8 (0, 1, 1, 2, 3, 5, 8)`,
    difficulty: 'Easy',
    tags: ['Math', 'Dynamic Programming', 'Recursion'],
    companies: ['Amazon', 'Microsoft'],
    acceptanceRate: 82.0,
    constraints: ['0 <= n <= 30'],
    examples: [
      { input: 'n = 6', output: '8' },
      { input: 'n = 10', output: '55' }
    ],
    testCases: [
      { input: '6', output: '8', isHidden: false },
      { input: '10', output: '55', isHidden: false },
      { input: '0', output: '0', isHidden: true },
      { input: '1', output: '1', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const n = parseInt(require('fs').readFileSync(0, 'utf-8').trim());

function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

console.log(fibonacci(n));`
      }
    ],
    order: 14
  },
  {
    title: 'Count Frequency of Elements',
    slug: 'count-frequency-of-elements',
    description: `Given an array, count the frequency of each element and print them.

Example:
- Input: [1, 2, 2, 3, 3, 3]
- Output: 1:1, 2:2, 3:3`,
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    companies: [],
    acceptanceRate: 89.0,
    constraints: ['1 <= arr.length <= 10^4'],
    examples: [
      { input: 'arr = [1, 2, 2, 3, 3, 3]', output: '1:1, 2:2, 3:3' }
    ],
    testCases: [
      { input: '1 2 2 3 3 3', output: '1:1 2:2 3:3', isHidden: false },
      { input: '5 5 5', output: '5:3', isHidden: false },
      { input: '1 2 3 4', output: '1:1 2:1 3:1 4:1', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const arr = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function countFrequency(arr) {
    const freq = {};
    for (let num of arr) {
        freq[num] = (freq[num] || 0) + 1;
    }
    
    const result = [];
    for (let key in freq) {
        result.push(\`\${key}:\${freq[key]}\`);
    }
    return result.join(' ');
}

console.log(countFrequency(arr));`
      }
    ],
    order: 15
  },
  {
    title: 'Remove Duplicates from Array',
    slug: 'remove-duplicates-from-array',
    description: `Given a sorted array, remove duplicates in-place and return the length of the unique elements.

Example:
- Input: [1, 1, 2, 2, 3]
- Output: 3 (unique elements: [1, 2, 3])`,
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    companies: ['Google', 'Amazon'],
    acceptanceRate: 86.0,
    constraints: ['0 <= arr.length <= 10^4'],
    examples: [
      { input: 'arr = [1, 1, 2, 2, 3]', output: '3' }
    ],
    testCases: [
      { input: '1 1 2 2 3', output: '3', isHidden: false },
      { input: '1 2 3 4 5', output: '5', isHidden: false },
      { input: '1 1 1 1', output: '1', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const arr = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function removeDuplicates(arr) {
    if (arr.length === 0) return 0;
    let j = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[j]) {
            j++;
            arr[j] = arr[i];
        }
    }
    return j + 1;
}

console.log(removeDuplicates(arr));`
      }
    ],
    order: 16
  },
  {
    title: 'Find Missing Number',
    slug: 'find-missing-number',
    description: `Given an array containing n distinct numbers from 0 to n, find the missing number.

Example:
- Input: [0, 1, 3]
- Output: 2`,
    difficulty: 'Easy',
    tags: ['Array', 'Math'],
    companies: ['Amazon', 'Microsoft'],
    acceptanceRate: 84.0,
    constraints: ['1 <= n <= 10^4'],
    examples: [
      { input: 'arr = [0, 1, 3]', output: '2' },
      { input: 'arr = [0, 1, 2, 4]', output: '3' }
    ],
    testCases: [
      { input: '0 1 3', output: '2', isHidden: false },
      { input: '0 1 2 4', output: '3', isHidden: false },
      { input: '1 2 3 4 5', output: '0', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const arr = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function findMissingNumber(arr) {
    const n = arr.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((a, b) => a + b, 0);
    return expectedSum - actualSum;
}

console.log(findMissingNumber(arr));`
      }
    ],
    order: 17
  },
  {
    title: 'Merge Two Sorted Arrays',
    slug: 'merge-two-sorted-arrays',
    description: `Given two sorted arrays, merge them into one sorted array.

Example:
- Input: arr1 = [1, 3, 5], arr2 = [2, 4, 6]
- Output: [1, 2, 3, 4, 5, 6]`,
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers'],
    companies: ['Google', 'Facebook'],
    acceptanceRate: 81.0,
    constraints: ['0 <= arr1.length, arr2.length <= 10^4'],
    examples: [
      { input: 'arr1 = [1, 3, 5], arr2 = [2, 4, 6]', output: '[1, 2, 3, 4, 5, 6]' }
    ],
    testCases: [
      { input: '1 3 5\n2 4 6', output: '1 2 3 4 5 6', isHidden: false },
      { input: '1 2 3\n4 5 6', output: '1 2 3 4 5 6', isHidden: false },
      { input: '1\n2', output: '1 2', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const lines = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const arr1 = lines[0].split(' ').map(Number);
const arr2 = lines[1].split(' ').map(Number);

function mergeSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            result.push(arr1[i++]);
        } else {
            result.push(arr2[j++]);
        }
    }
    
    while (i < arr1.length) result.push(arr1[i++]);
    while (j < arr2.length) result.push(arr2[j++]);
    
    return result;
}

console.log(mergeSortedArrays(arr1, arr2).join(' '));`
      }
    ],
    order: 18
  },
  {
    title: 'Binary Search',
    slug: 'binary-search',
    description: `Given a sorted array and a target value, return the index if found, otherwise return -1.

Example:
- Input: arr = [1, 3, 5, 7, 9], target = 5
- Output: 2`,
    difficulty: 'Easy',
    tags: ['Array', 'Binary Search'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptanceRate: 79.0,
    constraints: ['1 <= arr.length <= 10^4'],
    examples: [
      { input: 'arr = [1, 3, 5, 7, 9], target = 5', output: '2' },
      { input: 'arr = [1, 3, 5, 7, 9], target = 6', output: '-1' }
    ],
    testCases: [
      { input: '1 3 5 7 9\n5', output: '2', isHidden: false },
      { input: '1 3 5 7 9\n6', output: '-1', isHidden: false },
      { input: '2 4 6 8 10\n2', output: '0', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `const lines = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const arr = lines[0].split(' ').map(Number);
const target = parseInt(lines[1]);

function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}

console.log(binarySearch(arr, target));`
      }
    ],
    order: 19
  }
];

async function addMoreProblems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ MongoDB connected');

    await Problem.insertMany(moreProblems);
    console.log('✅ Added', moreProblems.length, 'new problems');

    const total = await Problem.countDocuments();
    console.log('📊 Total problems in database:', total);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding problems:', error);
    process.exit(1);
  }
}

addMoreProblems();
