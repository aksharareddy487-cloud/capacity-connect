const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/signup - Register user
router.post('/signup', signup);

// POST /api/auth/login - Login user & receive JWT
router.post('/login', login);

// GET /api/auth/me - Get current user profile (protected)
router.get('/me', protect, getMe);

module.exports = router;
