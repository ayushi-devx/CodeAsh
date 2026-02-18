import Problem from '../models/Problem.js';
import User from '../models/User.js';

// Get all problems with filters
export const getProblems = async (req, res) => {
  try {
    const {
      search,
      difficulty,
      tags,
      companies,
      status,
      sortBy = 'order',
      page = 1,
      limit = 50
    } = req.query;

    const query = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Difficulty filter
    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }
    
    // Tags filter
    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }
    
    // Companies filter
    if (companies) {
      const companyArray = companies.split(',');
      query.companies = { $in: companyArray };
    }

    // Sorting
    let sortOption = {};
    switch (sortBy) {
      case 'mostSolved':
        sortOption = { totalSubmissions: -1 };
        break;
      case 'acceptance':
        sortOption = { acceptanceRate: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      case 'difficulty':
        sortOption = { difficulty: 1, order: 1 };
        break;
      default:
        sortOption = { order: 1 };
    }

    const skip = (page - 1) * limit;

    const problems = await Problem.find(query)
      .select('-solution -testCases')
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Problem.countDocuments(query);

    // If user is authenticated, add their status
    let problemsWithStatus = problems;
    if (req.user) {
      const user = await User.findById(req.user.id);
      problemsWithStatus = problems.map(problem => {
        const problemObj = problem.toObject();
        const isSolved = user.solvedProblems.some(
          sp => sp.problemId.toString() === problem._id.toString()
        );
        const isAttempted = user.attemptedProblems.some(
          ap => ap.toString() === problem._id.toString()
        );
        const isBookmarked = user.bookmarkedProblems.some(
          bp => bp.toString() === problem._id.toString()
        );
        
        return {
          ...problemObj,
          status: isSolved ? 'solved' : isAttempted ? 'attempted' : 'unsolved',
          isBookmarked
        };
      });
    }

    res.json({
      success: true,
      data: problemsWithStatus,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching problems',
      error: error.message
    });
  }
};

// Get single problem by slug
export const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const problem = await Problem.findOne({ slug })
      .select('-solution');

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Filter out hidden test cases for non-admin users
    const problemObj = problem.toObject();
    problemObj.testCases = problemObj.testCases.filter(tc => !tc.isHidden);

    // Add user status if authenticated
    if (req.user) {
      const user = await User.findById(req.user.id);
      const isSolved = user.solvedProblems.some(
        sp => sp.problemId.toString() === problem._id.toString()
      );
      const isAttempted = user.attemptedProblems.some(
        ap => ap.toString() === problem._id.toString()
      );
      const isBookmarked = user.bookmarkedProblems.some(
        bp => bp.toString() === problem._id.toString()
      );
      
      problemObj.userStatus = {
        solved: isSolved,
        attempted: isAttempted,
        bookmarked: isBookmarked
      };
    }

    res.json({
      success: true,
      data: problemObj
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching problem',
      error: error.message
    });
  }
};

// Toggle bookmark
export const toggleBookmark = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    const bookmarkIndex = user.bookmarkedProblems.indexOf(problemId);
    
    if (bookmarkIndex > -1) {
      user.bookmarkedProblems.splice(bookmarkIndex, 1);
    } else {
      user.bookmarkedProblems.push(problemId);
    }

    await user.save();

    res.json({
      success: true,
      isBookmarked: bookmarkIndex === -1
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling bookmark',
      error: error.message
    });
  }
};

// Get problem statistics
export const getProblemStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    const totalProblems = await Problem.countDocuments();
    const easyCount = await Problem.countDocuments({ difficulty: 'Easy' });
    const mediumCount = await Problem.countDocuments({ difficulty: 'Medium' });
    const hardCount = await Problem.countDocuments({ difficulty: 'Hard' });

    const solvedEasy = user.solvedProblems.filter(async sp => {
      const problem = await Problem.findById(sp.problemId);
      return problem && problem.difficulty === 'Easy';
    }).length;

    const solvedMedium = user.solvedProblems.filter(async sp => {
      const problem = await Problem.findById(sp.problemId);
      return problem && problem.difficulty === 'Medium';
    }).length;

    const solvedHard = user.solvedProblems.filter(async sp => {
      const problem = await Problem.findById(sp.problemId);
      return problem && problem.difficulty === 'Hard';
    }).length;

    res.json({
      success: true,
      data: {
        total: {
          all: totalProblems,
          easy: easyCount,
          medium: mediumCount,
          hard: hardCount
        },
        solved: {
          all: user.solvedProblems.length,
          easy: solvedEasy,
          medium: solvedMedium,
          hard: solvedHard
        },
        attempted: user.attemptedProblems.length,
        acceptanceRate: user.totalSubmissions > 0 
          ? ((user.acceptedSubmissions / user.totalSubmissions) * 100).toFixed(1)
          : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// Get problem editorial
export const getEditorial = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const problem = await Problem.findOne({ slug }).select('editorial title');

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    res.json({
      success: true,
      data: {
        editorial: problem.editorial || 'Editorial coming soon...'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching editorial',
      error: error.message
    });
  }
};

// Get problem solutions (community solutions)
export const getSolutions = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const problem = await Problem.findOne({ slug }).select('title');

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Mock solutions for now - in production, fetch from submissions
    const solutions = [
      {
        id: 1,
        author: 'CodeMaster',
        language: 'JavaScript',
        votes: 245,
        title: 'Clean Hash Map Solution - O(n) Time',
        code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
        explanation: 'Using a hash map to store complements for O(n) time complexity.',
        runtime: '52ms',
        memory: '42.1MB'
      }
    ];

    res.json({
      success: true,
      data: solutions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching solutions',
      error: error.message
    });
  }
};

// Get user submissions for a problem
export const getUserSubmissions = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;
    
    const problem = await Problem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    const user = await User.findById(userId);
    const submissions = user.submissions
      .filter(sub => sub.problemId.toString() === problem._id.toString())
      .sort((a, b) => b.submittedAt - a.submittedAt)
      .slice(0, 20); // Last 20 submissions

    res.json({
      success: true,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};

export default {
  getProblems,
  getProblemBySlug,
  toggleBookmark,
  getProblemStats,
  getEditorial,
  getSolutions,
  getUserSubmissions
};
