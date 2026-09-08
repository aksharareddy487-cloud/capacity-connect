const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  progress: { type: Number, default: 0 },
  status: { type: String, enum: ['enrolled', 'in-progress', 'completed'], default: 'enrolled' }
}, { timestamps: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
