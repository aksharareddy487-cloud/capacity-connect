const { Enrollment, Course, User } = require('../models');

/**
 * @desc    Enroll a user in a course
 * @route   POST /api/enroll
 * @access  Private or Public (Accepts userId in body or from JWT)
 */
const enrollInCourse = async (req, res) => {
  try {
    const userId = (req.user && req.user.id) || req.body.userId;
    const { courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'userId and courseId are required for enrollment.'
      });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course with id ${courseId} does not exist.`
      });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'User is already enrolled in this course.',
        data: existing
      });
    }

    // Create new enrollment
    const newEnrollment = await Enrollment.create({
      userId,
      courseId,
      progress: 0,
      status: 'enrolled',
      enrolledAt: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully enrolled in course.',
      data: {
        ...newEnrollment,
        courseTitle: course.title,
        courseCategory: course.category
      }
    });
  } catch (error) {
    console.error('enrollInCourse error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to complete enrollment.',
      error: error.message
    });
  }
};

/**
 * @desc    Get all enrolled courses for a user
 * @route   GET /api/enrollments/user/:userId
 * @access  Public / Authenticated
 */
const getUserEnrollments = async (req, res) => {
  try {
    const { userId } = req.params;
    const enrollments = await Enrollment.find({ userId });

    // Join with course details
    const populated = await Promise.all(
      enrollments.map(async (enr) => {
        const course = await Course.findById(enr.courseId);
        return {
          ...enr,
          course: course || null
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: populated.length,
      data: populated
    });
  } catch (error) {
    console.error('getUserEnrollments error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enrollments.',
      error: error.message
    });
  }
};

/**
 * @desc    Get user overall learning progress
 * @route   GET /api/progress/:userId
 * @access  Public / Authenticated
 */
const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const enrollments = await Enrollment.find({ userId });

    const totalEnrolled = enrollments.length;
    const completedCourses = enrollments.filter((e) => e.status === 'completed' || e.progress === 100);
    const inProgressCourses = enrollments.filter((e) => e.status !== 'completed' && e.progress < 100);

    const totalProgressPoints = enrollments.reduce((acc, curr) => acc + (curr.progress || 0), 0);
    const averageCompletionRate = totalEnrolled > 0 
      ? Math.round(totalProgressPoints / totalEnrolled) 
      : 0;

    // Attach course meta for detailed view
    const detailedCourses = await Promise.all(
      enrollments.map(async (e) => {
        const course = await Course.findById(e.courseId);
        return {
          enrollmentId: e.id,
          courseId: e.courseId,
          courseTitle: course ? course.title : 'Unknown Course',
          category: course ? course.category : 'General',
          progress: e.progress,
          status: e.status,
          enrolledAt: e.enrolledAt,
          completedAt: e.completedAt
        };
      })
    );

    return res.status(200).json({
      success: true,
      userId,
      userName: user ? user.name : 'Unknown',
      department: user ? user.department : 'General',
      totalEnrolled,
      completedCount: completedCourses.length,
      inProgressCount: inProgressCourses.length,
      averageCompletionRate, // e.g. 70%
      courses: detailedCourses
    });
  } catch (error) {
    console.error('getUserProgress error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve progress data.',
      error: error.message
    });
  }
};

/**
 * @desc    Update progress of an enrollment
 * @route   PUT /api/progress/:enrollmentId
 * @access  Private / Public
 */
const updateProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { progress } = req.body;

    if (progress === undefined || progress === null || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: 'Progress value must be a number between 0 and 100.'
      });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Enrollment with id ${enrollmentId} not found.`
      });
    }

    const updates = {
      progress: Number(progress),
      status: Number(progress) === 100 ? 'completed' : 'in-progress'
    };

    if (Number(progress) === 100 && !enrollment.completedAt) {
      updates.completedAt = new Date().toISOString();
    }

    const updated = await Enrollment.findByIdAndUpdate(enrollmentId, updates);

    return res.status(200).json({
      success: true,
      message: 'Progress updated successfully.',
      data: updated
    });
  } catch (error) {
    console.error('updateProgress error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update progress.',
      error: error.message
    });
  }
};

module.exports = {
  enrollInCourse,
  getUserEnrollments,
  getUserProgress,
  updateProgress
};
