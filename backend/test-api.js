/**
 * Automated API Test Suite for CAPACITY CONNECT Backend
 * Run with: node test-api.js (while server is running)
 */

const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('🧪 ====================================================');
  console.log('🧪 Starting API Verification for CAPACITY CONNECT');
  console.log('🧪 ====================================================\n');

  let passed = 0;
  let failed = 0;

  const testEndpoint = async (name, testFn) => {
    try {
      await testFn();
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ [FAIL] ${name}:`, err.message);
      failed++;
    }
  };

  // 1. Health Check
  await testEndpoint('GET /api/health (Server Online Check)', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    if (!res.ok || data.status !== 'online') throw new Error(`Health check failed: ${JSON.stringify(data)}`);
  });

  // 2. Auth - Login Default Trainee
  let authToken = '';
  let traineeId = '';
  await testEndpoint('POST /api/auth/login (Login Trainee Aarav)', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'trainee@capacityconnect.gov.in',
        password: 'trainee123'
      })
    });
    const data = await res.json();
    if (!res.ok || !data.token) throw new Error(data.message || 'Login failed');
    authToken = data.token;
    traineeId = data.user.id;
  });

  // 3. Auth - Get Me (Protected)
  await testEndpoint('GET /api/auth/me (Protected Route with JWT)', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok || !data.user) throw new Error('Failed to verify token');
  });

  // 4. Auth - Register New User
  const randomEmail = `test_${Date.now()}@capacityconnect.gov.in`;
  await testEndpoint('POST /api/auth/signup (Register New Trainee)', async () => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Kavita Verma',
        email: randomEmail,
        password: 'password123',
        role: 'trainee',
        department: 'Urban Development',
        targetRole: 'E-Governance Program Officer',
        currentSkills: ['Basic Computer Operations']
      })
    });
    const data = await res.json();
    if (!res.ok || !data.token) throw new Error(data.message || 'Signup failed');
  });

  // 5. Courses - List All
  let sampleCourseId = '';
  await testEndpoint('GET /api/courses (Fetch All Courses)', async () => {
    const res = await fetch(`${BASE_URL}/courses`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.data) || data.data.length === 0) throw new Error('No courses returned');
    sampleCourseId = data.data[0].id;
  });

  // 6. Courses - Filter by Category
  await testEndpoint('GET /api/courses?category=Data Analytics (Filter Courses)', async () => {
    const res = await fetch(`${BASE_URL}/courses?category=Data Analytics`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.data)) throw new Error('Filter query failed');
  });

  // 7. Courses - Get Single Course Details
  await testEndpoint('GET /api/courses/:id (Fetch Course by ID)', async () => {
    const res = await fetch(`${BASE_URL}/courses/${sampleCourseId}`);
    const data = await res.json();
    if (!res.ok || data.data.id !== sampleCourseId) throw new Error('Could not fetch course by id');
  });

  // 8. Courses - Create New Course (Sreeja's task)
  let createdCourseId = '';
  await testEndpoint('POST /api/courses (Create New Course by Trainer)', async () => {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Cyber Safety for Field Agents',
        description: 'Practical data security measures for village and block level surveys.',
        category: 'Cybersecurity & Compliance',
        duration: '2 Hours',
        level: 'Beginner',
        skillsTaught: ['Cybersecurity & Data Privacy (DPDP Act)'],
        instructorName: 'Prof. Sunita Deshmukh'
      })
    });
    const data = await res.json();
    if (!res.ok || !data.data.id) throw new Error('Course creation failed');
    createdCourseId = data.data.id;
  });

  // 9. Courses - Get Trainees Enrolled in Course (Sreeja's task)
  await testEndpoint('GET /api/courses/:id/trainees (View Enrolled Trainees)', async () => {
    const res = await fetch(`${BASE_URL}/courses/course-103/trainees`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.trainees)) throw new Error('Failed to get enrolled trainees');
  });

  // 10. Enrollments - Enroll User
  await testEndpoint('POST /api/enroll (Enroll Trainee in Course)', async () => {
    const res = await fetch(`${BASE_URL}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'user-trainee-2',
        courseId: 'course-101'
      })
    });
    const data = await res.json();
    // 201 or already enrolled 400 is fine
    if (!res.ok && !data.message.includes('already enrolled')) throw new Error(data.message);
  });

  // 11. Progress - Get User Progress (Akshara's trainee screen)
  await testEndpoint('GET /api/progress/:userId (Get Trainee Learning Progress)', async () => {
    const res = await fetch(`${BASE_URL}/progress/user-trainee-1`);
    const data = await res.json();
    if (!res.ok || data.userId !== 'user-trainee-1') throw new Error('Failed to get user progress');
  });

  // 12. Competency Gaps - Calculate Gaps & Course Recommendations (Laxmi Prasanna's engine)
  await testEndpoint('GET /api/competency-gaps/:userId (Laxmi Prasanna AI Engine)', async () => {
    const res = await fetch(`${BASE_URL}/competency-gaps/user-trainee-1`);
    const data = await res.json();
    if (!res.ok || !data.data || !data.data.recommendations) throw new Error('Failed to calculate competency gaps');
    if (!Array.isArray(data.data.missingSkills)) throw new Error('Missing skills array expected');
  });

  // 13. Admin - List All Users (Yeshwith's admin view)
  await testEndpoint('GET /api/admin/users (Admin User Table)', async () => {
    const res = await fetch(`${BASE_URL}/admin/users`);
    const data = await res.json();
    if (!res.ok || !Array.isArray(data.data)) throw new Error('Failed to retrieve user list');
  });

  // 14. Admin - Summary Stats & Chart Data (Yeshwith's cards & charts)
  await testEndpoint('GET /api/admin/stats (Admin Stats & Chart.js Metrics)', async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`);
    const data = await res.json();
    if (!res.ok || !data.stats || !data.chartData) throw new Error('Failed to retrieve admin stats & charts');
  });

  console.log('\n====================================================');
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  if (failed === 0) {
    console.log('🎉 ALL BACKEND ENDPOINTS ARE WORKING PERFECTLY!');
    console.log('Ready for VT, Akshara, Sreeja, Yeshwith & Laxmi Prasanna!');
  } else {
    console.log('⚠️ Some tests failed. Please review error messages above.');
  }
  console.log('====================================================\n');
};

runTests();
