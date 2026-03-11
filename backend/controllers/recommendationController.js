import User from '../models/User.js';
import Problem from '../models/Problem.js';
import { generateNextProblems } from '../utils/aiProblemGenerator.js';

// Get AI-personalized problem recommendations
export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user with solved problems populated
    const user = await User.findById(userId).populate('solvedProblems.problemId');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Generate recommendations based on solved problems
    const result = generateNextProblems(user.solvedProblems);
    
    // Fetch actual problem details
    const recommendedProblems = await Problem.find({
      slug: { $in: result.recommendations }
    }).select('title slug difficulty tags acceptanceRate');
    
    res.json({
      success: true,
      data: {
        problems: recommendedProblems,
        analysis: result.analysis,
        message: result.message
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating recommendations',
      error: error.message
    });
  }
};

// Get user's learning path
export const getLearningPath = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('solvedProblems.problemId');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const result = generateNextProblems(user.solvedProblems);
    
    // Create structured learning path
    const learningPath = {
      currentLevel: determineLevelFromAnalysis(result.analysis),
      nextMilestone: getNextMilestone(result.analysis),
      recommendedProblems: await Problem.find({
        slug: { $in: result.recommendations }
      }),
      strengthAreas: getStrengthAreas(result.analysis),
      improvementAreas: getImprovementAreas(result.analysis)
    };
    
    res.json({
      success: true,
      data: learningPath
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating learning path',
      error: error.message
    });
  }
};

const determineLevelFromAnalysis = (analysis) => {
  const { difficultyCount, totalSolved } = analysis;
  
  if (totalSolved === 0) return 'Beginner';
  if (difficultyCount.Easy >= 10 && difficultyCount.Medium >= 5) return 'Intermediate';
  if (difficultyCount.Medium >= 15 && difficultyCount.Hard >= 3) return 'Advanced';
  if (difficultyCount.Hard >= 10) return 'Expert';
  
  return 'Beginner';
};

const getNextMilestone = (analysis) => {
  const { difficultyCount } = analysis;
  
  if (difficultyCount.Easy < 5) {
    return { goal: 'Solve 5 Easy Problems', current: difficultyCount.Easy, target: 5 };
  }
  if (difficultyCount.Medium < 5) {
    return { goal: 'Solve 5 Medium Problems', current: difficultyCount.Medium, target: 5 };
  }
  if (difficultyCount.Hard < 3) {
    return { goal: 'Solve 3 Hard Problems', current: difficultyCount.Hard, target: 3 };
  }
  
  return { goal: 'Master All Categories', current: difficultyCount.Hard, target: 20 };
};

const getStrengthAreas = (analysis) => {
  const { categoryCount } = analysis;
  return Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category, count]) => ({ category, count }));
};

const getImprovementAreas = (analysis) => {
  const allCategories = ['Array', 'String', 'Linked List', 'Tree', 'Binary Search', 'Dynamic Programming'];
  const { categoryCount } = analysis;
  
  return allCategories
    .filter(cat => !categoryCount[cat] || categoryCount[cat] < 3)
    .map(category => ({ category, count: categoryCount[category] || 0 }));
};

export default {
  getRecommendations,
  getLearningPath
};
