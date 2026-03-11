export const codeSnippets = {
  javascript: {
    Easy: [
      `function sum(a, b) {\n  return a + b;\n}`,
      `const arr = [1, 2, 3, 4, 5];\nconst doubled = arr.map(x => x * 2);`,
      `function isEven(num) {\n  return num % 2 === 0;\n}`,
      `const greeting = "Hello World";\nconsole.log(greeting);`,
      `const obj = { name: "John", age: 30 };\nconsole.log(obj.name);`
    ],
    Medium: [
      `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
      `const twoSum = (nums, target) => {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n};`,
      `function reverseString(str) {\n  return str.split('').reverse().join('');\n}`,
      `const isPalindrome = (str) => {\n  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n};`,
      `function findMax(arr) {\n  return Math.max(...arr);\n}`
    ],
    Hard: [
      `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}`,
      `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n}`,
      `function longestSubstring(s) {\n  let max = 0, start = 0;\n  const map = new Map();\n  for (let i = 0; i < s.length; i++) {\n    if (map.has(s[i])) start = Math.max(start, map.get(s[i]) + 1);\n    map.set(s[i], i);\n    max = Math.max(max, i - start + 1);\n  }\n  return max;\n}`
    ]
  },
  python: {
    Easy: [
      `def sum(a, b):\n    return a + b`,
      `arr = [1, 2, 3, 4, 5]\ndoubled = [x * 2 for x in arr]`,
      `def is_even(num):\n    return num % 2 == 0`,
      `greeting = "Hello World"\nprint(greeting)`,
      `person = {"name": "John", "age": 30}\nprint(person["name"])`
    ],
    Medium: [
      `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n - 1) + fibonacci(n - 2)`,
      `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i`,
      `def reverse_string(s):\n    return s[::-1]`,
      `def is_palindrome(s):\n    cleaned = ''.join(c.lower() for c in s if c.isalnum())\n    return cleaned == cleaned[::-1]`,
      `def find_max(arr):\n    return max(arr)`
    ],
    Hard: [
      `def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[-1]\n    left = [x for x in arr[:-1] if x <= pivot]\n    right = [x for x in arr[:-1] if x > pivot]\n    return quick_sort(left) + [pivot] + quick_sort(right)`,
      `class LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = {}\n    def get(self, key):\n        if key not in self.cache:\n            return -1\n        val = self.cache.pop(key)\n        self.cache[key] = val\n        return val`,
      `def longest_substring(s):\n    max_len = start = 0\n    seen = {}\n    for i, char in enumerate(s):\n        if char in seen:\n            start = max(start, seen[char] + 1)\n        seen[char] = i\n        max_len = max(max_len, i - start + 1)\n    return max_len`
    ]
  },
  cpp: {
    Easy: [
      `int sum(int a, int b) {\n    return a + b;\n}`,
      `vector<int> arr = {1, 2, 3, 4, 5};\nfor (int x : arr) cout << x * 2;`,
      `bool isEven(int num) {\n    return num % 2 == 0;\n}`,
      `string greeting = "Hello World";\ncout << greeting;`,
      `int arr[] = {1, 2, 3, 4, 5};\nint size = sizeof(arr) / sizeof(arr[0]);`
    ],
    Medium: [
      `int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
      `vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if (map.count(complement)) {\n            return {map[complement], i};\n        }\n        map[nums[i]] = i;\n    }\n}`,
      `string reverseString(string s) {\n    reverse(s.begin(), s.end());\n    return s;\n}`,
      `bool isPalindrome(string s) {\n    string cleaned;\n    for (char c : s) if (isalnum(c)) cleaned += tolower(c);\n    string rev = cleaned;\n    reverse(rev.begin(), rev.end());\n    return cleaned == rev;\n}`
    ],
    Hard: [
      `void quickSort(vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) swap(arr[++i], arr[j]);\n        }\n        swap(arr[i + 1], arr[high]);\n        quickSort(arr, low, i);\n        quickSort(arr, i + 2, high);\n    }\n}`,
      `class LRUCache {\n    int capacity;\n    list<pair<int, int>> cache;\n    unordered_map<int, list<pair<int, int>>::iterator> map;\npublic:\n    LRUCache(int cap) : capacity(cap) {}\n    int get(int key) {\n        if (map.find(key) == map.end()) return -1;\n        cache.splice(cache.begin(), cache, map[key]);\n        return map[key]->second;\n    }\n};`
    ]
  },
  java: {
    Easy: [
      `public int sum(int a, int b) {\n    return a + b;\n}`,
      `int[] arr = {1, 2, 3, 4, 5};\nfor (int x : arr) System.out.println(x * 2);`,
      `public boolean isEven(int num) {\n    return num % 2 == 0;\n}`,
      `String greeting = "Hello World";\nSystem.out.println(greeting);`,
      `int[] numbers = new int[5];\nArrays.fill(numbers, 0);`
    ],
    Medium: [
      `public int fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
      `public int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int complement = target - nums[i];\n        if (map.containsKey(complement)) {\n            return new int[] {map.get(complement), i};\n        }\n        map.put(nums[i], i);\n    }\n    return new int[] {};\n}`,
      `public String reverseString(String s) {\n    return new StringBuilder(s).reverse().toString();\n}`,
      `public boolean isPalindrome(String s) {\n    String cleaned = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();\n    return cleaned.equals(new StringBuilder(cleaned).reverse().toString());\n}`
    ],
    Hard: [
      `public void quickSort(int[] arr, int low, int high) {\n    if (low < high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n        quickSort(arr, low, i);\n        quickSort(arr, i + 2, high);\n    }\n}`
    ]
  }
};

export const getRandomSnippet = (language, difficulty) => {
  const snippets = codeSnippets[language]?.[difficulty];
  if (!snippets || snippets.length === 0) {
    return codeSnippets.javascript.Easy[0];
  }
  return snippets[Math.floor(Math.random() * snippets.length)];
};
