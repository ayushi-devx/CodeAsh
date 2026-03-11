import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const comprehensiveProblems = [
  // ARRAY PROBLEMS
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
    starterCode: [{
      language: 'javascript',
      code: 'const lines = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\'\\n\');\nconst nums = lines[0].split(\' \').map(Number);\nconst target = parseInt(lines[1]);\n\nfunction twoSum(nums, target) {\n    // Your code here\n}\n\nconsole.log(twoSum(nums, target).join(\' \'));'
    }],
    videoUrl: 'https://www.youtube.com/watch?v=UXDSeD9mN-k',
    order: 1
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-sell-stock',
    description: 'Find the maximum profit you can achieve from buying and selling stock once.',
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
      code: 'const prices = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\n\nfunction maxProfit(prices) {\n    // Your code here\n}\n\nconsole.log(maxProfit(prices));'
    }],
    order: 2
  },
  
  // STRING PROBLEMS
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    description: 'Check if a string is a palindrome, considering only alphanumeric characters and ignoring cases.',
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers'],
    companies: ['Facebook', 'Microsoft', 'Amazon'],
    acceptanceRate: 44.8,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/valid-palindrome/',
      gfg: 'https://www.geeksforgeeks.org/c-program-check-given-string-palindrome/'
    },
    constraints: ['1 <= s.length <= 2 * 10^5'],
    examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: 'true' }],
    testCases: [
      { input: 'racecar', output: 'true', isHidden: false },
      { input: 'hello', output: 'false', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const s = require(\'fs\').readFileSync(0, \'utf-8\').trim();\n\nfunction isPalindrome(s) {\n    // Your code here\n}\n\nconsole.log(isPalindrome(s));'
    }],
    order: 3
  },
  {
    title: 'Longest Substring Without Repeating',
    slug: 'longest-substring-without-repeating',
    description: 'Find the length of the longest substring without repeating characters.',
    difficulty: 'Medium',
    tags: ['String', 'Sliding Window', 'Hash Table'],
    companies: ['Amazon', 'Google', 'Adobe'],
    acceptanceRate: 35.8,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      gfg: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/'
    },
    constraints: ['0 <= s.length <= 5 * 10^4'],
    examples: [{ input: 's = "abcabcbb"', output: '3' }],
    testCases: [
      { input: 'abcabcbb', output: '3', isHidden: false },
      { input: 'bbbbb', output: '1', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const s = require(\'fs\').readFileSync(0, \'utf-8\').trim();\n\nfunction lengthOfLongestSubstring(s) {\n    // Your code here\n}\n\nconsole.log(lengthOfLongestSubstring(s));'
    }],
    order: 4
  },
  
  // STACK PROBLEMS
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    companies: ['Amazon', 'Google', 'Facebook'],
    acceptanceRate: 40.1,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/valid-parentheses/',
      gfg: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/'
    },
    constraints: ['1 <= s.length <= 10^4'],
    examples: [{ input: 's = "()"', output: 'true' }],
    testCases: [
      { input: '()', output: 'true', isHidden: false },
      { input: '()[]{}', output: 'true', isHidden: false },
      { input: '(]', output: 'false', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const s = require(\'fs\').readFileSync(0, \'utf-8\').trim();\n\nfunction isValid(s) {\n    // Your code here\n}\n\nconsole.log(isValid(s));'
    }],
    order: 5
  },
  
  // LINKED LIST PROBLEMS
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    description: 'Reverse a singly linked list.',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Apple'],
    acceptanceRate: 72.5,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/reverse-linked-list/',
      gfg: 'https://www.geeksforgeeks.org/reverse-a-linked-list/'
    },
    constraints: ['The number of nodes is in range [0, 5000]'],
    examples: [{ input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' }],
    testCases: [
      { input: '1 2 3 4 5', output: '5 4 3 2 1', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: '// Linked List implementation\nfunction reverseList(head) {\n    // Your code here\n}'
    }],
    order: 6
  },
  
  // TREE PROBLEMS
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-binary-tree',
    description: 'Find the maximum depth of a binary tree.',
    difficulty: 'Easy',
    tags: ['Tree', 'DFS', 'BFS'],
    companies: ['Amazon', 'Microsoft', 'Google'],
    acceptanceRate: 74.3,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
      gfg: 'https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/'
    },
    constraints: ['The number of nodes is in range [0, 10^4]'],
    examples: [{ input: 'root = [3,9,20,null,null,15,7]', output: '3' }],
    testCases: [
      { input: '3 9 20 null null 15 7', output: '3', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: '// Binary Tree implementation\nfunction maxDepth(root) {\n    // Your code here\n}'
    }],
    order: 7
  },
  
  // HEAP PROBLEMS
  {
    title: 'Kth Largest Element in Array',
    slug: 'kth-largest-element',
    description: 'Find the kth largest element in an unsorted array.',
    difficulty: 'Medium',
    tags: ['Heap', 'Divide and Conquer', 'Quickselect'],
    companies: ['Amazon', 'Facebook', 'Microsoft'],
    acceptanceRate: 66.2,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      gfg: 'https://www.geeksforgeeks.org/kth-smallestlargest-element-unsorted-array/'
    },
    constraints: ['1 <= k <= nums.length <= 10^5'],
    examples: [{ input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' }],
    testCases: [
      { input: '3 2 1 5 6 4\n2', output: '5', isHidden: false },
      { input: '3 2 3 1 2 4 5 5 6\n4', output: '4', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const lines = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\'\\n\');\nconst nums = lines[0].split(\' \').map(Number);\nconst k = parseInt(lines[1]);\n\nfunction findKthLargest(nums, k) {\n    // Your code here\n}\n\nconsole.log(findKthLargest(nums, k));'
    }],
    order: 8
  },
  
  // DYNAMIC PROGRAMMING
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?',
    difficulty: 'Easy',
    tags: ['Dynamic Programming', 'Math'],
    companies: ['Amazon', 'Google', 'Adobe'],
    acceptanceRate: 52.1,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/climbing-stairs/',
      gfg: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/'
    },
    constraints: ['1 <= n <= 45'],
    examples: [{ input: 'n = 3', output: '3' }],
    testCases: [
      { input: '3', output: '3', isHidden: false },
      { input: '5', output: '8', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const n = parseInt(require(\'fs\').readFileSync(0, \'utf-8\').trim());\n\nfunction climbStairs(n) {\n    // Your code here\n}\n\nconsole.log(climbStairs(n));'
    }],
    order: 9
  },
  
  // GRAPH PROBLEMS
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    description: 'Given a 2D grid of \'1\'s (land) and \'0\'s (water), count the number of islands.',
    difficulty: 'Medium',
    tags: ['Graph', 'DFS', 'BFS', 'Union Find'],
    companies: ['Amazon', 'Google', 'Facebook'],
    acceptanceRate: 57.3,
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/number-of-islands/',
      gfg: 'https://www.geeksforgeeks.org/find-number-of-islands/'
    },
    constraints: ['m == grid.length', 'n == grid[i].length'],
    examples: [{ input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }],
    testCases: [
      { input: '1 1 0\n1 1 0\n0 0 1', output: '2', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: '// Grid input handling\nfunction numIslands(grid) {\n    // Your code here\n}'
    }],
    order: 10
  }
];

async function seedComprehensive() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ MongoDB connected');

    await Problem.deleteMany({});
    console.log('🗑️  Cleared existing problems');

    await Problem.insertMany(comprehensiveProblems);
    console.log('✅ Added', comprehensiveProblems.length, 'comprehensive problems');

    const total = await Problem.countDocuments();
    console.log('📊 Total problems:', total);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedComprehensive();
