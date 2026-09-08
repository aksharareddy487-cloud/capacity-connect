const express = require('express');
const router = express.Router();
const { getAllUsers, getAdminStats } = require('../controllers/adminController');

// GET /api/admin/users - List all users with role (Yeshwith's admin table)
router.get('/users', getAllUsers);

// GET /api/admin/stats - Summary statistics and chart metrics (Yeshwith's cards & charts)
router.get('/stats', getAdminStats);

module.exports = router;
