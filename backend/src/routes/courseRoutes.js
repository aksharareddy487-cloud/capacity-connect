const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseTrainees
} = require('../controllers/courseController');

// GET /api/courses - List all courses with filtering
router.get('/', getAllCourses);

// GET /api/courses/:id - Single course details
router.get('/:id', getCourseById);

// POST /api/courses - Create new course (for Sreeja / Trainers)
router.post('/', createCourse);

// PUT /api/courses/:id - Update course
router.put('/:id', updateCourse);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', deleteCourse);

// GET /api/courses/:id/trainees - List enrolled trainees for a course (for Sreeja's Trainer view)
router.get('/:id/trainees', getCourseTrainees);

module.exports = router;
