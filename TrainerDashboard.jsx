import React from "react";

const mockCourses = [
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

export default function TrainerDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>My Courses</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <small>Tags: {course.tags.join(", ")}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from "react";

const initialCourses = [
  { id: 1, title: "Cloud Basics", description: "Intro to cloud computing", tags: ["Cloud"] },
  { id: 2, title: "Data Analysis 101", description: "Fundamentals of data analysis", tags: ["Data Analysis"] },
  { id: 3, title: "Communication Skills", description: "Effective workplace communication", tags: ["Communication"] },
];

export default function TrainerDashboard() {
  const [courses, setCourses] = useState(initialCourses);
  // ...rest goes here
}
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [tags, setTags] = useState("");
function handleCreateCourse(e) {
  e.preventDefault(); // stops the page from refreshing on submit

  const newCourse = {
    id: courses.length + 1, // simple fake id for now
    title,
    description,
    tags: tags.split(",").map((t) => t.trim()), // "Cloud, AWS" -> ["Cloud", "AWS"]
  };

  setCourses([...courses, newCourse]); // add the new course to the list

  // clear the form
  setTitle("");
  setDescription("");
  setTags("");
}
<form onSubmit={handleCreateCourse} style={{ marginBottom: "24px" }}>
  <h2>Create Course</h2>
  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{ display: "block", marginBottom: "8px", width: "300px" }}
    required
  />
  <input
    type="text"
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    style={{ display: "block", marginBottom: "8px", width: "300px" }}
    required
  />
  <input
    type="text"
    placeholder="Tags (comma separated)"
    value={tags}
    onChange={(e) => setTags(e.target.value)}
    style={{ display: "block", marginBottom: "8px", width: "300px" }}
  />
  <button type="submit">Create Course</button>
</form>