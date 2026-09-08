require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const enrollmentRoutes = require('./src/routes/enrollmentRoutes');
const competencyRoutes = require('./src/routes/competencyRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend development (Vite @ 5173, Next.js/React @ 3000, etc.)
app.use(cors({
  origin: '*', // Allow all origins for hackathon ease, or specify [http://localhost:3000, http://localhost:5173]
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());

// Simple request logger for hackathon debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    project: 'CAPACITY CONNECT – Digital Capacity Building & Learning Management Portal',
    version: '1.0.0',
    backendLead: 'Varshitha',
    timestamp: new Date().toISOString()
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', enrollmentRoutes);
app.use('/api', competencyRoutes);
app.use('/api/admin', adminRoutes);

// 404 Handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found. Verify endpoint URL or HTTP method.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error occurred.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 CAPACITY CONNECT API running at: http://localhost:${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📚 Courses API: http://localhost:${PORT}/api/courses`);
  console.log(`👥 Admin Stats: http://localhost:${PORT}/api/admin/stats`);
  console.log(`🎯 Competency Gaps: http://localhost:${PORT}/api/competency-gaps/user-trainee-1`);
  console.log('====================================================');
});
