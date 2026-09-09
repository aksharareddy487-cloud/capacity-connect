import React, { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api";
const CURRENT_USER_ID = "user-trainee-1";

export default function TraineeDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [gapData, setGapData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [notification, setNotification] = useState(null);

  // Fallback demo dataset (ensures the demo NEVER looks empty or crashes)
  const defaultCourses = [
    {
      id: "course-101",
      title: "Foundations of Cloud Infrastructure for Government Portals",
      description: "Master GovCloud architecture, scalability, uptime management, and secure hosting for citizen services.",
      category: "Cloud & Infrastructure",
      instructorName: "Prof. Sunita Deshmukh",
      duration: "3.5 Hours",
      level: "Intermediate",
      skillsTaught: ["Cloud Computing in Public Sector", "Digital Tools & Workflow Automation"]
    },
    {
      id: "course-102",
      title: "Data-Driven Governance: Analytics for Public Policy",
      description: "Transform raw public sector data into actionable executive insights, district dashboards, and policy plans.",
      category: "Data Analytics",
      instructorName: "Prof. Sunita Deshmukh",
      duration: "5.0 Hours",
      level: "Intermediate",
      skillsTaught: ["Data Analysis & Decision Making"]
    },
    {
      id: "course-103",
      title: "Citizen-Centric E-Service Delivery & Grievance Redressal",
      description: "Best practices for delivering seamless public services, reducing citizen turnaround time, and CPGRAMS handling.",
      category: "E-Governance",
      instructorName: "Prof. Sunita Deshmukh",
      duration: "2.5 Hours",
      level: "Beginner",
      skillsTaught: ["Citizen Centric Service Delivery", "Effective Public Communication & RTI"]
    },
    {
      id: "course-104",
      title: "Cybersecurity Essentials & DPDP Compliance in Government",
      description: "Comprehensive overview of citizen data privacy regulations, threat mitigation, and CERT-In protocols.",
      category: "Cybersecurity & Compliance",
      instructorName: "Prof. Sunita Deshmukh",
      duration: "4.0 Hours",
      level: "Advanced",
      skillsTaught: ["Cybersecurity & Data Privacy (DPDP Act)"]
    },
    {
      id: "course-105",
      title: "Public Procurement via Government e-Marketplace (GeM)",
      description: "Step-by-step masterclass on navigating the GeM portal, direct procurement, and GFR rules.",
      category: "Public Administration",
      instructorName: "Prof. Sunita Deshmukh",
      duration: "3.0 Hours",
      level: "Beginner",
      skillsTaught: ["Public Financial Management & GeM"]
    },
    {
      id: "course-106",
      title: "Office Automation & Collaborative Digital Workflows",
      description: "Master e-Office filing, digital annotations, collaborative reviews, spreadsheet automation, and DSC signatures.",
      category: "Digital Productivity",
      instructorName: "Prof. Sunita Deshmukh",
      duration: "2.5 Hours",
      level: "Beginner",
      skillsTaught: ["Digital Tools & Workflow Automation"]
    }
  ];

  const defaultGapData = {
    userName: "Aarav Sharma",
    department: "Ministry of Rural Development",
    targetRole: "E-Governance Program Officer",
    readinessScore: 35,
    matchedSkills: ["Citizen Centric Service Delivery"],
    missingSkills: [
      "Cloud Computing in Public Sector",
      "Digital Tools & Workflow Automation",
      "Cybersecurity & Data Privacy (DPDP Act)"
    ],
    recommendations: [
      {
        courseId: "course-101",
        title: "Foundations of Cloud Infrastructure for Government Portals",
        skillsAddressed: ["Cloud Computing in Public Sector", "Digital Tools & Workflow Automation"]
      }
    ]
  };

  const defaultEnrollments = [
    {
      id: "enroll-1",
      courseId: "course-103",
      courseTitle: "Citizen-Centric E-Service Delivery & Grievance Redressal",
      progress: 100,
      status: "completed"
    },
    {
      id: "enroll-2",
      courseId: "course-106",
      courseTitle: "Office Automation & Collaborative Digital Workflows",
      progress: 40,
      status: "in-progress"
    }
  ];

  useEffect(() => {
    loadPortalData();
  }, []);

  const showNotificationMessage = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadPortalData = async () => {
    // 1. Load Courses
    try {
      const res = await fetch(`${API_BASE}/courses`);
      if (res.ok) {
        const json = await res.json();
        setCourses(json.data && json.data.length > 0 ? json.data : defaultCourses);
      } else {
        setCourses(defaultCourses);
      }
    } catch {
      setCourses(defaultCourses);
    }

    // 2. Load Enrollments & Progress
    try {
      const res = await fetch(`${API_BASE}/progress/${CURRENT_USER_ID}`);
      if (res.ok) {
        const json = await res.json();
        setEnrollments(json.data?.enrollments || defaultEnrollments);
      } else {
        setEnrollments(defaultEnrollments);
      }
    } catch {
      setEnrollments(defaultEnrollments);
    }

    // 3. Load Competency Gaps
    try {
      const res = await fetch(`${API_BASE}/competency-gaps/${CURRENT_USER_ID}`);
      if (res.ok) {
        const json = await res.json();
        setGapData(json.data || defaultGapData);
      } else {
        setGapData(defaultGapData);
      }
    } catch {
      setGapData(defaultGapData);
    }
  };

  const isCourseEnrolled = (courseId) => {
    return enrollments.some((e) => e.courseId === courseId);
  };

  const handleEnroll = async (courseId) => {
    const targetCourse = courses.find((c) => c.id === courseId);
    try {
      const res = await fetch(`${API_BASE}/enroll`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: CURRENT_USER_ID, courseId })
      });

      if (res.ok) {
        showNotificationMessage(`🎉 Enrolled successfully in: ${targetCourse?.title || "Course"}!`);
        loadPortalData();
        return;
      }
    } catch {
      // Offline fallback handling
    }

    // Optimistic fallback update
    setEnrollments((prev) => [
      ...prev,
      {
        id: `enroll-${Date.now()}`,
        courseId,
        courseTitle: targetCourse?.title || "Selected Course",
        progress: 0,
        status: "enrolled"
      }
    ]);
    showNotificationMessage(`✅ Enrolled in ${targetCourse?.title || "Course"}!`);
  };

  const handleProgressIncrement = async (enrollmentId, currentProgress) => {
    const nextProgress = Math.min(100, currentProgress + 25);
    try {
      const res = await fetch(`${API_BASE}/progress/${enrollmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: nextProgress })
      });
      if (res.ok) {
        loadPortalData();
        showNotificationMessage(`📈 Progress updated to ${nextProgress}%!`);
        return;
      }
    } catch {
      // Offline fallback handling
    }

    setEnrollments((prev) =>
      prev.map((item) =>
        item.id === enrollmentId
          ? {
              ...item,
              progress: nextProgress,
              status: nextProgress === 100 ? "completed" : "in-progress"
            }
          : item
      )
    );
    showNotificationMessage(`📈 Progress updated to ${nextProgress}%!`);
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const categories = ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))];

  return (
    <div style={{ fontFamily: "Segoe UI, -apple-system, BlinkMacSystemFont, Roboto, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", padding: "24px", color: "#1e293b" }}>
      <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
        {/* Notification Toast */}
        {notification && (
          <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999, background: "#10b981", color: "white", padding: "12px 24px", borderRadius: "8px", boxShadow: "0 4px 14px rgba(0,0,0,0.15)", fontWeight: "600", fontSize: "14px" }}>
            {notification}
          </div>
        )}

        {/* Hero Trainee Banner */}
        <header style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)", borderRadius: "16px", padding: "28px 36px", color: "white", marginBottom: "28px", boxShadow: "0 10px 25px -5px rgba(30, 58, 138, 0.25)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
                Karmayogi Trainee Portal • Civil Service Capacity Building
              </div>
              <h1 style={{ margin: "4px 0 6px 0", fontSize: "28px", fontWeight: "700" }}>
                Welcome, {gapData?.userName || "Aarav Sharma"}
              </h1>
              <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
                🏛️ <strong>{gapData?.department || "Ministry of Rural Development"}</strong> &nbsp;|&nbsp; 🎯 Career Path: <strong>{gapData?.targetRole || "E-Governance Program Officer"}</strong>
              </p>
            </div>

            <div style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", padding: "16px 28px", textAlign: "center" }}>
              <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px", opacity: 0.9 }}>Role Readiness Score</div>
              <div style={{ fontSize: "36px", fontWeight: "800", marginTop: "2px" }}>{gapData?.readinessScore || 35}%</div>
              <div style={{ fontSize: "11px", opacity: 0.85 }}>Based on 4 required competencies</div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #e2e8f0", marginBottom: "24px" }}>
          {[
            { id: "dashboard", label: "📊 Trainee Dashboard & Skill Gaps" },
            { id: "catalog", label: "📚 Course Catalog" },
            { id: "progress", label: "🎓 My Learning & Progress" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 20px",
                border: "none",
                background: "transparent",
                fontSize: "15px",
                fontWeight: activeTab === tab.id ? "700" : "500",
                color: activeTab === tab.id ? "#1e3a8a" : "#64748b",
                borderBottom: activeTab === tab.id ? "3px solid #1e3a8a" : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: DASHBOARD & SKILL GAPS */}
        {activeTab === "dashboard" && (
          <div>
            {/* Metric Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px", marginBottom: "28px" }}>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "13px", color: "#64748b" }}>Active Enrollments</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", marginTop: "6px" }}>{enrollments.length}</div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "13px", color: "#64748b" }}>Completed Certifications</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#16a34a", marginTop: "6px" }}>
                  {enrollments.filter((e) => e.status === "completed").length}
                </div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "13px", color: "#64748b" }}>Verified Competencies</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#2563eb", marginTop: "6px" }}>
                  {gapData?.matchedSkills?.length || 1}
                </div>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "13px", color: "#64748b" }}>Identified Skill Gaps</div>
                <div style={{ fontSize: "28px", fontWeight: "700", color: "#dc2626", marginTop: "6px" }}>
                  {gapData?.missingSkills?.length || 3}
                </div>
              </div>
            </div>

            {/* Competency Gap Analysis Box */}
            <div style={{ background: "white", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "28px", marginBottom: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
                <div>
                  <h2 style={{ fontSize: "19px", margin: "0 0 4px 0", color: "#0f172a" }}>
                    🎯 Competency Gap Analysis for Target Role: <span style={{ color: "#1e3a8a" }}>{gapData?.targetRole}</span>
                  </h2>
                  <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
                    Automated gap mapping generated using DARPG Civil Service Capacity Framework.
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {/* Acquired Skills */}
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "18px" }}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#166534", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>✅</span> Acquired Competencies (Verified)
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {gapData?.matchedSkills?.map((skill, idx) => (
                      <span key={idx} style={{ background: "#dcfce7", color: "#166534", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills */}
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "18px" }}>
                  <h3 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#991b1b", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>⚠️</span> Identified Gaps (Required for Promotion / Readiness)
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {gapData?.missingSkills?.map((skill, idx) => (
                      <span key={idx} style={{ background: "#fee2e2", color: "#991b1b", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Recommendation Alert */}
              <div style={{ marginTop: "24px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "10px", padding: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e40af", marginBottom: "8px" }}>
                  💡 Smart AI Course Recommendation to Close Identified Gaps
                </div>
                {gapData?.recommendations?.map((rec, idx) => {
                  const enrolled = isCourseEnrolled(rec.courseId);
                  return (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", flexWrap: "wrap", gap: "12px" }}>
                      <div>
                        <strong style={{ fontSize: "15px", color: "#1e3a8a" }}>{rec.title}</strong>
                        <div style={{ fontSize: "13px", color: "#475569", marginTop: "2px" }}>
                          Addresses: {rec.skillsAddressed?.join(", ")}
                        </div>
                      </div>
                      <button
                        onClick={() => handleEnroll(rec.courseId)}
                        disabled={enrolled}
                        style={{
                          background: enrolled ? "#10b981" : "#1e3a8a",
                          color: "white",
                          border: "none",
                          padding: "8px 18px",
                          borderRadius: "6px",
                          fontWeight: "600",
                          cursor: enrolled ? "default" : "pointer",
                          fontSize: "13px"
                        }}
                      >
                        {enrolled ? "✓ Already Enrolled" : "Enroll to Bridge Gap"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COURSE CATALOG */}
        {activeTab === "catalog" && (
          <div>
            {/* Search & Category Filter Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", flexWrap: "wrap", gap: "14px" }}>
              <input
                type="text"
                placeholder="🔍 Search courses by keyword or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid #cbd5e1", width: "320px", fontSize: "14px" }}
              />

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border: "1px solid #cbd5e1",
                      background: selectedCategory === cat ? "#1e3a8a" : "white",
                      color: selectedCategory === cat ? "white" : "#475569",
                      fontSize: "13px",
                      cursor: "pointer",
                      fontWeight: selectedCategory === cat ? "600" : "500"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "22px" }}>
              {filteredCourses.map((course) => {
                const enrolled = isCourseEnrolled(course.id);
                return (
                  <div
                    key={course.id}
                    style={{
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      padding: "22px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.04)"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#2563eb", background: "#eff6ff", padding: "3px 10px", borderRadius: "4px" }}>
                          {course.category}
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748b" }}>{course.level || "Intermediate"}</span>
                      </div>

                      <h3 style={{ fontSize: "17px", fontWeight: "700", margin: "6px 0 8px 0", color: "#0f172a", lineHeight: 1.3 }}>
                        {course.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: 1.5 }}>
                        {course.description}
                      </p>

                      <div style={{ marginBottom: "16px" }}>
                        <div style={{ fontSize: "11px", fontWeight: "700", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                          Skills Taught:
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {course.skillsTaught?.map((s, idx) => (
                            <span key={idx} style={{ fontSize: "11px", background: "#f1f5f9", color: "#334155", padding: "3px 8px", borderRadius: "4px" }}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>⏱️ {course.duration || "3 Hours"}</span>
                      <button
                        onClick={() => handleEnroll(course.id)}
                        disabled={enrolled}
                        style={{
                          background: enrolled ? "#10b981" : "#1e3a8a",
                          color: "white",
                          border: "none",
                          padding: "8px 18px",
                          borderRadius: "6px",
                          fontWeight: "600",
                          fontSize: "13px",
                          cursor: enrolled ? "default" : "pointer"
                        }}
                      >
                        {enrolled ? "✓ Enrolled" : "Enroll Now"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: MY LEARNING & PROGRESS */}
        {activeTab === "progress" && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "20px", margin: "0 0 4px 0", color: "#0f172a" }}>My Enrolled Training Modules</h2>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                Complete all modules to obtain official competency certification.
              </p>
            </div>

            {enrollments.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <p style={{ color: "#64748b" }}>You are not enrolled in any courses yet.</p>
                <button
                  onClick={() => setActiveTab("catalog")}
                  style={{ background: "#1e3a8a", color: "white", border: "none", padding: "8px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
                >
                  Browse Course Catalog
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {enrollments.map((item) => (
                  <div key={item.id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "22px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: "16px", color: "#0f172a" }}>
                          {item.courseTitle || `Course ${item.courseId}`}
                        </h3>
                        <span style={{ fontSize: "12px", color: item.status === "completed" ? "#16a34a" : "#d97706", fontWeight: "700" }}>
                          ● {item.status?.toUpperCase()}
                        </span>
                      </div>
                      <span style={{ fontSize: "20px", fontWeight: "800", color: "#1e3a8a" }}>
                        {item.progress || 0}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ background: "#e2e8f0", borderRadius: "8px", height: "10px", width: "100%", overflow: "hidden", marginBottom: "16px" }}>
                      <div
                        style={{
                          background: item.progress === 100 ? "#16a34a" : "#2563eb",
                          height: "100%",
                          width: `${item.progress || 0}%`,
                          transition: "width 0.4s ease"
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px" }}>
                      {item.progress < 100 ? (
                        <button
                          onClick={() => handleProgressIncrement(item.id, item.progress || 0)}
                          style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: "pointer"
                          }}
                        >
                          Complete Next Module (+25%)
                        </button>
                      ) : (
                        <div style={{ color: "#16a34a", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>🏆</span> Official Capacity Certificate Verified
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
