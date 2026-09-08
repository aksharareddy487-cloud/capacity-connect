// competencyEngine.js
// The ONLY file other parts of the app should import from.

const { getAllTrainers, getSkillById } = require("./skills.js");
const { calculateGap, prioritizeGaps } = require("./gapLogic.js");
const { getCoursesForGaps } = require("./courseMapping.js");

function assessCompetency(userSkills, roleId, courseList) {
  const rawGaps = calculateGap(userSkills, roleId);
  const gaps = prioritizeGaps(rawGaps);
  const recommendations = getCoursesForGaps(gaps, courseList);

  return { gaps, recommendations };
}

function findSuitableTrainers(subjectSkillId, trainerList) {
  const trainers = trainerList || getAllTrainers();

  return trainers
    .map((trainer) => {
      const match = trainer.subjects.find((s) => s.skillId === subjectSkillId);
      return match
        ? { trainerId: trainer.trainerId, name: trainer.name, level: match.level }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.level - a.level);
}

module.exports = {
  assessCompetency,
  findSuitableTrainers,
};

// ---- Quick manual test (run: node competency/competencyEngine.js) ----
if (require.main === module) {
  const fakeTrainee = {
    userId: "u1",
    skills: [
      { skillId: "skill_sql", level: 2 },
      { skillId: "skill_python", level: 3 },
    ],
  };

  console.log("=== assessCompetency ===");
  console.log(JSON.stringify(assessCompetency(fakeTrainee.skills, "role_data_analyst"), null, 2));

  console.log("\n=== findSuitableTrainers for SQL ===");
  console.log(findSuitableTrainers("skill_sql"));

  console.log("\n=== findSuitableTrainers for AWS ===");
  console.log(findSuitableTrainers("skill_aws"));
}