import express from 'express';
import {
  startInterview,
  getCurrentQuestion,
  submitAnswer,
  getInterviewReport,
  getInterviewHistory
} from '../controllers/interviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All interview routes require authentication
router.post('/start', protect, startInterview);
router.get('/:interviewId/question', protect, getCurrentQuestion);
router.post('/:interviewId/answer', protect, submitAnswer);
router.get('/:interviewId/report', protect, getInterviewReport);
router.get('/history', protect, getInterviewHistory);

export default router;
