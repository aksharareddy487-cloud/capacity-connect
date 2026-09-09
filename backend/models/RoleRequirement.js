const mongoose = require('mongoose');

const roleRequirementSchema = new mongoose.Schema({
  role: String,
  requiredSkills: [String]
});

module.exports = mongoose.model('RoleRequirement', roleRequirementSchema);
