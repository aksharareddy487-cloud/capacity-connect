const { User, Course, Enrollment, Skill } = require('../models');

/**
 * @desc    Get all registered users with role and department
 * @route   GET /api/admin/users
 * @access  Private / Public (Demo friendly)
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // Exclude password field
    const sanitized = users.map(({ password, ...u }) => u);

    return res.status(200).json({
      success: true,
      count: sanitized.length,
      data: sanitized
    });
  } catch (error) {
    console.error('getAllUsers error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve users.',
      error: error.message
    });
  }
};

/**
 * @desc    Get system analytics & summary stats (for Yeshwith's dashboard & charts)
 * @route   GET /api/admin/stats
 * @access  Public / Authenticated
 */
const getAdminStats = async (req, res) => {
  try {
    const users = await User.find();
    const courses = await Course.find();
    const enrollments = await Enrollment.find();

    const trainees = users.filter((u) => u.role === 'trainee');
    const trainers = users.filter((u) => u.role === 'trainer');
    const admins = users.filter((u) => u.role === 'admin');

    // Calculate completion metrics
    const completedCount = enrollments.filter((e) => e.status === 'completed' || e.progress === 100).length;
    const inProgressCount = enrollments.filter((e) => e.status === 'in-progress' || (e.progress > 0 && e.progress < 100)).length;
    const enrolledOnlyCount = enrollments.filter((e) => e.status === 'enrolled' && (!e.progress || e.progress === 0)).length;

    const totalProgressPoints = enrollments.reduce((acc, curr) => acc + (curr.progress || 0), 0);
    const averageCompletionRate = enrollments.length > 0 
      ? Math.round(totalProgressPoints / enrollments.length) 
      : 0;

    // Courses by Category (for Chart.js / Recharts Bar or Pie chart)
    const categoryMap = {};
    courses.forEach((c) => {
      categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
    });
    const coursesByCategory = Object.keys(categoryMap).map((cat) => ({
      category: cat,
      count: categoryMap[cat]
    }));

    // Department breakdown
    const deptMap = {};
    users.forEach((u) => {
      const dept = u.department || 'Other';
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });
    const departmentBreakdown = Object.keys(deptMap).map((dept) => ({
      department: dept,
      users: deptMap[dept]
    }));

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers: users.length,
        totalTrainees: trainees.length,
        totalTrainers: trainers.length,
        totalAdmins: admins.length,
        totalCourses: courses.length,
        totalEnrollments: enrollments.length,
        averageCompletionRate, // e.g. 67%
        completedEnrollments: completedCount,
        inProgressEnrollments: inProgressCount
      },
      chartData: {
        coursesByCategory, // Perfect for Bar / Pie chart
        enrollmentStatus: [
          { status: 'Completed', count: completedCount, color: '#10B981' },
          { status: 'In Progress', count: inProgressCount, color: '#F59E0B' },
          { status: 'Enrolled', count: enrolledOnlyCount, color: '#3B82F6' }
        ],
        departmentBreakdown
      }
    });
  } catch (error) {
    console.error('getAdminStats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin stats.',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getAdminStats
};
