const express = require('express');
const router = express.Router();
const {
  enrollInCourse,
  getUserEnrollments,
  getUserProgress,
  updateProgress
} = require('../controllers/enrollmentController');

// POST /api/enroll - Enroll user in a course
router.post('/enroll', enrollInCourse);

// GET /api/enrollments/user/:userId - Get enrolled courses for user (Akshara's trainee screen)
router.get('/enrollments/user/:userId', getUserEnrollments);

// GET /api/progress/:userId - Trainee progress summary
router.get('/progress/:userId', getUserProgress);

// PUT /api/progress/:enrollmentId - Update enrollment progress %
router.put('/progress/:enrollmentId', updateProgress);

module.exports = router;
