const { resetDatabase } = require('./db');

console.log('🌱 Seeding database for CAPACITY CONNECT...');
resetDatabase()
  .then(() => {
    console.log('✅ Database successfully seeded with realistic users, skills, roles, courses, and enrollments!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  });
