# CAPACITY CONNECT — Database Schema & Data Dictionary

This document defines the core data models for the **CAPACITY CONNECT** Digital Capacity Building & Learning Management Portal.

---

## 1. User Model (`Users`)
Represents all system actors across the 3 user roles (Trainee, Trainer, Admin).

| Field | Type | Required | Description / Enum |
|---|---|---|---|
| `id` | String / ObjectId | Yes | Unique user identifier (e.g. `user-trainee-1`) |
| `name` | String | Yes | Full name of the user (e.g. `Aarav Sharma`) |
| `email` | String | Yes | Unique login email (e.g. `trainee@capacityconnect.gov.in`) |
| `password` | String | Yes | Hashed or demo password |
| `role` | String | Yes | Enum: `'trainee'` \| `'trainer'` \| `'admin'` |
| `department` | String | No | Government department / ministry (e.g. `Rural Development`) |
| `designation` | String | No | Current job title (e.g. `Assistant Section Officer`) |
| `targetRole` | String | No | Target career competency role (e.g. `E-Governance Program Officer`) |
| `currentSkills` | Array<String> | Yes | List of verified skills the user currently possesses |
| `createdAt` | DateTime | Auto | ISO timestamp |

---

## 2. Course Model (`Courses`)
Courses created by trainers or curriculum administrators for upskilling.

| Field | Type | Required | Description / Enum |
|---|---|---|---|
| `id` | String / ObjectId | Yes | Unique course identifier (e.g. `course-101`) |
| `title` | String | Yes | Course title |
| `description` | String | Yes | Overview and learning outcomes |
| `category` | String | Yes | Category (e.g. `Cloud & Infrastructure`, `Data Analytics`, `E-Governance`) |
| `instructorId` | String / ObjectId | Yes | Reference to `Users.id` (Trainer) |
| `instructorName` | String | No | Display name of the instructor |
| `duration` | String | No | Estimated duration (e.g. `3.5 Hours`) |
| `level` | String | No | Enum: `'Beginner'` \| `'Intermediate'` \| `'Advanced'` |
| `skillsTaught` | Array<String> | Yes | Specific skills acquired upon completion |
| `modules` | Array<Object> | No | Syllabus breakdown `[{ id, title, duration }]` |
| `enrolledCount` | Number | Auto | Total enrolled trainees counter |

---

## 3. Enrollment Model (`Enrollments`)
Tracks a trainee's registration and learning journey in a specific course.

| Field | Type | Required | Description / Enum |
|---|---|---|---|
| `id` | String / ObjectId | Yes | Unique enrollment identifier (e.g. `enroll-1`) |
| `userId` | String / ObjectId | Yes | Reference to `Users.id` (Trainee) |
| `courseId` | String / ObjectId | Yes | Reference to `Courses.id` |
| `progress` | Number | Yes | Completion percentage from `0` to `100` |
| `status` | String | Yes | Enum: `'enrolled'` \| `'in-progress'` \| `'completed'` |
| `enrolledAt` | DateTime | Auto | ISO registration timestamp |
| `completedAt` | DateTime | Nullable | ISO completion timestamp (when progress reaches 100) |

---

## 4. Skill Model (`Skills`)
Master taxonomy of competency skills maintained in the portal.

| Field | Type | Required | Description / Enum |
|---|---|---|---|
| `id` | String | Yes | Unique skill identifier (e.g. `skill-1`) |
| `name` | String | Yes | Standardized skill name (e.g. `Cloud Computing in Public Sector`) |
| `category` | String | Yes | Classification: `'Technical'`, `'Administrative'`, `'Compliance'`, `'Soft Skills'` |

---

## 5. Role Requirement Model (`RoleRequirements`)
Competency framework defining what skills are required for specific government job roles.

| Field | Type | Required | Description / Enum |
|---|---|---|---|
| `id` | String | Yes | Unique requirement profile ID (e.g. `req-1`) |
| `roleTitle` | String | Yes | Target role title (e.g. `E-Governance Program Officer`) |
| `department` | String | No | Associated department |
| `requiredSkills`| Array<String> | Yes | Array of skill names mandatory for this role |
| `description` | String | No | Context of the role |
