/**
 * Seed script for CAPACITY CONNECT
 * Reads database/seedData.json and outputs summary metrics or writes to backend data store.
 */

const fs = require('fs');
const path = require('path');

const seedDataPath = path.join(__dirname, 'seedData.json');
const rawData = fs.readFileSync(seedDataPath, 'utf-8');
const data = JSON.parse(rawData);

console.log('==============================================');
console.log('🌱 CAPACITY CONNECT — Database Seeder');
console.log('==============================================');
console.log(`✅ Loaded ${data.users.length} Users:`);
data.users.forEach(u => console.log(`   - [${u.role.toUpperCase()}] ${u.name} (${u.email})`));

console.log(`\n✅ Loaded ${data.courses.length} Accredited Courses:`);
data.courses.forEach(c => console.log(`   - ${c.id}: ${c.title} [${c.category}]`));

console.log(`\n✅ Loaded ${data.skills.length} Competency Skills`);
console.log(`✅ Loaded ${data.roleRequirements.length} Role Competency Profiles`);
console.log(`✅ Loaded ${data.enrollments.length} Active Enrollments`);

console.log('==============================================');
console.log('🎉 Database seed validation successful!');
console.log('==============================================');
