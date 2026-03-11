import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

// Striver's SDE Sheet - Top Problems
const striverProblems = [
  // DAY 1: Arrays
  { title: 'Set Matrix Zeroes', slug: 'set-matrix-zeroes', difficulty: 'Medium', tags: ['Array', 'Matrix'], externalLinks: { leetcode: 'https://leetcode.com/problems/set-matrix-zeroes/', gfg: 'https://www.geeksforgeeks.org/a-boolean-matrix-question/' }, acceptanceRate: 51.2, order: 1 },
  { title: 'Pascal\'s Triangle', slug: 'pascals-triangle', difficulty: 'Easy', tags: ['Array', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/pascals-triangle/', gfg: 'https://www.geeksforgeeks.org/pascal-triangle/' }, acceptanceRate: 70.8, order: 2 },
  { title: 'Next Permutation', slug: 'next-permutation', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/next-permutation/', gfg: 'https://www.geeksforgeeks.org/next-permutation/' }, acceptanceRate: 37.9, order: 3 },
  { title: 'Kadane\'s Algorithm', slug: 'maximum-subarray', difficulty: 'Medium', tags: ['Array', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/maximum-subarray/', gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/' }, acceptanceRate: 50.1, order: 4 },
  { title: 'Sort Colors', slug: 'sort-colors', difficulty: 'Medium', tags: ['Array', 'Two Pointers', 'Sorting'], externalLinks: { leetcode: 'https://leetcode.com/problems/sort-colors/', gfg: 'https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/' }, acceptanceRate: 59.7, order: 5 },
  { title: 'Stock Buy and Sell', slug: 'best-time-to-buy-sell-stock', difficulty: 'Easy', tags: ['Array', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', gfg: 'https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/' }, acceptanceRate: 54.2, order: 6 },
  
  // DAY 2: Arrays Part II
  { title: 'Rotate Matrix', slug: 'rotate-image', difficulty: 'Medium', tags: ['Array', 'Matrix'], externalLinks: { leetcode: 'https://leetcode.com/problems/rotate-image/', gfg: 'https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction/' }, acceptanceRate: 71.9, order: 7 },
  { title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Medium', tags: ['Array', 'Sorting'], externalLinks: { leetcode: 'https://leetcode.com/problems/merge-intervals/', gfg: 'https://www.geeksforgeeks.org/merging-intervals/' }, acceptanceRate: 46.7, order: 8 },
  { title: 'Merge Sorted Array', slug: 'merge-sorted-array', difficulty: 'Easy', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/merge-sorted-array/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-arrays/' }, acceptanceRate: 46.5, order: 9 },
  { title: 'Find Duplicate', slug: 'find-duplicate-number', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/find-the-duplicate-number/', gfg: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/' }, acceptanceRate: 59.3, order: 10 },
  
  // DAY 3: Arrays Part III
  { title: 'Search in 2D Matrix', slug: 'search-2d-matrix', difficulty: 'Medium', tags: ['Array', 'Binary Search', 'Matrix'], externalLinks: { leetcode: 'https://leetcode.com/problems/search-a-2d-matrix/', gfg: 'https://www.geeksforgeeks.org/search-in-row-wise-and-column-wise-sorted-matrix/' }, acceptanceRate: 49.2, order: 11 },
  { title: 'Pow(x, n)', slug: 'powx-n', difficulty: 'Medium', tags: ['Math', 'Recursion'], externalLinks: { leetcode: 'https://leetcode.com/problems/powx-n/', gfg: 'https://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/' }, acceptanceRate: 33.5, order: 12 },
  { title: 'Majority Element', slug: 'majority-element', difficulty: 'Easy', tags: ['Array', 'Hash Table'], externalLinks: { leetcode: 'https://leetcode.com/problems/majority-element/', gfg: 'https://www.geeksforgeeks.org/majority-element/' }, acceptanceRate: 63.9, order: 13 },
  { title: 'Majority Element II', slug: 'majority-element-ii', difficulty: 'Medium', tags: ['Array', 'Hash Table'], externalLinks: { leetcode: 'https://leetcode.com/problems/majority-element-ii/', gfg: 'https://www.geeksforgeeks.org/given-an-array-of-of-size-n-finds-all-the-elements-that-appear-more-than-nk-times/' }, acceptanceRate: 46.1, order: 14 },
  { title: 'Grid Unique Paths', slug: 'unique-paths', difficulty: 'Medium', tags: ['Math', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/unique-paths/', gfg: 'https://www.geeksforgeeks.org/count-possible-paths-top-left-bottom-right-nxm-matrix/' }, acceptanceRate: 63.5, order: 15 },
  
  // DAY 4: Arrays Part IV
  { title: 'Two Sum', slug: 'two-sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], externalLinks: { leetcode: 'https://leetcode.com/problems/two-sum/', gfg: 'https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/' }, acceptanceRate: 49.2, order: 16 },
  { title: '4Sum', slug: '4sum', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/4sum/', gfg: 'https://www.geeksforgeeks.org/find-four-numbers-with-sum-equal-to-given-sum/' }, acceptanceRate: 36.4, order: 17 },
  { title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'Medium', tags: ['Array', 'Hash Table'], externalLinks: { leetcode: 'https://leetcode.com/problems/longest-consecutive-sequence/', gfg: 'https://www.geeksforgeeks.org/longest-consecutive-subsequence/' }, acceptanceRate: 46.9, order: 18 },
  { title: 'Largest Subarray with 0 Sum', slug: 'largest-subarray-zero-sum', difficulty: 'Medium', tags: ['Array', 'Hash Table'], externalLinks: { leetcode: 'https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/', gfg: 'https://www.geeksforgeeks.org/find-the-largest-subarray-with-0-sum/' }, acceptanceRate: 47.2, order: 19 },
  { title: 'Count Subarrays with XOR K', slug: 'count-subarrays-xor-k', difficulty: 'Medium', tags: ['Array', 'Hash Table', 'Bit Manipulation'], externalLinks: { leetcode: 'https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/', gfg: 'https://www.geeksforgeeks.org/count-number-subarrays-given-xor/' }, acceptanceRate: 42.1, order: 20 },
  
  // DAY 5: Linked List
  { title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'Easy', tags: ['Linked List', 'Recursion'], externalLinks: { leetcode: 'https://leetcode.com/problems/reverse-linked-list/', gfg: 'https://www.geeksforgeeks.org/reverse-a-linked-list/' }, acceptanceRate: 72.5, order: 21 },
  { title: 'Middle of Linked List', slug: 'middle-of-linked-list', difficulty: 'Easy', tags: ['Linked List', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/middle-of-the-linked-list/', gfg: 'https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/' }, acceptanceRate: 75.8, order: 22 },
  { title: 'Merge Two Sorted Lists', slug: 'merge-two-sorted-lists', difficulty: 'Easy', tags: ['Linked List', 'Recursion'], externalLinks: { leetcode: 'https://leetcode.com/problems/merge-two-sorted-lists/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/' }, acceptanceRate: 62.1, order: 23 },
  { title: 'Remove Nth Node From End', slug: 'remove-nth-node-from-end', difficulty: 'Medium', tags: ['Linked List', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', gfg: 'https://www.geeksforgeeks.org/delete-nth-node-from-the-end-of-the-given-linked-list/' }, acceptanceRate: 42.8, order: 24 },
  { title: 'Add Two Numbers', slug: 'add-two-numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], externalLinks: { leetcode: 'https://leetcode.com/problems/add-two-numbers/', gfg: 'https://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-lists/' }, acceptanceRate: 42.1, order: 25 },
  { title: 'Delete Node in Linked List', slug: 'delete-node-linked-list', difficulty: 'Medium', tags: ['Linked List'], externalLinks: { leetcode: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', gfg: 'https://www.geeksforgeeks.org/given-only-a-pointer-to-a-node-to-be-deleted-in-a-singly-linked-list-how-do-you-delete-it/' }, acceptanceRate: 74.2, order: 26 },
  
  // DAY 6: Linked List Part II
  { title: 'Intersection of Two Linked Lists', slug: 'intersection-two-linked-lists', difficulty: 'Easy', tags: ['Linked List', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', gfg: 'https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/' }, acceptanceRate: 54.7, order: 27 },
  { title: 'Detect Cycle in Linked List', slug: 'linked-list-cycle', difficulty: 'Easy', tags: ['Linked List', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/linked-list-cycle/', gfg: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/' }, acceptanceRate: 48.2, order: 28 },
  { title: 'Reverse Nodes in k-Group', slug: 'reverse-nodes-k-group', difficulty: 'Hard', tags: ['Linked List', 'Recursion'], externalLinks: { leetcode: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', gfg: 'https://www.geeksforgeeks.org/reverse-a-list-in-groups-of-given-size/' }, acceptanceRate: 56.9, order: 29 },
  { title: 'Palindrome Linked List', slug: 'palindrome-linked-list', difficulty: 'Easy', tags: ['Linked List', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/palindrome-linked-list/', gfg: 'https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/' }, acceptanceRate: 51.7, order: 30 },
  
  // DAY 7: 2-Pointer
  { title: 'Clone Linked List with Random Pointer', slug: 'copy-list-random-pointer', difficulty: 'Medium', tags: ['Linked List', 'Hash Table'], externalLinks: { leetcode: 'https://leetcode.com/problems/copy-list-with-random-pointer/', gfg: 'https://www.geeksforgeeks.org/a-linked-list-with-next-and-arbit-pointer/' }, acceptanceRate: 52.1, order: 31 },
  { title: '3Sum', slug: '3sum', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/3sum/', gfg: 'https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/' }, acceptanceRate: 32.4, order: 32 },
  { title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'Hard', tags: ['Array', 'Two Pointers', 'Stack'], externalLinks: { leetcode: 'https://leetcode.com/problems/trapping-rain-water/', gfg: 'https://www.geeksforgeeks.org/trapping-rain-water/' }, acceptanceRate: 59.2, order: 33 },
  { title: 'Remove Duplicates from Sorted Array', slug: 'remove-duplicates-sorted-array', difficulty: 'Easy', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', gfg: 'https://www.geeksforgeeks.org/remove-duplicates-sorted-array/' }, acceptanceRate: 51.8, order: 34 },
  { title: 'Max Consecutive Ones', slug: 'max-consecutive-ones', difficulty: 'Easy', tags: ['Array'], externalLinks: { leetcode: 'https://leetcode.com/problems/max-consecutive-ones/', gfg: 'https://www.geeksforgeeks.org/count-maximum-consecutive-ones-in-binary-array/' }, acceptanceRate: 55.9, order: 35 },
  
  // DAY 8: Greedy
  { title: 'N meetings in one room', slug: 'n-meetings-one-room', difficulty: 'Medium', tags: ['Greedy', 'Sorting'], externalLinks: { leetcode: 'https://leetcode.com/problems/meeting-rooms-ii/', gfg: 'https://www.geeksforgeeks.org/find-maximum-meetings-in-one-room/' }, acceptanceRate: 48.3, order: 36 },
  { title: 'Minimum Platforms', slug: 'minimum-platforms', difficulty: 'Medium', tags: ['Greedy', 'Sorting'], externalLinks: { leetcode: 'https://leetcode.com/problems/meeting-rooms-ii/', gfg: 'https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/' }, acceptanceRate: 52.1, order: 37 },
  { title: 'Job Sequencing Problem', slug: 'job-sequencing', difficulty: 'Medium', tags: ['Greedy', 'Sorting'], externalLinks: { leetcode: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling/', gfg: 'https://www.geeksforgeeks.org/job-sequencing-problem/' }, acceptanceRate: 45.7, order: 38 },
  { title: 'Fractional Knapsack', slug: 'fractional-knapsack', difficulty: 'Medium', tags: ['Greedy'], externalLinks: { leetcode: 'https://leetcode.com/problems/maximum-units-on-a-truck/', gfg: 'https://www.geeksforgeeks.org/fractional-knapsack-problem/' }, acceptanceRate: 58.2, order: 39 },
  { title: 'Minimum Coins', slug: 'coin-change', difficulty: 'Medium', tags: ['Greedy', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/coin-change/', gfg: 'https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/' }, acceptanceRate: 42.9, order: 40 }
];

// Add more problems with minimal data
const moreProblems = [];
for (let i = 41; i <= 100; i++) {
  moreProblems.push({
    title: `Problem ${i}`,
    slug: `problem-${i}`,
    difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    externalLinks: {
      leetcode: `https://leetcode.com/problems/problem-${i}/`,
      gfg: `https://www.geeksforgeeks.org/problem-${i}/`
    },
    acceptanceRate: 40 + (i % 30),
    order: i,
    description: `Problem ${i} description`,
    constraints: ['Standard constraints'],
    examples: [{ input: 'Sample input', output: 'Sample output' }],
    testCases: [{ input: 'test', output: 'result', isHidden: false }],
    starterCode: [{ language: 'javascript', code: '// Your code here' }]
  });
}

async function addStriver() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ MongoDB connected');

    await Problem.deleteMany({});
    console.log('🗑️  Cleared existing');

    const allProblems = [...striverProblems, ...moreProblems];
    
    // Add required fields to all problems
    allProblems.forEach(p => {
      if (!p.description) p.description = `${p.title} - Solve this problem`;
      if (!p.constraints) p.constraints = ['Standard constraints apply'];
      if (!p.examples) p.examples = [{ input: 'Sample input', output: 'Sample output' }];
      if (!p.testCases) p.testCases = [{ input: 'test', output: 'result', isHidden: false }];
      if (!p.starterCode) p.starterCode = [{ language: 'javascript', code: '// Write your code here' }];
      if (!p.companies) p.companies = [];
    });

    await Problem.insertMany(allProblems);
    console.log('✅ Added', allProblems.length, 'problems from Striver Sheet');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

addStriver();
