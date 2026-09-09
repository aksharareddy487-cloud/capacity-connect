import { BookOpen, Award, Calendar, TrendingUp, Clock, CheckCircle, Star, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div className="glass fade-in" style={{ padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
    <div style={{ width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}22`, flexShrink: 0 }}>
      <Icon size={22} color={color} />
    </div>
    <div>
      <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>{label}</div>
      {sub && <div style={{ fontSize: '11px', color, marginTop: '4px', fontWeight: 600 }}>{sub}</div>}
    </div>
  </div>
);

const courses = [
  { name: 'React Advanced Patterns', progress: 72, instructor: 'Priya Nair', color: 'var(--accent-blue)', due: 'Due Sep 20' },
  { name: 'Node.js Microservices', progress: 45, instructor: 'Rajesh Kumar', color: 'var(--accent-violet)', due: 'Due Oct 5' },
  { name: 'AWS Cloud Practitioner', progress: 90, instructor: 'Ananya Rao', color: 'var(--accent-emerald)', due: 'Due Sep 15' },
  { name: 'System Design Fundamentals', progress: 28, instructor: 'Siddharth Jain', color: 'var(--accent-amber)', due: 'Due Oct 18' },
];

const sessions = [
  { title: 'Live Q&A – React Patterns', time: 'Today, 3:00 PM', type: 'live', color: 'var(--accent-blue)' },
  { title: 'Workshop: AWS Lab', time: 'Sep 11, 10:00 AM', type: 'workshop', color: 'var(--accent-emerald)' },
  { title: 'Assessment: Node.js Basics', time: 'Sep 13, 2:00 PM', type: 'assessment', color: 'var(--accent-amber)' },
];

const competencies = [
  { skill: 'Frontend Development', score: 78, color: 'var(--accent-blue)' },
  { skill: 'Backend & APIs', score: 55, color: 'var(--accent-violet)' },
  { skill: 'Cloud Services', score: 64, color: 'var(--accent-cyan)' },
  { skill: 'Problem Solving', score: 82, color: 'var(--accent-emerald)' },
];

export default function TraineeDashboard() {
  return (
    <div className="fade-in" style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          Good morning, <span className="gradient-text">Arjun 👋</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          You're <strong style={{ color: 'var(--accent-emerald)' }}>72% complete</strong> with Batch 2024-Q3. Keep it up!
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard icon={BookOpen} label="Enrolled Courses" value="4" color="var(--accent-blue)" sub="2 in progress" />
        <StatCard icon={CheckCircle} label="Completed Modules" value="18" color="var(--accent-emerald)" sub="+3 this week" />
        <StatCard icon={Award} label="Certificates Earned" value="2" color="var(--accent-amber)" sub="1 pending" />
        <StatCard icon={TrendingUp} label="Avg. Score" value="87%" color="var(--accent-violet)" sub="Above batch avg." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Courses */}
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="var(--accent-blue)" /> My Courses
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {courses.map(c => (
              <div key={c.name} className="glass" style={{ padding: '18px 20px', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '3px' }}>{c.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>by {c.instructor}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.06)', padding: '3px 9px', borderRadius: '20px' }}>
                      {c.due}
                    </span>
                    <span style={{ fontWeight: 800, fontSize: '15px', color: c.color }}>{c.progress}%</span>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.progress}%`, height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}99)`, borderRadius: '6px', transition: 'width 0.8s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Competency */}
          <div className="glass" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={16} color="var(--accent-violet)" /> Competency Map
            </h3>
            {competencies.map(c => (
              <div key={c.skill} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.skill}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: c.color }}>{c.score}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '5px' }}>
                  <div style={{ width: `${c.score}%`, height: '100%', background: c.color, borderRadius: '4px', transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming sessions */}
          <div className="glass" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} color="var(--accent-cyan)" /> Upcoming Sessions
            </h3>
            {sessions.map(s => (
              <div key={s.title} style={{ display: 'flex', gap: '12px', marginBottom: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, marginTop: '5px', flexShrink: 0 }} className="pulse" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    <Clock size={10} style={{ display: 'inline', marginRight: '4px' }} />{s.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard teaser */}
          <div className="glass" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Star size={16} color="var(--accent-amber)" />
              <span style={{ fontWeight: 700, fontSize: '14px' }}>Batch Leaderboard</span>
            </div>
            {[{ name: 'Meera K.', score: 94, rank: 1 }, { name: 'Arjun S.', score: 87, rank: 2 }, { name: 'Rohit G.', score: 83, rank: 3 }].map(l => (
              <div key={l.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '12px', color: l.rank === 2 ? 'var(--accent-blue)' : 'var(--text-secondary)', fontWeight: l.rank === 2 ? 700 : 400 }}>
                  #{l.rank} {l.name}
                </span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-amber)' }}>{l.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
