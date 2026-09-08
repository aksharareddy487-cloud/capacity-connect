// skills.js
// Source of truth for: skills, role requirements, and trainer subject-competencies.

// ---- Master skill/subject list ----
const SKILLS = [
  { id: "skill_sql", name: "SQL", category: "data" },
  { id: "skill_data_analysis", name: "Data Analysis", category: "data" },
  { id: "skill_python", name: "Python", category: "data" },
  { id: "skill_data_viz", name: "Data Visualization", category: "data" },
  { id: "skill_cloud_basics", name: "Cloud Basics", category: "cloud" },
  { id: "skill_aws", name: "AWS", category: "cloud" },
  { id: "skill_js", name: "JavaScript", category: "engineering" },
  { id: "skill_react", name: "React", category: "engineering" },
  { id: "skill_communication", name: "Communication", category: "soft" },
  { id: "skill_project_mgmt", name: "Project Management", category: "soft" },
];

// ---- Role -> required skills + level (0-5 scale) ----
const ROLE_REQUIREMENTS = {
  role_data_analyst: [
    { skillId: "skill_sql", requiredLevel: 4 },
    { skillId: "skill_data_analysis", requiredLevel: 4 },
    { skillId: "skill_python", requiredLevel: 3 },
    { skillId: "skill_data_viz", requiredLevel: 3 },
  ],
  role_cloud_engineer: [
    { skillId: "skill_cloud_basics", requiredLevel: 4 },
    { skillId: "skill_aws", requiredLevel: 4 },
    { skillId: "skill_communication", requiredLevel: 3 },
  ],
  role_frontend_dev: [
    { skillId: "skill_js", requiredLevel: 4 },
    { skillId: "skill_react", requiredLevel: 4 },
    { skillId: "skill_communication", requiredLevel: 2 },
  ],
};

// ---- Fake trainer directory (stand-in for real DB) ----
const TRAINERS = [
  {
    trainerId: "trainer_1",
    name: "R. Kumar",
    subjects: [
      { skillId: "skill_sql", level: 5 },
      { skillId: "skill_data_analysis", level: 4 },
    ],
  },
  {
    trainerId: "trainer_2",
    name: "A. Sharma",
    subjects: [
      { skillId: "skill_aws", level: 5 },
      { skillId: "skill_cloud_basics", level: 5 },
    ],
  },
  {
    trainerId: "trainer_3",
    name: "P. Iyer",
    subjects: [
      { skillId: "skill_js", level: 5 },
      { skillId: "skill_react", level: 4 },
      { skillId: "skill_communication", level: 3 },
    ],
  },
];

// ---- Lookup helpers ----
function getSkillById(skillId) {
  return SKILLS.find((s) => s.id === skillId) || null;
}

function getRequiredSkillsForRole(roleId) {
  return ROLE_REQUIREMENTS[roleId] || [];
}

function getAllTrainers() {
  return TRAINERS;
}

module.exports = {
  SKILLS,
  ROLE_REQUIREMENTS,
  TRAINERS,
  getSkillById,
  getRequiredSkillsForRole,
  getAllTrainers,
};

// ---- Quick manual test (run: node competency/skills.js) ----
if (require.main === module) {
  console.log("Required skills for Data Analyst:", getRequiredSkillsForRole("role_data_analyst"));
  console.log("Skill lookup (skill_sql):", getSkillById("skill_sql"));
  console.log("All trainers:", getAllTrainers());
}