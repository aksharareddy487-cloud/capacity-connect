import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, CheckCircle, ArrowRight, Sparkles, Layers } from 'lucide-react';

const COLORS = [
  'var(--accent-blue)', 'var(--accent-violet)', 'var(--accent-emerald)',
  'var(--accent-rose)', 'var(--accent-amber)', 'var(--accent-cyan)'
];

const SKILL_COLORS = [
  'var(--accent-blue)', 'var(--accent-violet)', 'var(--accent-cyan)',
  'var(--accent-emerald)', 'var(--accent-amber)', 'var(--accent-rose)'
];

export default function TraineeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/enrollments/user/${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const mapped = data.data
            .filter(enr => enr.course)
            .map((enr, idx) => ({
              id: enr.courseId,
              title: enr.course.title,
              category: enr.course.category || 'General',
              level: enr.course.level || 'Beginner',
              status: enr.status || 'enrolled',
              color: COLORS[idx % COLORS.length],
            }));
          setEnrolledCourses(mapped);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.id]);

  const completedCount = enrolledCourses.filter(c => c.status === 'completed').length;
  const inProgressCount = enrolledCourses.filter(c => c.status === 'in-progress').length;
  const currentSkills = user?.currentSkills || [];

  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>

      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          Welcome back, <span className="gradient-text">{user?.name || 'Trainee'} 👋</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          {user?.designation || 'Trainee'} &nbsp;•&nbsp;
          <strong style={{ color: 'var(--accent-cyan)' }}>{user?.department || '—'}</strong>
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
        <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Enrolled</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-blue)', lineHeight: 1 }}>
            {loading ? '—' : enrolledCourses.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Total courses</div>
        </div>
        <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Completed</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-emerald)', lineHeight: 1 }}>
            {loading ? '—' : completedCount}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Finished courses</div>
        </div>
        <div className="glass" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>In Progress</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--accent-amber)', lineHeight: 1 }}>
            {loading ? '—' : inProgressCount}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Active courses</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>

        {/* LEFT: Course Preview (max 3) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={18} color="var(--accent-blue)" /> My Enrolled Courses
            </h2>
            {enrolledCourses.length > 0 && (
              <button
                onClick={() => navigate('/trainee/courses')}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '13px', cursor: 'pointer', fontWeight: 600 }}
              >
                View All <ArrowRight size={14} />
              </button>
            )}
          </div>

          {loading && (
            <div className="glass" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
              Loading your courses...
            </div>
          )}

          {!loading && enrolledCourses.length === 0 && (
            <div className="glass" style={{ padding: '32px', textAlign: 'center' }}>
              <BookOpen size={36} style={{ opacity: 0.3, display: 'block', margin: '0 auto 10px' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Not enrolled in any courses yet.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {enrolledCourses.slice(0, 3).map(c => (
              <div key={c.id} className="glass" style={{ padding: '16px 20px', borderLeft: `4px solid ${c.color}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '5px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: c.color, background: `${c.color}15`, padding: '2px 8px', borderRadius: '10px' }}>
                      {c.category}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '10px' }}>
                      {c.level}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{c.title}</div>
                </div>
                {c.status === 'completed' && (
                  <CheckCircle size={20} color="var(--accent-emerald)" style={{ flexShrink: 0, marginLeft: '12px' }} />
                )}
              </div>
            ))}
          </div>

          {enrolledCourses.length > 3 && (
            <button
              onClick={() => navigate('/trainee/courses')}
              style={{
                marginTop: '12px', width: '100%', padding: '10px', borderRadius: '10px',
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                color: 'var(--accent-blue)', fontSize: '13px', cursor: 'pointer', fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              +{enrolledCourses.length - 3} more courses <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* RIGHT: Current Skills */}
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-amber)" /> Current Skills
          </h2>
          <div className="glass" style={{ padding: '20px' }}>
            {currentSkills.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', textAlign: 'center', padding: '16px 0' }}>
                No skills recorded in your profile.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentSkills.map((skill, idx) => (
                  <div key={skill} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '10px',
                    background: `${SKILL_COLORS[idx % SKILL_COLORS.length]}0f`,
                    border: `1px solid ${SKILL_COLORS[idx % SKILL_COLORS.length]}28`,
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: SKILL_COLORS[idx % SKILL_COLORS.length], flexShrink: 0 }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{skill}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              From your database profile
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
