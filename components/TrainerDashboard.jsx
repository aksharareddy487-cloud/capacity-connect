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
  // Temporary trainee data
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

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* MY COURSES */}
      <h2>My Courses</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {mockCourses.map((course) => (
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

            <small>
              Tags: {course.tags.join(", ")}
            </small>
          </div>
        ))}
      </div>

      {/* ENROLLED TRAINEES */}
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

// Table styles
const tableHeaderStyle = {
  padding: "12px",
  borderBottom: "1px solid #ccc",
  textAlign: "left",
};

const tableCellStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};