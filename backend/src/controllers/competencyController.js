const { User, Course, RoleRequirement, Skill } = require('../models');
const { calculateCompetencyGap } = require('../services/competencyEngine');

/**
 * @desc    Get competency gaps and course recommendations for a user
 * @route   GET /api/competency-gaps/:userId
 * @access  Public / Authenticated
 */
const getCompetencyGapByUser = async (req, res) => {
  try {
    const userId = req.params.userId === 'me' && req.user ? req.user.id : req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User not found with id ${userId}`
      });
    }

    // Find role requirement matching user's targetRole (or fallback to first role requirement)
    let roleReq = await RoleRequirement.findOne({ roleTitle: user.targetRole });
    if (!roleReq) {
      const allRoles = await RoleRequirement.find();
      roleReq = allRoles[0] || {
        roleTitle: user.targetRole || 'E-Governance Specialist',
        requiredSkills: ['Cloud Computing in Public Sector', 'Digital Tools & Workflow Automation', 'Citizen Centric Service Delivery']
      };
    }

    // Get all courses
    const allCourses = await Course.find();

    // Call Laxmi Prasanna's rule-based recommendation logic
    const gapAnalysis = calculateCompetencyGap(user, roleReq, allCourses);

    return res.status(200).json({
      success: true,
      data: gapAnalysis
    });
  } catch (error) {
    console.error('getCompetencyGapByUser error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to compute competency gaps.',
      error: error.message
    });
  }
};

/**
 * @desc    Get all available skills in taxonomy
 * @route   GET /api/skills
 * @access  Public
 */
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    console.error('getAllSkills error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve skills taxonomy.'
    });
  }
};

/**
 * @desc    Get all role requirements
 * @route   GET /api/role-requirements
 * @access  Public
 */
const getAllRoleRequirements = async (req, res) => {
  try {
    const roles = await RoleRequirement.find();
    return res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    console.error('getAllRoleRequirements error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve role requirements.'
    });
  }
};

module.exports = {
  getCompetencyGapByUser,
  getAllSkills,
  getAllRoleRequirements
};
