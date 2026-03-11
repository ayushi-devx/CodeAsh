import express from 'express';
import { getRecommendations, getLearningPath } from '../controllers/recommendationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get AI-personalized recommendations
router.get('/recommendations', protect, getRecommendations);

// Get complete learning path
router.get('/learning-path', protect, getLearningPath);

export default router;
