// gapLogic.js
// Pure functions only: no DB calls, no I/O.

const { getSkillById, getRequiredSkillsForRole } = require("./skills.js");

function calculateGap(userSkills, roleId) {
  const required = getRequiredSkillsForRole(roleId);

  return required
    .map((req) => {
      const owned = userSkills.find((s) => s.skillId === req.skillId);
      const currentLevel = owned ? owned.level : 0;
      const gapSize = Math.max(0, req.requiredLevel - currentLevel);
      const skill = getSkillById(req.skillId);

      return {
        skillId: req.skillId,
        skillName: skill ? skill.name : req.skillId,
        currentLevel,
        requiredLevel: req.requiredLevel,
        gapSize,
      };
    })
    .filter((g) => g.gapSize > 0);
}

function prioritizeGaps(gaps) {
  return [...gaps].sort((a, b) => b.gapSize - a.gapSize);
}

function isCompetent(userSkills, roleId) {
  return calculateGap(userSkills, roleId).length === 0;
}

module.exports = {
  calculateGap,
  prioritizeGaps,
  isCompetent,
};

// ---- Quick manual test (run: node competency/gapLogic.js) ----
if (require.main === module) {
  const fakeTrainee = {
    skills: [
      { skillId: "skill_sql", level: 2 },
      { skillId: "skill_python", level: 3 },
    ],
  };

  const gaps = calculateGap(fakeTrainee.skills, "role_data_analyst");
  console.log("Raw gaps:", gaps);
  console.log("Prioritized:", prioritizeGaps(gaps));
  console.log("Is competent?", isCompetent(fakeTrainee.skills, "role_data_analyst"));
}