import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

// Complete Striver's SDE Sheet - All 191 Problems
const completeStriverSheet = [
  // DAY 1: Arrays
  { title: 'Set Matrix Zeroes', slug: 'set-matrix-zeroes', difficulty: 'Medium', tags: ['Array', 'Matrix'], externalLinks: { leetcode: 'https://leetcode.com/problems/set-matrix-zeroes/', gfg: 'https://www.geeksforgeeks.org/a-boolean-matrix-question/' }, acceptanceRate: 51.2, order: 1 },
  { title: 'Pascal\'s Triangle', slug: 'pascals-triangle', difficulty: 'Easy', tags: ['Array', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/pascals-triangle/', gfg: 'https://www.geeksforgeeks.org/pascal-triangle/' }, acceptanceRate: 70.8, order: 2 },
  { title: 'Next Permutation', slug: 'next-permutation', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/next-permutation/', gfg: 'https://www.geeksforgeeks.org/next-permutation/' }, acceptanceRate: 37.9, order: 3 },
  { title: 'Maximum Subarray (Kadane\'s)', slug: 'maximum-subarray', difficulty: 'Medium', tags: ['Array', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/maximum-subarray/', gfg: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/' }, acceptanceRate: 50.1, order: 4 },
  { title: 'Sort Colors (Dutch National Flag)', slug: 'sort-colors', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/sort-colors/', gfg: 'https://www.geeksforgeeks.org/sort-an-array-of-0s-1s-and-2s/' }, acceptanceRate: 59.7, order: 5 },
  { title: 'Best Time to Buy and Sell Stock', slug: 'best-time-buy-sell-stock', difficulty: 'Easy', tags: ['Array', 'Dynamic Programming'], externalLinks: { leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', gfg: 'https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/' }, acceptanceRate: 54.2, order: 6 },
  
  // DAY 2: Arrays Part II
  { title: 'Rotate Image', slug: 'rotate-image', difficulty: 'Medium', tags: ['Array', 'Matrix'], externalLinks: { leetcode: 'https://leetcode.com/problems/rotate-image/', gfg: 'https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction/' }, acceptanceRate: 71.9, order: 7 },
  { title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Medium', tags: ['Array', 'Sorting'], externalLinks: { leetcode: 'https://leetcode.com/problems/merge-intervals/', gfg: 'https://www.geeksforgeeks.org/merging-intervals/' }, acceptanceRate: 46.7, order: 8 },
  { title: 'Merge Sorted Array', slug: 'merge-sorted-array', difficulty: 'Easy', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/merge-sorted-array/', gfg: 'https://www.geeksforgeeks.org/merge-two-sorted-arrays/' }, acceptanceRate: 46.5, order: 9 },
  { title: 'Find Duplicate Number', slug: 'find-duplicate-number', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], externalLinks: { leetcode: 'https://leetcode.com/problems/find-the-duplicate-number/', gfg: 'https://www.geeksforgeeks.org/find-duplicates-in-on-time-and-constant-extra-space/' }, acceptanceRate: 59.3, order: 10 },
  { title: 'Repeat and Missing Number', slug: 'repeat-missing-number', difficulty: 'Medium', tags: ['Array', 'Math'], externalLinks: { leetcode: 'https://leetcode.com/problems/set-mismatch/', gfg: 'https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/' }, acceptanceRate: 42.8, order: 11 },
  { title: 'Inversion of Array', slug: 'count-inversions', difficulty: 'Hard', tags: ['Array', 'Merge Sort'], externalLinks: { leetcode: 'https://leetcode.com/problems/global-and-local-inversions/', gfg: 'https://www.geeksforgeeks.org/counting-inversions/' }, acceptanceRate: 38.5, order: 12 },
  
  // DAY 3: Arrays Part III
  { title: 'Search in 2D Matrix', slug: 'search-2d-matrix', difficulty: 'Medium', tags: ['Array', 'Binary Search'], externalLinks: { leetcode: 'https://leetcode.com/problems/search-a-2d-matrix/', gfg: 'https://www.geeksforgeeks.org/search-in-row-wise-and-column-wise-sorted-matrix/' }, acceptanceRate: 49.2, order: 13 },
  { title: 'Pow(x, n)', slug: 'powx-n', difficulty: 'Medium', tags: ['Math', 'Recursion'], externalLinks: { leetcode: 'https://leetcode.com/problems/powx-n/', gfg: 'https://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/' }, acceptanceRate: 33.5, order: 14 },
  { title: 'Majority Eleme