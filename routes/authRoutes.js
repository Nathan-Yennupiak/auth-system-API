import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

// Initialize Router
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route
router.post('/logout', protect, logout);

export default router;