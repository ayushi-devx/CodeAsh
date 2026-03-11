import express from 'express';
import {
  createRace,
  joinRace,
  startRace,
  updateProgress,
  finishRace,
  getRaceStatus,
  getLeaderboard
} from '../controllers/typingRaceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Race management
router.post('/create', createRace);
router.post('/join', joinRace);
router.post('/:raceId/start', startRace);
router.post('/:raceId/progress', updateProgress);
router.post('/:raceId/finish', finishRace);
router.get('/:raceId/status', getRaceStatus);
router.get('/leaderboard', getLeaderboard);

export default router;
