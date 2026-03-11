import express from 'express';
import { explainCode, chatWithAI, generateProblem, getHints } from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All AI routes require authentication
router.post('/explain-code', protect, explainCode);
router.post('/chat', protect, chatWithAI);
router.post('/generate-problem', protect, generateProblem);
router.post('/hints', protect, getHints);

export default router;
