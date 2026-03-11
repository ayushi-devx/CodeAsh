// AI-Personalized Problem Generation System
// Analyzes user's solved problems and generates next-level challenges

export const problemProgressionMap = {
  // Arrays
  'two-sum': {
    nextEasy: ['contains-duplicate', 'best-time-to-buy-sell-stock'],
    nextMedium: ['three-sum', 'container-with-most-water'],
    category: 'Array',
    concepts: ['Hash Table', 'Two Pointers']
  },
  'contains-duplicate': {
    nextEasy: ['valid-anagram', 'two-sum'],
    nextMedium: ['group-anagrams', 'top-k-frequent-elements'],
    category: 'Array',
    concepts: ['Hash Table', 'Sorting']
  },
  'best-time-to-buy-sell-stock': {
    nextEasy: ['maximum-subarray'],
    nextMedium: ['best-time-to-buy-sell-stock-ii', 'maximum-product-subarray'],
    category: 'Array',
    concepts: ['Dynamic Programming', 'Greedy']
  },
  
  // Strings
  'valid-anagram': {
    nextEasy: ['valid-palindrome', 'contains-duplicate'],
    nextMedium: ['longest-substring-without-repeating', 'longest-palindromic-substring'],
    category: 'String',
    concepts: ['Hash Table', 'Sorting']
  },
  'valid-palindrome': {
    nextEasy: ['valid-anagram'],
    nextMedium: ['palindromic-substrings', 'longest-palindromic-substring'],
    category: 'String',
    concepts: ['Two Pointers', 'String']
  },
  
  // Linked List
  'reverse-linked-list': {
    nextEasy: ['merge-two-sorted-lists', 'linked-list-cycle'],
    nextMedium: ['reorder-list', 'remove-nth-node-from-end'],
    category: 'Linked List',
    concepts: ['Linked List', 'Recursion']
  },
  'merge-two-sorted-lists': {
    nextEasy: ['reverse-linked-list'],
    nextMedium: ['merge-k-sorted-lists', 'add-two-numbers'],
    category: 'Linked List',
    concepts: ['Linked List', 'Recursion']
  },
  
  // Binary Search
  'binary-search': {
    nextEasy: ['search-insert-position'],
    nextMedium: ['search-in-rotated-sorted-array', 'find-minimum-in-rotated-sorted-array'],
    category: 'Binary Search',
    concepts: ['Binary Search', 'Array']
  },
  
  // Trees
  'maximum-depth-of-binary-tree': {
    nextEasy: ['invert-binary-tree', 'same-tree'],
    nextMedium: ['binary-tree-level-order-traversal', 'validate-binary-search-tree'],
    category: 'Tree',
    concepts: ['Tree', 'DFS', 'BFS']
  },
  'invert-binary-tree': {
    nextEasy: ['maximum-depth-of-binary-tree'],
    nextMedium: ['binary-tree-level-order-traversal', 'construct-binary-tree'],
    category: 'Tree',
    concepts: ['Tree', 'DFS', 'Recursion']
  }
};

export const analyzeUserProgress = (solvedProblems) => {
  const categoryCount = {};
  const difficultyCount = { Easy: 0, Medium: 0, Hard: 0 };
  const conceptsLearned = new Set();
  
  solvedProblems.forEach(problem => {
    // Count by difficulty
    if (problem.difficulty) {
      difficultyCount[problem.difficulty]++;
    }
    
    // Track problem slug for progression
    const slug = problem.problemId?.slug || problem.slug;
    if (slug && problemProgressionMap[slug]) {
      const progression = problemProgressionMap[slug];
      
      // Count by category
      categoryCount[progression.category] = (categoryCount[progression.category] || 0) + 1;
      
      // Track concepts
      progression.concepts.forEach(concept => conceptsLearned.add(concept));
    }
  });
  
  return {
    categoryCount,
    difficultyCount,
    conceptsLearned: Array.from(conceptsLearned),
    totalSolved: solvedProblems.length
  };
};

export const generateNextProblems = (solvedProblems) => {
  const analysis = analyzeUserProgress(solvedProblems);
  const recommendations = [];
  
  // Get last 3 solved problems
  const recentProblems = solvedProblems.slice(-3);
  
  recentProblems.forEach(problem => {
    const slug = problem.problemId?.slug || problem.slug;
    if (slug && problemProgressionMap[slug]) {
      const progression = problemProgressionMap[slug];
      
      // Determine next difficulty based on user's progress
      const categoryProgress = analysis.categoryCount[progression.category] || 0;
      
      if (categoryProgress >= 3 && analysis.difficultyCount.Easy >= 3) {
        // User is ready for medium problems
        recommendations.push(...progression.nextMedium);
      } else {
        // Continue with easy problems
        recommendations.push(...progression.nextEasy);
      }
    }
  });
  
  // Remove duplicates and already solved
  const solvedSlugs = new Set(solvedProblems.map(p => p.problemId?.slug || p.slug));
  const uniqueRecommendations = [...new Set(recommendations)]
    .filter(slug => !solvedSlugs.has(slug))
    .slice(0, 5); // Top 5 recommendations
  
  return {
    recommendations: uniqueRecommendations,
    analysis,
    message: generatePersonalizedMessage(analysis)
  };
};

const generatePersonalizedMessage = (analysis) => {
  const { categoryCount, difficultyCount, totalSolved } = analysis;
  
  if (totalSolved === 0) {
    return "Start your coding journey! We recommend beginning with easy array problems.";
  }
  
  if (difficultyCount.Easy >= 3 && difficultyCount.Medium === 0) {
    return `Great progress! You've solved ${difficultyCount.Easy} easy problems. Ready to level up to medium difficulty?`;
  }
  
  const topCategory = Object.keys(categoryCount).reduce((a, b) => 
    categoryCount[a] > categoryCount[b] ? a : b, 
    Object.keys(categoryCount)[0]
  );
  
  if (topCategory) {
    return `You're excelling in ${topCategory}! Here are some advanced ${topCategory} problems to challenge you.`;
  }
  
  return "Keep up the great work! Here are your personalized recommendations.";
};

export default {
  problemProgressionMap,
  analyzeUserProgress,
  generateNextProblems
};
