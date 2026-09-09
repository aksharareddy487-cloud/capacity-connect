import { useState } from "react";

const initialCourses = [
  {
    id: 1,
    title: "Cloud Basics",
    description: "Intro to cloud computing",
    tags: ["Cloud"],
  },
  {
    id: 2,
    title: "Data Analysis 101",
    description: "Fundamentals of data analysis",
    tags: ["Data Analysis"],
  },
  {
    id: 3,
    title: "Communication Skills",
    description: "Effective workplace communication",
    tags: ["Communication"],
  },
];

const trainees = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    course: "Cloud Basics",
    progress: 80,
  },
  {
    id: 2,
    name: "Priya",
    email: "priya@gmail.com",
    course: "Cloud Basics",
    progress: 65,
  },
  {
    id: 3,
    name: "Arjun",
    email: "arjun@gmail.com",
    course: "Data Analysis 101",
    progress: 90,
  },
  {
    id: 4,
    name: "Sneha",
    email: "sneha@gmail.com",
    course: "Communication Skills",
    progress: 70,
  },
];

export default function TrainerDashboard() {
  // Load saved courses from localStorage.
  // If there are no saved courses, use the initial courses.
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("trainerCourses");

    return savedCourses
      ? JSON.parse(savedCourses)
      : initialCourses;
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleCreateCourse = (e) => {
    e.preventDefault();

    // Check that all fields are filled
    if (!title.trim() || !description.trim() || !tags.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Create the new course
    const newCourse = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    // Add the new course to the existing courses
    const updatedCourses = [...courses, newCourse];

    // Update React state
    setCourses(updatedCourses);

    // Save courses in browser storage
    localStorage.setItem(
      "trainerCourses",
      JSON.stringify(updatedCourses)
    );

    // Clear the form
    setTitle("");
    setDescription("");
    setTags("");

    alert("Course created successfully!");
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1000px",
        margin: "auto",
      }}
    >
      {/* PAGE TITLE */}
      <h1>Trainer Dashboard</h1>

      {/* ================= CREATE COURSE ================= */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "40px",
        }}
      >
        <h2>Create Course</h2>

        <form onSubmit={handleCreateCourse}>
          {/* COURSE TITLE */}
          <div style={{ marginBottom: "15px" }}>
            <label>Course Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              style={inputStyle}
            />
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: "15px" }}>
            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              rows="4"
              style={inputStyle}
            />
          </div>

          {/* SKILL TAGS */}
          <div style={{ marginBottom: "15px" }}>
            <label>Skill Tags</label>

            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Example: Cloud, AWS, DevOps"
              style={inputStyle}
            />
          </div>

          {/* CREATE BUTTON */}
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Create Course
          </button>
        </form>
      </div>

      {/* ================= MY COURSES ================= */}
      <h2>My Courses</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
            }}
          >
            <h3>{course.title}</h3>

            <p>{course.description}</p>

            <small>
              Tags: {course.tags.join(", ")}
            </small>
          </div>
        ))}
      </div>

      {/* ================= ENROLLED TRAINEES ================= */}
      <div style={{ marginTop: "40px" }}>
        <h2>Enrolled Trainees</h2>

        <div
          style={{
            overflowX: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Course</th>
                <th style={tableHeaderStyle}>Progress</th>
              </tr>
            </thead>

            <tbody>
              {trainees.map((trainee) => (
                <tr key={trainee.id}>
                  <td style={tableCellStyle}>
                    {trainee.name}
                  </td>

                  <td style={tableCellStyle}>
                    {trainee.email}
                  </td>

                  <td style={tableCellStyle}>
                    {trainee.course}
                  </td>

                  <td style={tableCellStyle}>
                    {trainee.progress}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ================= INPUT STYLE ================= */

const inputStyle = {
  display: "block",
  width: "100%",
  boxSizing: "border-box",
  padding: "10px",
  marginTop: "6px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "15px",
};

/* ================= TABLE STYLES ================= */

const tableHeaderStyle = {
  padding: "12px",
  borderBottom: "1px solid #ccc",
  textAlign: "left",
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};
