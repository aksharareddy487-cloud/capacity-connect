// courseMapping.js
// Maps skill gaps -> recommended courses.

const COURSES = [
  { courseId: "c1", title: "SQL for Beginners", teachesSkillId: "skill_sql" },
  { courseId: "c2", title: "Practical Data Analysis", teachesSkillId: "skill_data_analysis" },
  { courseId: "c3", title: "Python Fundamentals", teachesSkillId: "skill_python" },
  { courseId: "c4", title: "Data Visualization with Charts", teachesSkillId: "skill_data_viz" },
  { courseId: "c5", title: "Cloud Computing Basics", teachesSkillId: "skill_cloud_basics" },
  { courseId: "c6", title: "AWS Essentials", teachesSkillId: "skill_aws" },
  { courseId: "c7", title: "Modern JavaScript", teachesSkillId: "skill_js" },
  { courseId: "c8", title: "React from Scratch", teachesSkillId: "skill_react" },
  { courseId: "c9", title: "Effective Communication", teachesSkillId: "skill_communication" },
];

function getCoursesForSkill(skillId, courseList = COURSES) {
  return courseList.filter((c) => c.teachesSkillId === skillId);
}

function getCoursesForGaps(gaps, courseList = COURSES) {
  return gaps.map((gap) => ({
    gap,
    recommendedCourses: getCoursesForSkill(gap.skillId, courseList),
  }));
}

module.exports = {
  COURSES,
  getCoursesForSkill,
  getCoursesForGaps,
};

// ---- Quick manual test (run: node competency/courseMapping.js) ----
if (require.main === module) {
  const { calculateGap } = require("./gapLogic.js");

  const fakeTrainee = {
    skills: [{ skillId: "skill_sql", level: 2 }],
  };

  const gaps = calculateGap(fakeTrainee.skills, "role_data_analyst");
  console.log("Gaps with course recommendations:", JSON.stringify(getCoursesForGaps(gaps), null, 2));
}
