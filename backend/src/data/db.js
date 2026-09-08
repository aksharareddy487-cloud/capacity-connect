const fs = require('fs');
const path = require('path');
const os = require('os');
const {
  initialUsers,
  initialSkills,
  initialRoleRequirements,
  initialCourses,
  initialEnrollments
} = require('./initialData');

const DB_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DB_DIR, 'database.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Helper to read DB
const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const defaultState = {
        users: initialUsers,
        skills: initialSkills,
        roleRequirements: initialRoleRequirements,
        courses: initialCourses,
        enrollments: initialEnrollments
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultState, null, 2), 'utf-8');
      return defaultState;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database file, fallback to in-memory:', error);
    return {
      users: [...initialUsers],
      skills: [...initialSkills],
      roleRequirements: [...initialRoleRequirements],
      courses: [...initialCourses],
      enrollments: [...initialEnrollments]
    };
  }
};

// Helper to write DB atomically (write temp file, then rename) to prevent JSON corruption
const writeDB = (data) => {
  try {
    const json = JSON.stringify(data, null, 2);
    const tmpFile = path.join(os.tmpdir(), `cc_db_${Date.now()}.json`);
    fs.writeFileSync(tmpFile, json, 'utf-8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (error) {
    console.error('Error writing to database file:', error);
  }
};

// Auto-initialize DB on module load
readDB();

// User Model Methods
const User = {
  find: async (filter = {}) => {
    const db = readDB();
    return db.users.filter((u) => {
      for (const key in filter) {
        if (u[key] !== filter[key]) return false;
      }
      return true;
    });
  },
  findById: async (id) => {
    const db = readDB();
    return db.users.find((u) => u.id === id) || null;
  },
  findOne: async (filter = {}) => {
    const db = readDB();
    return db.users.find((u) => {
      for (const key in filter) {
        if (u[key] !== filter[key]) return false;
      }
      return true;
    }) || null;
  },
  create: async (userData) => {
    const db = readDB();
    const newUser = {
      id: userData.id || `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || 'trainee',
      department: userData.department || 'General Administration',
      designation: userData.designation || 'Staff',
      targetRole: userData.targetRole || 'E-Governance Specialist',
      currentSkills: userData.currentSkills || [],
      createdAt: new Date().toISOString(),
      ...userData
    };
    db.users.push(newUser);
    writeDB(db);
    return newUser;
  },
  findByIdAndUpdate: async (id, updates) => {
    const db = readDB();
    const index = db.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...updates, updatedAt: new Date().toISOString() };
    writeDB(db);
    return db.users[index];
  }
};

// Course Model Methods
const Course = {
  find: async (filter = {}) => {
    const db = readDB();
    let results = db.courses;

    if (filter.category) {
      results = results.filter((c) => c.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.instructorId) {
      results = results.filter((c) => c.instructorId === filter.instructorId);
    }
    if (filter.level) {
      results = results.filter((c) => c.level.toLowerCase() === filter.level.toLowerCase());
    }
    if (filter.skill) {
      results = results.filter((c) =>
        c.skillsTaught && c.skillsTaught.some((s) => s.toLowerCase().includes(filter.skill.toLowerCase()))
      );
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      results = results.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    }
    return results;
  },
  findById: async (id) => {
    const db = readDB();
    return db.courses.find((c) => c.id === id) || null;
  },
  create: async (courseData) => {
    const db = readDB();
    const newCourse = {
      id: courseData.id || `course-${Date.now()}`,
      title: courseData.title,
      description: courseData.description,
      category: courseData.category || 'General',
      instructorId: courseData.instructorId || 'user-trainer-1',
      instructorName: courseData.instructorName || 'Lead Trainer',
      duration: courseData.duration || '3 Hours',
      level: courseData.level || 'Beginner',
      skillsTaught: courseData.skillsTaught || [],
      modules: courseData.modules || [
        { id: 'm-1', title: 'Course Introduction', duration: '30 mins' },
        { id: 'm-2', title: 'Core Concepts & Demonstration', duration: '60 mins' },
        { id: 'm-3', title: 'Practical Implementation & Case Studies', duration: '60 mins' }
      ],
      enrolledCount: 0,
      createdAt: new Date().toISOString(),
      ...courseData
    };
    db.courses.push(newCourse);
    writeDB(db);
    return newCourse;
  },
  findByIdAndUpdate: async (id, updates) => {
    const db = readDB();
    const index = db.courses.findIndex((c) => c.id === id);
    if (index === -1) return null;
    db.courses[index] = { ...db.courses[index], ...updates, updatedAt: new Date().toISOString() };
    writeDB(db);
    return db.courses[index];
  },
  findByIdAndDelete: async (id) => {
    const db = readDB();
    const index = db.courses.findIndex((c) => c.id === id);
    if (index === -1) return null;
    const deleted = db.courses.splice(index, 1)[0];
    writeDB(db);
    return deleted;
  }
};

// Enrollment Model Methods
const Enrollment = {
  find: async (filter = {}) => {
    const db = readDB();
    return db.enrollments.filter((e) => {
      for (const key in filter) {
        if (e[key] !== filter[key]) return false;
      }
      return true;
    });
  },
  findById: async (id) => {
    const db = readDB();
    return db.enrollments.find((e) => e.id === id) || null;
  },
  findOne: async (filter = {}) => {
    const db = readDB();
    return db.enrollments.find((e) => {
      for (const key in filter) {
        if (e[key] !== filter[key]) return false;
      }
      return true;
    }) || null;
  },
  create: async (data) => {
    const db = readDB();
    const newEnrollment = {
      id: data.id || `enroll-${Date.now()}`,
      userId: data.userId,
      courseId: data.courseId,
      progress: data.progress || 0,
      status: data.status || 'enrolled',
      enrolledAt: new Date().toISOString(),
      completedAt: null,
      ...data
    };
    db.enrollments.push(newEnrollment);

    // Increment course enrolledCount
    const courseIndex = db.courses.findIndex((c) => c.id === data.courseId);
    if (courseIndex !== -1) {
      db.courses[courseIndex].enrolledCount = (db.courses[courseIndex].enrolledCount || 0) + 1;
    }

    writeDB(db);
    return newEnrollment;
  },
  findByIdAndUpdate: async (id, updates) => {
    const db = readDB();
    const index = db.enrollments.findIndex((e) => e.id === id);
    if (index === -1) return null;
    db.enrollments[index] = { ...db.enrollments[index], ...updates };
    if (updates.progress === 100 && !db.enrollments[index].completedAt) {
      db.enrollments[index].status = 'completed';
      db.enrollments[index].completedAt = new Date().toISOString();
    }
    writeDB(db);
    return db.enrollments[index];
  }
};

// Skill Model Methods
const Skill = {
  find: async () => {
    const db = readDB();
    return db.skills;
  },
  create: async (data) => {
    const db = readDB();
    const newSkill = {
      id: data.id || `skill-${Date.now()}`,
      name: data.name,
      category: data.category || 'General',
      ...data
    };
    db.skills.push(newSkill);
    writeDB(db);
    return newSkill;
  }
};

// RoleRequirement Model Methods
const RoleRequirement = {
  find: async (filter = {}) => {
    const db = readDB();
    return db.roleRequirements.filter((r) => {
      for (const key in filter) {
        if (r[key] !== filter[key]) return false;
      }
      return true;
    });
  },
  findOne: async (filter = {}) => {
    const db = readDB();
    return db.roleRequirements.find((r) => {
      for (const key in filter) {
        if (r[key] !== filter[key]) return false;
      }
      return true;
    }) || null;
  }
};

// Reset database helper
const resetDatabase = async () => {
  const defaultState = {
    users: initialUsers,
    skills: initialSkills,
    roleRequirements: initialRoleRequirements,
    courses: initialCourses,
    enrollments: initialEnrollments
  };
  writeDB(defaultState);
  return defaultState;
};

module.exports = {
  User,
  Course,
  Enrollment,
  Skill,
  RoleRequirement,
  resetDatabase,
  readDB
};
