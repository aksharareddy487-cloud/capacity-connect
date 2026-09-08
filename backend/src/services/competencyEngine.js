/**
 * Competency Mapping & Gap Analysis Engine
 * Capacity Connect - SIH 2026
 * 
 * Logic Breakdown (Laxmi Prasanna & Varshitha):
 * 1. Takes user profile with current skills.
 * 2. Fetches target role competency benchmarks.
 * 3. Identifies missing competencies (skills gap).
 * 4. Generates prioritized course recommendations mapped directly to missing competencies.
 * 5. Provides a readiness score and progress metrics.
 */

/**
 * Calculates skill gaps and course recommendations for a user.
 * @param {Object} user - The user object (must include currentSkills, targetRole)
 * @param {Object} roleRequirement - The required skills definition for the target role
 * @param {Array} allCourses - Array of all available courses
 * @returns {Object} Gap analysis and course recommendations
 */
const calculateCompetencyGap = (user, roleRequirement, allCourses = []) => {
  const currentSkills = (user && user.currentSkills) || [];
  const targetRole = (user && user.targetRole) || (roleRequirement && roleRequirement.roleTitle) || 'General Trainee';
  const requiredSkills = (roleRequirement && roleRequirement.requiredSkills) || [];

  // Case-insensitive normalization helper
  const normalize = (str) => (str || '').trim().toLowerCase();

  const currentSkillsNormalized = currentSkills.map(normalize);

  // Find matched skills and missing skills
  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach((skill) => {
    if (currentSkillsNormalized.includes(normalize(skill))) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  // Calculate readiness percentage (0 to 100%)
  const totalRequired = requiredSkills.length;
  const readinessPercentage = totalRequired > 0 
    ? Math.round((matchedSkills.length / totalRequired) * 100) 
    : 100;

  // Map each missing skill to relevant courses
  const courseRecommendationsMap = {};

  missingSkills.forEach((missingSkill) => {
    const missingNorm = normalize(missingSkill);
    const matchingCourses = allCourses.filter((course) => {
      if (!course.skillsTaught || !Array.isArray(course.skillsTaught)) return false;
      return course.skillsTaught.some((s) => normalize(s) === missingNorm || normalize(s).includes(missingNorm) || missingNorm.includes(normalize(s)));
    });

    matchingCourses.forEach((course) => {
      if (!courseRecommendationsMap[course.id]) {
        courseRecommendationsMap[course.id] = {
          courseId: course.id,
          title: course.title,
          description: course.description,
          category: course.category,
          level: course.level,
          duration: course.duration,
          instructorName: course.instructorName,
          skillsAddressed: [missingSkill],
          matchCount: 1
        };
      } else {
        if (!courseRecommendationsMap[course.id].skillsAddressed.includes(missingSkill)) {
          courseRecommendationsMap[course.id].skillsAddressed.push(missingSkill);
          courseRecommendationsMap[course.id].matchCount += 1;
        }
      }
    });
  });

  // Convert recommendation map to array sorted by how many gaps the course solves
  const prioritizedRecommendations = Object.values(courseRecommendationsMap).sort(
    (a, b) => b.matchCount - a.matchCount
  );

  return {
    userId: user ? user.id : null,
    userName: user ? user.name : 'Unknown',
    targetRole,
    department: user ? user.department : 'General',
    readinessScore: readinessPercentage, // e.g. 25% or 75%
    totalRequiredSkills: totalRequired,
    matchedSkillsCount: matchedSkills.length,
    missingSkillsCount: missingSkills.length,
    matchedSkills,
    missingSkills,
    recommendations: prioritizedRecommendations,
    framing: {
      engineType: 'Rule-Based Competency & Recommendation Engine',
      scalability: 'Designed to scale to ML-based personalization and collaborative filtering'
    }
  };
};

module.exports = {
  calculateCompetencyGap
};
