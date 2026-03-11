import express from 'express';
import { register, login, getMe, googleAuth } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.get('/profile', protect, getMe); // Alias for profile

export default router;
