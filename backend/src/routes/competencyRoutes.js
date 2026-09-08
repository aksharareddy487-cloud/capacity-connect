const express = require('express');
const router = express.Router();
const {
  getCompetencyGapByUser,
  getAllSkills,
  getAllRoleRequirements
} = require('../controllers/competencyController');

// GET /api/competency-gaps/:userId - Laxmi Prasanna's competency gap & recommendation engine
router.get('/competency-gaps/:userId', getCompetencyGapByUser);

// GET /api/skills - Full skills taxonomy
router.get('/skills', getAllSkills);

// GET /api/role-requirements - Role requirements definitions
router.get('/role-requirements', getAllRoleRequirements);

module.exports = router;
