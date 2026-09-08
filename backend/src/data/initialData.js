const bcrypt = require('bcryptjs');

// Hash helper for passwords (salt = 10)
const defaultHash = bcrypt.hashSync('password123', 10);
const adminHash = bcrypt.hashSync('admin123', 10);
const trainerHash = bcrypt.hashSync('trainer123', 10);
const traineeHash = bcrypt.hashSync('trainee123', 10);

const initialUsers = [
  {
    id: 'user-admin-1',
    name: 'Dr. Ramesh Varma',
    email: 'admin@capacityconnect.gov.in',
    password: adminHash,
    role: 'admin',
    department: 'Department of Administrative Reforms (DARPG)',
    designation: 'Chief Capacity Building Officer',
    targetRole: 'Digital Governance Director',
    currentSkills: ['Policy Formulation', 'Public Administration', 'Leadership', 'Data Governance'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-trainer-1',
    name: 'Prof. Sunita Deshmukh',
    email: 'trainer@capacityconnect.gov.in',
    password: trainerHash,
    role: 'trainer',
    department: 'National Institute of Smart Governance (NISG)',
    designation: 'Senior E-Governance Lead Trainer',
    targetRole: 'Master Trainer',
    currentSkills: ['Cloud Infrastructure', 'E-Governance Architecture', 'Public Procurement', 'Instructional Design'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-trainee-1',
    name: 'Aarav Sharma',
    email: 'trainee@capacityconnect.gov.in',
    password: traineeHash,
    role: 'trainee',
    department: 'Rural Development & Panchayati Raj',
    designation: 'Field Operations Assistant',
    targetRole: 'E-Governance Program Officer',
    currentSkills: ['Basic Computer Operations', 'Field Reporting', 'Citizen Grievance Handling'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'user-trainee-2',
    name: 'Ananya Patel',
    email: 'ananya@capacityconnect.gov.in',
    password: traineeHash,
    role: 'trainee',
    department: 'Health & Family Welfare',
    designation: 'Data Entry & Records Assistant',
    targetRole: 'Public Health Data Analyst',
    currentSkills: ['Data Entry', 'Basic Excel', 'Healthcare Records'],
    createdAt: new Date().toISOString()
  }
];

const initialSkills = [
  { id: 'skill-1', name: 'Cloud Computing in Public Sector', category: 'Technical' },
  { id: 'skill-2', name: 'Data Analysis & Decision Making', category: 'Technical' },
  { id: 'skill-3', name: 'Citizen Centric Service Delivery', category: 'Administrative' },
  { id: 'skill-4', name: 'Cybersecurity & Data Privacy (DPDP Act)', category: 'Compliance' },
  { id: 'skill-5', name: 'Digital Tools & Workflow Automation', category: 'Technical' },
  { id: 'skill-6', name: 'Public Financial Management & GeM', category: 'Administrative' },
  { id: 'skill-7', name: 'Effective Public Communication & RTI', category: 'Soft Skills' }
];

const initialRoleRequirements = [
  {
    id: 'req-1',
    roleTitle: 'E-Governance Program Officer',
    department: 'Cross-Departmental',
    requiredSkills: [
      'Cloud Computing in Public Sector',
      'Digital Tools & Workflow Automation',
      'Citizen Centric Service Delivery',
      'Cybersecurity & Data Privacy (DPDP Act)'
    ],
    description: 'Responsible for leading digital service transformation, automated departmental workflows, and ensuring citizen data security.'
  },
  {
    id: 'req-2',
    roleTitle: 'Public Health Data Analyst',
    department: 'Health & Family Welfare',
    requiredSkills: [
      'Data Analysis & Decision Making',
      'Digital Tools & Workflow Automation',
      'Cybersecurity & Data Privacy (DPDP Act)'
    ],
    description: 'Analyzes demographic health records, epidemic trends, and dashboard insights while maintaining strict compliance with health data privacy.'
  },
  {
    id: 'req-3',
    roleTitle: 'Field Operations Coordinator',
    department: 'Rural Development',
    requiredSkills: [
      'Citizen Centric Service Delivery',
      'Public Financial Management & GeM',
      'Effective Public Communication & RTI'
    ],
    description: 'Coordinates village-level project implementation, field monitoring, and transparent citizen grievance resolution.'
  }
];

const initialCourses = [
  {
    id: 'course-101',
    title: 'Foundations of Cloud Infrastructure for Government Portals',
    description: 'Master GovCloud architecture, scalability, uptime management, and secure hosting for citizen-facing digital public services.',
    category: 'Cloud & Infrastructure',
    instructorId: 'user-trainer-1',
    instructorName: 'Prof. Sunita Deshmukh',
    duration: '3.5 Hours',
    level: 'Intermediate',
    skillsTaught: ['Cloud Computing in Public Sector', 'Digital Tools & Workflow Automation'],
    modules: [
      { id: 'm-1', title: 'Introduction to GovCloud & NIC Hosting', duration: '45 mins' },
      { id: 'm-2', title: 'Managing High-Volume Citizen Traffic', duration: '60 mins' },
      { id: 'm-3', title: 'Backup, Failover & Disaster Recovery', duration: '45 mins' }
    ],
    enrolledCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'course-102',
    title: 'Data-Driven Governance: Analytics for Public Policy',
    description: 'Transform raw public sector data into actionable executive insights, interactive dashboards, and evidence-based policy plans.',
    category: 'Data Analytics',
    instructorId: 'user-trainer-1',
    instructorName: 'Prof. Sunita Deshmukh',
    duration: '5.0 Hours',
    level: 'Intermediate',
    skillsTaught: ['Data Analysis & Decision Making'],
    modules: [
      { id: 'm-1', title: 'KPI Formulations in Public Welfare', duration: '60 mins' },
      { id: 'm-2', title: 'Data Cleaning & Verification Techniques', duration: '90 mins' },
      { id: 'm-3', title: 'Building Real-Time District Dashboards', duration: '90 mins' }
    ],
    enrolledCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'course-103',
    title: 'Citizen-Centric E-Service Delivery & Grievance Redressal',
    description: 'Best practices for delivering seamless public services, reducing citizen turnaround time, and resolving CPGRAMS grievances effectively.',
    category: 'E-Governance',
    instructorId: 'user-trainer-1',
    instructorName: 'Prof. Sunita Deshmukh',
    duration: '2.5 Hours',
    level: 'Beginner',
    skillsTaught: ['Citizen Centric Service Delivery', 'Effective Public Communication & RTI'],
    modules: [
      { id: 'm-1', title: 'Service Level Agreements (SLAs) in Public Delivery', duration: '40 mins' },
      { id: 'm-2', title: 'CPGRAMS Workflow & Escalation Protocols', duration: '50 mins' },
      { id: 'm-3', title: 'Empathetic Citizen Communication', duration: '40 mins' }
    ],
    enrolledCount: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'course-104',
    title: 'Cybersecurity Essentials & DPDP Compliance in Government',
    description: 'Comprehensive overview of citizen data privacy regulations (Digital Personal Data Protection Act), threat mitigation, and CERT-In protocols.',
    category: 'Cybersecurity & Compliance',
    instructorId: 'user-trainer-1',
    instructorName: 'Prof. Sunita Deshmukh',
    duration: '4.0 Hours',
    level: 'Advanced',
    skillsTaught: ['Cybersecurity & Data Privacy (DPDP Act)'],
    modules: [
      { id: 'm-1', title: 'DPDP Act 2023 Principles for Public Servants', duration: '60 mins' },
      { id: 'm-2', title: 'Preventing Phishing, Ransomware & Social Engineering', duration: '60 mins' },
      { id: 'm-3', title: 'Incident Response & Reporting to CERT-In', duration: '60 mins' }
    ],
    enrolledCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'course-105',
    title: 'Public Procurement via Government e-Marketplace (GeM)',
    description: 'Step-by-step masterclass on navigating the GeM portal, direct procurement, competitive bidding, reverse auctions, and GFR rules.',
    category: 'Public Administration',
    instructorId: 'user-trainer-1',
    instructorName: 'Prof. Sunita Deshmukh',
    duration: '3.0 Hours',
    level: 'Beginner',
    skillsTaught: ['Public Financial Management & GeM'],
    modules: [
      { id: 'm-1', title: 'Overview of General Financial Rules (GFR)', duration: '45 mins' },
      { id: 'm-2', title: 'Executing Orders & Bids on GeM', duration: '65 mins' },
      { id: 'm-3', title: 'Invoice Verification & Payment Timelines', duration: '45 mins' }
    ],
    enrolledCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'course-106',
    title: 'Office Automation & Collaborative Digital Workflows',
    description: 'Master e-Office filing, digital annotations, collaborative document reviews, spreadsheet automation, and digital signature certificates (DSC).',
    category: 'Digital Productivity',
    instructorId: 'user-trainer-1',
    instructorName: 'Prof. Sunita Deshmukh',
    duration: '2.5 Hours',
    level: 'Beginner',
    skillsTaught: ['Digital Tools & Workflow Automation'],
    modules: [
      { id: 'm-1', title: 'Transitioning from Physical to e-Files', duration: '40 mins' },
      { id: 'm-2', title: 'Digital Signatures (DSC) & Secure Approvals', duration: '45 mins' },
      { id: 'm-3', title: 'Automation Hacks for Daily Administrative Work', duration: '40 mins' }
    ],
    enrolledCount: 1,
    createdAt: new Date().toISOString()
  }
];

const initialEnrollments = [
  {
    id: 'enroll-1',
    userId: 'user-trainee-1',
    courseId: 'course-103',
    progress: 100,
    status: 'completed',
    enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'enroll-2',
    userId: 'user-trainee-1',
    courseId: 'course-106',
    progress: 40,
    status: 'in-progress',
    enrolledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null
  },
  {
    id: 'enroll-3',
    userId: 'user-trainee-2',
    courseId: 'course-102',
    progress: 60,
    status: 'in-progress',
    enrolledAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    completedAt: null
  }
];

module.exports = {
  initialUsers,
  initialSkills,
  initialRoleRequirements,
  initialCourses,
  initialEnrollments
};
