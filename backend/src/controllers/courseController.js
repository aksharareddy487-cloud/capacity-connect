const { Course, Enrollment, User } = require('../models');

/**
 * @desc    Get all courses with optional filters
 * @route   GET /api/courses
 * @access  Public
 */
const getAllCourses = async (req, res) => {
  try {
    const { category, instructorId, level, skill, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (instructorId) filter.instructorId = instructorId;
    if (level) filter.level = level;
    if (skill) filter.skill = skill;
    if (search) filter.search = search;

    const courses = await Course.find(filter);

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('getAllCourses error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve courses.',
      error: error.message
    });
  }
};

/**
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
 */
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id ${req.params.id}`
      });
    }

    return res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('getCourseById error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve course.',
      error: error.message
    });
  }
};

/**
 * @desc    Create new course (Trainer or Admin)
 * @route   POST /api/courses
 * @access  Private (Trainer/Admin)
 */
const createCourse = async (req, res) => {
  try {
    const { title, description, category, duration, level, skillsTaught, modules } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Course title and description are required.'
      });
    }

    const instructorId = req.user ? req.user.id : (req.body.instructorId || 'user-trainer-1');
    const instructorName = req.user ? req.user.name : (req.body.instructorName || 'Prof. Sunita Deshmukh');

    const newCourse = await Course.create({
      title: title.trim(),
      description: description.trim(),
      category: category || 'General',
      instructorId,
      instructorName,
      duration: duration || '3 Hours',
      level: level || 'Beginner',
      skillsTaught: Array.isArray(skillsTaught) ? skillsTaught : (skillsTaught ? [skillsTaught] : []),
      modules: Array.isArray(modules) && modules.length > 0 ? modules : [
        { id: 'm-1', title: 'Course Introduction & Objectives', duration: '30 mins' },
        { id: 'm-2', title: 'Core Concepts & Case Studies', duration: '60 mins' },
        { id: 'm-3', title: 'Assessment & Practical Takeaways', duration: '45 mins' }
      ]
    });

    return res.status(201).json({
      success: true,
      message: 'Course created successfully.',
      data: newCourse
    });
  } catch (error) {
    console.error('createCourse error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create course.',
      error: error.message
    });
  }
};

/**
 * @desc    Update course by ID
 * @route   PUT /api/courses/:id
 * @access  Private (Trainer/Admin)
 */
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id ${req.params.id}`
      });
    }

    // Ensure only instructor or admin can edit
    if (req.user && req.user.role !== 'admin' && course.instructorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this course.'
      });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('updateCourse error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update course.',
      error: error.message
    });
  }
};

/**
 * @desc    Delete course by ID
 * @route   DELETE /api/courses/:id
 * @access  Private (Admin or Course Creator)
 */
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id ${req.params.id}`
      });
    }

    const deleted = await Course.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully.',
      data: deleted
    });
  } catch (error) {
    console.error('deleteCourse error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete course.',
      error: error.message
    });
  }
};

/**
 * @desc    Get enrolled trainees for a specific course (for Sreeja's trainer dashboard)
 * @route   GET /api/courses/:id/trainees
 * @access  Private (Trainer/Admin)
 */
const getCourseTrainees = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course not found with id ${req.params.id}`
      });
    }

    const enrollments = await Enrollment.find({ courseId: req.params.id });
    
    // Join with user data
    const traineesWithProgress = await Promise.all(
      enrollments.map(async (enrollment) => {
        const user = await User.findById(enrollment.userId);
        return {
          enrollmentId: enrollment.id,
          userId: enrollment.userId,
          traineeName: user ? user.name : 'Unknown',
          traineeEmail: user ? user.email : 'Unknown',
          department: user ? user.department : 'N/A',
          progress: enrollment.progress,
          status: enrollment.status,
          enrolledAt: enrollment.enrolledAt,
          completedAt: enrollment.completedAt
        };
      })
    );

    return res.status(200).json({
      success: true,
      courseId: course.id,
      courseTitle: course.title,
      totalEnrolled: traineesWithProgress.length,
      trainees: traineesWithProgress
    });
  } catch (error) {
    console.error('getCourseTrainees error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve course trainees.',
      error: error.message
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseTrainees
};
