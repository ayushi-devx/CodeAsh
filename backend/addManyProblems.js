import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const allProblems = [
  // ARRAY PROBLEMS (10)
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    companies: ['Amazon', 'Google', 'Microsoft'],
    acceptanceRate: 49.2,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/two-sum/',
      gfg: 'https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/'
    },
    constraints: ['2 <= nums.length <= 10^4'],
    examples: [{ input: 'nums = [2,7,11,15], target = 9', output: '[0,1]' }],
    testCases: [
      { input: '2 7 11 15\n9', output: '0 1', isHidden: false },
      { input: '3 2 4\n6', output: '1 2', isHidden: false }
    ],
    starterCode: [{ language: 'javascript', code: 'const lines = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\'\\n\');\nconst nums = lines[0].split(\' \').map(Number);\nconst target = parseInt(lines[1]);\n\nfunction twoSum(nums, target) {\n    // Your code here\n}\n\nconsole.log(twoSum(nums, target).join(\' \'));' }],
    videoUrl: 'https://www.youtube.com/watch?v=UXDSeD9mN-k',
    order: 1
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-sell-stock',
    description: 'Find the maximum profit from buying and selling stock once.',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    companies: ['Amazon', 'Facebook'],
    acceptanceRate: 54.2,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      gfg: 'https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/'
    },
    constraints: ['1 <= prices.length <= 10^5'],
    examples: [{ input: 'prices = [7,1,5,3,6,4]', output: '5' }],
    testCases: [{ input: '7 1 5 3 6 4', output: '5', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const prices = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction maxProfit(prices) {\n    // Your code\n}\nconsole.log(maxProfit(prices));' }],
    order: 2
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    description: 'Check if array contains any duplicates.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    companies: ['Amazon', 'Apple'],
    acceptanceRate: 61.3,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/contains-duplicate/',
      gfg: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/'
    },
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [{ input: 'nums = [1,2,3,1]', output: 'true' }],
    testCases: [{ input: '1 2 3 1', output: 'true', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const nums = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction containsDuplicate(nums) {\n    // Your code\n}\nconsole.log(containsDuplicate(nums));' }],
    order: 3
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    description: 'Return array where each element is product of all other elements.',
    difficulty: 'Medium',
    tags: ['Array', 'Prefix Sum'],
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: 64.8,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/product-of-array-except-self/',
      gfg: 'https://www.geeksforgeeks.org/a-product-array-puzzle/'
    },
    constraints: ['2 <= nums.length <= 10^5'],
    examples: [{ input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' }],
    testCases: [{ input: '1 2 3 4', output: '24 12 8 6', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const nums = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction productExceptSelf(nums) {\n    // Your code\n}\nconsole.log(productExceptSelf(nums).join(\' \'));' }],
    order: 4
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    description: 'Find contiguous subarray with largest sum.',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming', 'Divide and Conquer'],
    companies: ['Amazon', 'Microsoft', 'LinkedIn'],
    acceptanceRate: 50.1,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/maximum-subarray/',
      gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/'
    },
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [{ input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6' }],
    testCases: [{ input: '-2 1 -3 4 -1 2 1 -5 4', output: '6', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const nums = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction maxSubArray(nums) {\n    // Your code\n}\nconsole.log(maxSubArray(nums));' }],
    order: 5
  },
  {
    title: 'Maximum Product Subarray',
    slug: 'maximum-product-subarray',
    description: 'Find contiguous subarray with largest product.',
    difficulty: 'Medium',
    tags: ['Array', 'Dynamic Programming'],
    companies: ['Amazon', 'LinkedIn'],
    acceptanceRate: 34.9,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/maximum-product-subarray/',
      gfg: 'https://www.geeksforgeeks.org/maximum-product-subarray/'
    },
    constraints: ['1 <= nums.length <= 2 * 10^4'],
    examples: [{ input: 'nums = [2,3,-2,4]', output: '6' }],
    testCases: [{ input: '2 3 -2 4', output: '6', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const nums = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction maxProduct(nums) {\n    // Your code\n}\nconsole.log(maxProduct(nums));' }],
    order: 6
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-rotated-sorted-array',
    description: 'Find minimum element in rotated sorted array.',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    companies: ['Amazon', 'Microsoft'],
    acceptanceRate: 49.2,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
      gfg: 'https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/'
    },
    constraints: ['1 <= nums.length <= 5000'],
    examples: [{ input: 'nums = [3,4,5,1,2]', output: '1' }],
    testCases: [{ input: '3 4 5 1 2', output: '1', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const nums = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction findMin(nums) {\n    // Your code\n}\nconsole.log(findMin(nums));' }],
    order: 7
  },
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-rotated-sorted-array',
    description: 'Search for target in rotated sorted array.',
    difficulty: 'Medium',
    tags: ['Array', 'Binary Search'],
    companies: ['Amazon', 'Facebook', 'Microsoft'],
    acceptanceRate: 39.1,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      gfg: 'https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/'
    },
    constraints: ['1 <= nums.length <= 5000'],
    examples: [{ input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' }],
    testCases: [{ input: '4 5 6 7 0 1 2\n0', output: '4', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const lines = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\'\\n\');\nconst nums = lines[0].split(\' \').map(Number);\nconst target = parseInt(lines[1]);\nfunction search(nums, target) {\n    // Your code\n}\nconsole.log(search(nums, target));' }],
    order: 8
  },
  {
    title: '3Sum',
    slug: '3sum',
    description: 'Find all unique triplets that sum to zero.',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    companies: ['Amazon', 'Facebook', 'Microsoft'],
    acceptanceRate: 32.4,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/3sum/',
      gfg: 'https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/'
    },
    constraints: ['3 <= nums.length <= 3000'],
    examples: [{ input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' }],
    testCases: [{ input: '-1 0 1 2 -1 -4', output: '-1 -1 2\n-1 0 1', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const nums = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction threeSum(nums) {\n    // Your code\n}\nconst result = threeSum(nums);\nresult.forEach(arr => console.log(arr.join(\' \')));' }],
    order: 9
  },
  {
    title: 'Container With Most Water',
    slug: 'container-most-water',
    description: 'Find two lines that together with x-axis form container with most water.',
    difficulty: 'Medium',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    companies: ['Amazon', 'Facebook', 'Google'],
    acceptanceRate: 54.3,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/container-with-most-water/',
      gfg: 'https://www.geeksforgeeks.org/container-with-most-water/'
    },
    constraints: ['2 <= height.length <= 10^5'],
    examples: [{ input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' }],
    testCases: [{ input: '1 8 6 2 5 4 8 3 7', output: '49', isHidden: false }],
    starterCode: [{ language: 'javascript', code: 'const height = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\nfunction maxArea(height) {\n    // Your code\n}\nconsole.log(maxArea(height));' }],
    order: 10
  }
];

async function addMany() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ MongoDB connected');

    await Problem.deleteMany({});
    console.log('🗑️  Cleared existing');

    await Problem.insertMany(allProblems);
    console.log('✅ Added', allProblems.length, 'problems');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addMany();
