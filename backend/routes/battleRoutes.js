import express from 'express';
import {
  createRoom,
  joinRoom,
  findMatch,
  startBattle,
  submitSolution,
  getBattleStatus,
  getBattleHistory,
  cancelMatchmaking
} from '../controllers/battleController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Room match routes
router.post('/room/create', createRoom);
router.post('/room/join', joinRoom);

// Random match routes
router.post('/match/find', findMatch);
router.post('/match/cancel', cancelMatchmaking);

// Battle routes
router.post('/:battleId/start', startBattle);
router.post('/:battleId/submit', submitSolution);
router.get('/:battleId/status', getBattleStatus);

// History
router.get('/history', getBattleHistory);

export default router;
