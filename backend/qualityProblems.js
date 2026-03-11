import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const qualityProblems = [
  {
    title: 'Set Matrix Zeroes',
    slug: 'set-matrix-zeroes',
    description: `Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

Example:
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]`,
    difficulty: 'Medium',
    tags: ['Array', 'Matrix'],
    companies: ['Amazon', 'Microsoft'],
    acceptanceRate: 51.2,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/set-matrix-zeroes/',
      gfg: 'https://www.geeksforgeeks.org/a-boolean-matrix-question/'
    },
    constraints: ['m == matrix.length', 'n == matrix[0].length'],
    examples: [{ input: '[[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' }],
    testCases: [{ input: '1 1 1\n1 0 1\n1 1 1', output: '1 0 1\n0 0 0\n1 0 1', isHidden: false }],
    starterCode: [{ language: 'javascript', code: '// Write your code here\nfunction setZeroes(matrix) {\n    \n}' }],
    order: 1
  },
  {
    title: 'Pascal\'s Triangle',
    slug: 'pascals-triangle',
    description: `Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it.

Example:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]`,
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    companies: ['Amazon', 'Google'],
    acceptanceRate: 70.8,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/pascals-triangle/',
      gfg: 'https://www.geeksforgeeks.org/pascal-triangle/'
    },
    constraints: ['1 <= numRows <= 30'],
    examples: [{ input: 'numRows = 5', output: '[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]' }],
    testCases: [{ input: '5', output: '1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'function generate(numRows) {\n    // Write your code here\n}' }],
    order: 2
  },
  {
    title: 'Next Permutation',
    slug: 'next-permutation',
    description: `Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (sorted in ascending order).

Example:
Input: nums = [1,2,3]
Output: [1,3,2]`,
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers'],
    companies: ['Google', 'Amazon'],
    acceptanceRate: 37.9,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/next-permutation/',
      gfg: 'https://www.geeksforgeeks.org/next-permutation/'
    },
    constraints: ['1 <= nums.length <= 100'],
    examples: [{ input: 'nums = [1,2,3]', output: '[1,3,2]' }],
    testCases: [{ input: '1 2 3', output: '1 3 2', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'function nextPermutation(nums) {\n    // Write your code here\n}' }],
    order: 3
  },
  {
    title: 'Maximum Subarray (Kadane\'s Algorithm)',
    slug: 'maximum-subarray',
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.`,
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    companies: ['Amazon', 'Microsoft', 'LinkedIn'],
    acceptanceRate: 50.1,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/maximum-subarray/',
      gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/',
      youtube: 'https://www.youtube.com/watch?v=w_KEocd__20'
    },
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' }],
    testCases: [
      { input: '-2 1 -3 4 -1 2 1 -5 4', output: '6', isHidden: false },
      { input: '1', output: '1', isHidden: false }
    ],
    starterCode: [{ 
      language: 'javascript', 
      code: `const nums = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function maxSubArray(nums) {
    // Write your code here using Kadane's Algorithm
}

console.log(maxSubArray(nums));` 
    }],
    order: 4
  },
  {
    title: 'Sort Colors (Dutch National Flag)',
    slug: 'sort-colors',
    description: `Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

Example:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]`,
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    companies: ['Microsoft', 'Amazon'],
    acceptanceRate: 59.7,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/sort-colors/',
      gfg: 'https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/'
    },
    constraints: ['n == nums.length', '1 <= n <= 300'],
    examples: [{ input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' }],
    testCases: [{ input: '2 0 2 1 1 0', output: '0 0 1 1 2 2', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'function sortColors(nums) {\n    // Write your code here\n}' }],
    order: 5
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-sell-stock',
    description: `You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.`,
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    companies: ['Amazon', 'Facebook', 'Microsoft'],
    acceptanceRate: 54.2,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      gfg: 'https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/'
    },
    constraints: ['1 <= prices.length <= 10^5'],
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    testCases: [
      { input: '7 1 5 3 6 4', output: '5', isHidden: false },
      { input: '7 6 4 3 1', output: '0', isHidden: false }
    ],
    starterCode: [{ 
      language: 'javascript', 
      code: `const prices = require('fs').readFileSync(0, 'utf-8').trim().split(' ').map(Number);

function maxProfit(prices) {
    // Write your code here
}

console.log(maxProfit(prices));` 
    }],
    order: 6
  },
  {
    title: 'Rotate Image',
    slug: 'rotate-image',
    description: `You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place.

Example:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]`,
    difficulty: 'Medium',
    tags: ['Array', 'Matrix'],
    companies: ['Amazon', 'Microsoft'],
    acceptanceRate: 71.9,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/rotate-image/',
      gfg: 'https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction/'
    },
    constraints: ['n == matrix.length == matrix[i].length'],
    examples: [{ input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' }],
    testCases: [{ input: '1 2 3\n4 5 6\n7 8 9', output: '7 4 1\n8 5 2\n9 6 3', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'function rotate(matrix) {\n    // Write your code here\n}' }],
    order: 7
  },
  {
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals.

Example:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].`,
    difficulty: 'Medium',
    tags: ['Array', 'Sorting'],
    companies: ['Facebook', 'Google', 'Amazon'],
    acceptanceRate: 46.7,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/merge-intervals/',
      gfg: 'https://www.geeksforgeeks.org/merging-intervals/'
    },
    constraints: ['1 <= intervals.length <= 10^4'],
    examples: [{ input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' }],
    testCases: [{ input: '1 3\n2 6\n8 10\n15 18', output: '1 6\n8 10\n15 18', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'function merge(intervals) {\n    // Write your code here\n}' }],
    order: 8
  },
  {
    title: 'Merge Sorted Array',
    slug: 'merge-sorted-array',
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.

Example:
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]`,
    difficulty: 'Easy',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    companies: ['Facebook', 'Amazon'],
    acceptanceRate: 46.5,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/merge-sorted-array/',
      gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-arrays/'
    },
    constraints: ['nums1.length == m + n'],
    examples: [{ input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' }],
    testCases: [{ input: '1 2 3 0 0 0\n3\n2 5 6\n3', output: '1 2 2 3 5 6', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'function merge(nums1, m, nums2, n) {\n    // Write your code here\n}' }],
    order: 9
  },
  {
    title: 'Find Duplicate Number',
    slug: 'find-duplicate-number',
    description: `Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

Example:
Input: nums = [1,3,4,2,2]
Output: 2`,
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Binary Search'],
    companies: ['Amazon', 'Microsoft'],
    acceptanceRate: 59.3,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/find-the-duplicate-number/',
      gfg: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/'
    },
    constraints: ['1 <= n <= 10^5'],
    examples: [{ input: 'nums = [1,3,4,2,2]', output: '2' }],
    testCases: [
      { input: '1 3 4 2 2', output: '2', isHidden: false },
      { input: '3 1 3 4 2', output: '3', isHidden: false }
    ],
    starterCode: [{ language: 'javascript', code: 'function findDuplicate(nums) {\n    // Write your code here\n}' }],
    order: 10
  }
];

async function seedQuality() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ MongoDB connected');

    await Problem.deleteMany({});
    console.log('🗑️  Cleared existing');

    await Problem.insertMany(qualityProblems);
    console.log('✅ Added', qualityProblems.length, 'quality problems');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedQuality();
