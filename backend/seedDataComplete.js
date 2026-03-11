import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const problems = [
  // EASY PROBLEMS - Arrays
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Apple'],
    acceptanceRate: 49.2,
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
    order: 1
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array.',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table', 'Sorting'],
    companies: ['Amazon', 'Microsoft', 'Apple', 'Adobe'],
    acceptanceRate: 61.5,
    constraints: ['1 <= nums.length <= 10^5'],
    examples: [{ input: 'nums = [1,2,3,1]', output: 'true' }],
    testCases: [
      { input: '1 2 3 1', output: 'true', isHidden: false },
      { input: '1 2 3 4', output: 'false', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const nums = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\' \').map(Number);\n\nfunction containsDuplicate(nums) {\n    // Your code here\n}\n\nconsole.log(containsDuplicate(nums));'
    }],
    order: 2
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    description: 'Given two strings s and t, return true if t is an anagram of s.',
    difficulty: 'Easy',
    tags: ['String', 'Hash Table', 'Sorting'],
    companies: ['Amazon', 'Facebook', 'Bloomberg', 'Microsoft'],
    acceptanceRate: 63.8,
    constraints: ['1 <= s.length, t.length <= 5 * 10^4'],
    examples: [{ input: 's = "anagram", t = "nagaram"', output: 'true' }],
    testCases: [
      { input: 'anagram\nnagaram', output: 'true', isHidden: false },
      { input: 'rat\ncar', output: 'false', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const lines = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\'\\n\');\nconst s = lines[0];\nconst t = lines[1];\n\nfunction isAnagram(s, t) {\n    // Your code here\n}\n\nconsole.log(isAnagram(s, t));'
    }],
    order: 3
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-sell-stock',
    description: 'Find the maximum profit from buying and selling a stock once.',
    difficulty: 'Easy',
    tags: ['Array', 'Dynamic Programming'],
    companies: ['Amazon', 'Microsoft', 'Facebook', 'Google', 'Apple'],
    acceptanceRate: 54.2,
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
    order: 4
  },
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    description: 'Check if a string is a palindrome, considering only alphanumeric characters.',
    difficulty: 'Easy',
    tags: ['String', 'Two Pointers'],
    companies: ['Facebook', 'Microsoft', 'Amazon', 'Apple'],
    acceptanceRate: 47.3,
    constraints: ['1 <= s.length <= 2 * 10^5'],
    examples: [{ input: 's = "A man, a plan, a canal: Panama"', output: 'true' }],
    testCases: [
      { input: 'A man, a plan, a canal: Panama', output: 'true', isHidden: false },
      { input: 'race a car', output: 'false', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const s = require(\'fs\').readFileSync(0, \'utf-8\').trim();\n\nfunction isPalindrome(s) {\n    // Your code here\n}\n\nconsole.log(isPalindrome(s));'
    }],
    order: 5
  },
  
  // EASY - Math Problems
  {
    title: 'Find Remainder',
    slug: 'find-remainder',
    description: 'Given two integers, return the remainder when first is divided by second.',
    difficulty: 'Easy',
    tags: ['Math'],
    companies: ['TCS', 'Infosys', 'Wipro'],
    acceptanceRate: 95.0,
    constraints: ['1 <= a, b <= 10^9'],
    examples: [{ input: 'a = 10, b = 3', output: '1' }],
    testCases: [
      { input: '10\n3', output: '1', isHidden: false },
      { input: '15\n4', output: '3', isHidden: false }
    ],
    starterCode: [{
      language: 'javascript',
      code: 'const lines = require(\'fs\').readFileSync(0, \'utf-8\').trim().split(\'\\n\');\nconst a = parseInt(lines[0]);\nconst b = parseInt(lines[1]);\nconsole.log(a % b);'
    }],
    order: 6
  },
  {
    title: 'Sum of Digits',
    slug: 'sum-of-digits',
    description: 'Given an integer, return the sum of its digits.',
    