import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Problem from './models/Problem.js';

dotenv.config();

const problems = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'],
    acceptanceRate: 49.2,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    testCases: [
      { 
        input: '2 7 11 15\n9', 
        output: '0 1', 
        isHidden: false 
      },
      { 
        input: '3 2 4\n6', 
        output: '1 2', 
        isHidden: false 
      },
      { 
        input: '3 3\n6', 
        output: '0 1', 
        isHidden: false 
      },
      { 
        input: '-1 -2 -3 -4 -5\n-8', 
        output: '2 4', 
        isHidden: true 
      }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `// Read input
const lines = require('fs').readFileSync(0, 'utf-8').trim().split('\\n');
const nums = lines[0].split(' ').map(Number);
const target = parseInt(lines[1]);

function twoSum(nums, target) {
    // Write your code here
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Call function and print result
const result = twoSum(nums, target);
console.log(result.join(' '));`
      },
      {
        language: 'python',
        code: `# Read input
import sys
lines = sys.stdin.read().strip().split('\\n')
nums = list(map(int, lines[0].split()))
target = int(lines[1])

def twoSum(nums, target):
    # Write your code here
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []

# Call function and print result
result = twoSum(nums, target)
print(' '.join(map(str, result)))`
      },
      {
        language: 'cpp',
        code: `#include <iostream>
#include <vector>
#include <unordered_map>
#include <sstream>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mp.find(complement) != mp.end()) {
            return {mp[complement], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}

int main() {
    // Read input
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<int> nums;
    int num;
    while (iss >> num) {
        nums.push_back(num);
    }
    
    int target;
    cin >> target;
    
    // Call function
    vector<int> result = twoSum(nums, target);
    
    // Print result
    for (int i = 0; i < result.size(); i++) {
        if (i > 0) cout << " ";
        cout << result[i];
    }
    cout << endl;
    
    return 0;
}`
      },
      {
        language: 'java',
        code: `import java.util.*;

public class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        // Read input
        String[] numsStr = sc.nextLine().split(" ");
        int[] nums = new int[numsStr.length];
        for (int i = 0; i < numsStr.length; i++) {
            nums[i] = Integer.parseInt(numsStr[i]);
        }
        int target = sc.nextInt();
        
        // Call function
        int[] result = twoSum(nums, target);
        
        // Print result
        for (int i = 0; i < result.length; i++) {
            if (i > 0) System.out.print(" ");
            System.out.print(result[i]);
        }
        System.out.println();
    }
}`
      }
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow.',
      'Use a hash map to store the complement of each number as you iterate through the array.'
    ],
    editorial: `## Approach: Hash Map

### Intuition
We need to find two numbers that add up to the target. Instead of checking every pair (which takes O(n²) time), we can use a hash map to store numbers we've seen and check if the complement exists.

### Algorithm
1. Create an empty hash map
2. For each number in the array:
   - Calculate complement = target - current number
   - If complement exists in map, return [map[complement], current index]
   - Otherwise, store current number and its index in map
3. Return empty array if no solution found

### Complexity Analysis
- **Time Complexity:** O(n) - We traverse the array once
- **Space Complexity:** O(n) - Hash map can store up to n elements

### Code
\`\`\`javascript
function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
\`\`\`

### Why This Works
The key insight is that for each number, we only need to check if its complement has been seen before. By storing numbers in a hash map as we go, we can do this check in O(1) time.`,
    order: 1
  },
  {
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    difficulty: 'Medium',
    tags: ['Linked List', 'Math', 'Recursion'],
    companies: ['Amazon', 'Microsoft', 'Adobe'],
    acceptanceRate: 42.1,
    constraints: [
      'The number of nodes in each linked list is in the range [1, 100].',
      '0 <= Node.val <= 9',
      'It is guaranteed that the list represents a number that does not have leading zeros.'
    ],
    examples: [
      {
        input: 'l1 = [2,4,3], l2 = [5,6,4]',
        output: '[7,0,8]',
        explanation: '342 + 465 = 807.'
      },
      {
        input: 'l1 = [0], l2 = [0]',
        output: '[0]'
      }
    ],
    testCases: [
      { input: '[2,4,3]\n[5,6,4]', output: '[7,0,8]', isHidden: false },
      { input: '[0]\n[0]', output: '[0]', isHidden: false },
      { input: '[9,9,9,9,9,9,9]\n[9,9,9,9]', output: '[8,9,9,9,0,0,0,1]', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `function addTwoNumbers(l1, l2) {
    // Write your code here
    
}`
      },
      {
        language: 'python',
        code: `def addTwoNumbers(l1, l2):
    # Write your code here
    pass`
      }
    ],
    hints: [
      'Remember to handle the carry when the sum of two digits is greater than 9.',
      'Think about what happens when one list is longer than the other.'
    ],
    order: 2
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: 'Medium',
    tags: ['String', 'Hash Table', 'Sliding Window'],
    companies: ['Amazon', 'Google', 'Bloomberg', 'Facebook'],
    acceptanceRate: 35.8,
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3.'
      }
    ],
    testCases: [
      { input: 'abcabcbb', output: '3', isHidden: false },
      { input: 'bbbbb', output: '1', isHidden: false },
      { input: 'pwwkew', output: '3', isHidden: false },
      { input: 'dvdf', output: '3', isHidden: true }
    ],
    starterCode: [
      {
        language: 'javascript',
        code: `function lengthOfLongestSubstring(s) {
    // Write your code here
    
}`
      },
      {
        language: 'python',
        code: `def lengthOfLongestSubstring(s):
    # Write your code here
    pass`
      }
    ],
    hints: [
      'Use a sliding window approach with two pointers.',
      'Use a hash set to track characters in the current window.'
    ],
    order: 3
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codeash');
    console.log('✅ MongoDB connected');

    await Problem.deleteMany({});
    console.log('🗑️  Cleared existing problems');

    await Problem.insertMany(problems);
    console.log('✅ Seeded', problems.length, 'problems');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
