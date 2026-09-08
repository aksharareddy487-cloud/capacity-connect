# CAPACITY CONNECT — Backend API Documentation
**Problem Statement:** CAPACITY CONNECT – A Digital Capacity Building and Learning Management Portal  
**Backend Lead:** Varshitha  

---

## 🚀 Quick Start (Running the Server)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start the Server
- **Development mode (Auto-restart on edits):**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm start
  ```
- **Reset / Re-seed Database:**
  ```bash
  npm run seed
  ```

The server runs on **`http://localhost:5000`**.  
Health Check: **`http://localhost:5000/api/health`**

---

## 🔑 Demo Login Accounts (Pre-Seeded)

| Role | Email | Password | Details |
|---|---|---|---|
| **Admin** | `admin@capacityconnect.gov.in` | `admin123` | Dr. Ramesh Varma (DARPG) |
| **Trainer** | `trainer@capacityconnect.gov.in` | `trainer123` | Prof. Sunita Deshmukh (NISG) |
| **Trainee 1** | `trainee@capacityconnect.gov.in` | `trainee123` | Aarav Sharma (Rural Dev) |
| **Trainee 2** | `ananya@capacityconnect.gov.in` | `trainee123` | Ananya Patel (Health & Family Welfare) |

---

## 📡 API Endpoints Reference

### 1. Authentication (`/api/auth`)
- `POST /api/auth/signup` — Register new user
  ```json
  {
    "name": "Kavita Verma",
    "email": "kavita@capacityconnect.gov.in",
    "password": "password123",
    "role": "trainee",
    "department": "Urban Development",
    "targetRole": "E-Governance Program Officer",
    "currentSkills": ["Basic Computer Operations"]
  }
  ```
- `POST /api/auth/login` — Sign in and get JWT token
  ```json
  {
    "email": "trainee@capacityconnect.gov.in",
    "password": "trainee123"
  }
  ```
  **Response:**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "user": { "id": "user-trainee-1", "name": "Aarav Sharma", "role": "trainee", ... }
  }
  ```
- `GET /api/auth/me` — Get current logged-in profile (Requires header: `Authorization: Bearer <token>`)

---

### 2. Courses (`/api/courses`)
- `GET /api/courses` — List all courses (supports `?category=...&search=...&skill=...&level=...`)
- `GET /api/courses/:id` — Get single course details
- `POST /api/courses` — Create new course (For Sreeja / Trainers)
  ```json
  {
    "title": "Digital Land Records Management",
    "description": "Modernizing cadastre and land registration records.",
    "category": "E-Governance",
    "duration": "3 Hours",
    "level": "Beginner",
    "skillsTaught": ["Digital Tools & Workflow Automation"]
  }
  ```
- `PUT /api/courses/:id` — Update course details
- `DELETE /api/courses/:id` — Delete a course
- `GET /api/courses/:id/trainees` — List enrolled trainees for a course (For Sreeja's Trainer view)

---

### 3. Enrollments & Progress (`/api/enroll`, `/api/progress`)
- `POST /api/enroll` — Enroll in a course (For Akshara's Trainee enroll button)
  ```json
  {
    "userId": "user-trainee-1",
    "courseId": "course-101"
  }
  ```
- `GET /api/enrollments/user/:userId` — List enrolled courses for a trainee
- `GET /api/progress/:userId` — Get user progress overview (% completed, count of enrolled/completed courses)
- `PUT /api/progress/:enrollmentId` — Update progress (e.g. `{ "progress": 75 }`)

---

### 4. Competency Gap & Recommendation Engine (`/api/competency-gaps`)
*(Laxmi Prasanna's logic + Varshitha's API)*
- `GET /api/competency-gaps/:userId` — Analyzes trainee's current skills vs target role requirements, calculates gap, and maps missing skills to recommended courses.
  **Sample Response:**
  ```json
  {
    "success": true,
    "data": {
      "userId": "user-trainee-1",
      "userName": "Aarav Sharma",
      "targetRole": "E-Governance Program Officer",
      "readinessScore": 25,
      "matchedSkills": ["Citizen Centric Service Delivery"],
      "missingSkills": [
        "Cloud Computing in Public Sector",
        "Digital Tools & Workflow Automation",
        "Cybersecurity & Data Privacy (DPDP Act)"
      ],
      "recommendations": [
        {
          "courseId": "course-101",
          "title": "Foundations of Cloud Infrastructure for Government Portals",
          "skillsAddressed": ["Cloud Computing in Public Sector", "Digital Tools & Workflow Automation"],
          "matchCount": 2
        }
      ]
    }
  }
  ```

---

### 5. Admin & Analytics (`/api/admin`)
*(For Yeshwith)*
- `GET /api/admin/users` — List all registered users with role and department
- `GET /api/admin/stats` — Summary metrics and ready-to-render chart data (courses by category, enrollment statuses)

---

## 🧪 Automated Testing
Run the complete automated test suite while the server is running:
```bash
node backend/test-api.js
```
Or import `thunder-collection.json` into Thunder Client in VS Code!
