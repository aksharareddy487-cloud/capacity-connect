import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Search, Filter, Clock } from 'lucide-react';

const COLORS = [
  'var(--accent-blue)', 'var(--accent-violet)', 'var(--accent-emerald)',
  'var(--accent-rose)', 'var(--accent-amber)', 'var(--accent-cyan)'
];

export default function TraineeCourses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!user?.id) return;

    // Fetch REAL enrollment data for this logged-in user from the database
    fetch(`/api/enrollments/user/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data
            .filter(enr => enr.course) // only include enrollments with valid course data
            .map((enr, idx) => ({
              id: enr.courseId,
              enrollmentId: enr.id,
              title: enr.course.title,
              category: enr.course.category || 'General',
              instructorName: enr.course.instructorName || 'Prof. Sunita Deshmukh',
              duration: enr.course.duration || '3 Hours',
              modules: enr.course.modules ? enr.course.modules.length : 3,
              level: enr.course.level || 'Beginner',
              progress: enr.progress ?? 0,
              status: enr.status || 'enrolled',
              enrolledAt: enr.enrolledAt,
              color: COLORS[idx % COLORS.length],
            }));
          setCourses(mapped);
        } else {
          // No enrollments found for this user
          setCourses([]);
        }
      })
      .catch(err => {
        console.error('Failed to fetch enrollments:', err);
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  const filtered = courses.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Completed' && c.progress === 100) ||
      (filter === 'In Progress' && c.progress > 0 && c.progress < 100) ||
      (filter === 'Not Started' && c.progress === 0);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fade-in" style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
            My Courses &amp; <span className="gradient-text">Learning Library</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Showing your enrolled courses with live progress from the database.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Enrolled: <strong style={{ color: 'var(--text-primary)' }}>{courses.length}</strong>
          </div>
          <div className="glass" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Completed: <strong style={{ color: 'var(--accent-emerald)' }}>{courses.filter(c => c.progress === 100).length}</strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass" style={{ padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', flex: '1 1 300px' }}>
          <Search size={16} color="var(--text-secondary)" />
          <input
            placeholder="Search your enrolled courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '13px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Filter size={15} color="var(--text-secondary)" />
          {['All', 'In Progress', 'Completed', 'Not Started'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: filter === f ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))' : 'rgba(255,255,255,0.05)',
                color: filter === f ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
          <BookOpen size={40} style={{ marginBottom: '12px', opacity: 0.4 }} />
          <p>Loading your enrolled courses from database...</p>
        </div>
      )}

      {/* No enrollments state */}
      {!loading && courses.length === 0 && (
        <div className="glass" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <BookOpen size={48} style={{ marginBottom: '16px', opacity: 0.3, display: 'block', margin: '0 auto 16px' }} />
          <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>No Enrolled Courses</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            You are not currently enrolled in any courses. Contact your trainer or admin to get enrolled.
          </p>
        </div>
      )}

      {/* No filter results */}
      {!loading && courses.length > 0 && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
          No courses match your current filter or search.
        </div>
      )}

      {/* Course Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map(c => (
          <div key={c.id} className="glass" style={{ padding: '22px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${c.color}` }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: c.color, background: `${c.color}15`, padding: '3px 10px', borderRadius: '12px' }}>
                  {c.category}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Level: {c.level}</span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.4 }}>{c.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Instructor: {c.instructorName}</p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {c.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={14} /> {c.modules} Modules</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
