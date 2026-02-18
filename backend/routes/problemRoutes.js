import express from 'express';
import {
  getProblems,
  getProblemBySlug,
  toggleBookmark,
  getProblemStats,
  getEditorial,
  getSolutions,
  getUserSubmissions
} from '../controllers/problemController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProblems);
router.get('/stats', protect, getProblemStats);
router.get('/:slug', getProblemBySlug);
router.get('/:slug/editorial', getEditorial);
router.get('/:slug/solutions', getSolutions);
router.get('/:slug/submissions', protect, getUserSubmissions);
router.post('/:problemId/bookmark', protect, toggleBookmark);

export default router;
