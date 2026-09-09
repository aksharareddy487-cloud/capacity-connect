import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, BookOpen, BarChart3, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

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

export default function TrainerDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.courses)) {
          setCourses(data.courses);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const batches = [
    { name: 'GovCloud Batch 2024-Q3', count: 24, completion: 68, status: 'active', color: 'var(--accent-blue)' },
    { name: 'Data Governance Batch 2024-Q4', count: 18, completion: 25, status: 'active', color: 'var(--accent-amber)' },
  ];

  const trainees = [
    { name: 'Aarav Sharma', batch: 'Q3', score: 87, status: 'ontrack', attendance: 92 },
    { name: 'Ananya Patel', batch: 'Q3', score: 94, status: 'excellent', attendance: 98 },
    { name: 'Rohit Gupta', batch: 'Q3', score: 61, status: 'atrisk', attendance: 74 },
    { name: 'Sneha Reddy', batch: 'Q3', score: 78, status: 'ontrack', attendance: 88 },
  ];

  const STATUS = {
    ontrack: { color: 'var(--accent-blue)', label: 'On Track' },
    excellent: { color: 'var(--accent-emerald)', label: 'Excellent' },
    atrisk: { color: 'var(--accent-rose)', label: 'At Risk' },
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          Trainer Hub, <span className="gradient-text">{user?.name || 'Prof. Sunita Deshmukh'} 👋</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Instructor Department: <strong style={{ color: 'var(--accent-blue)' }}>{user?.department || 'National Institute of Smart Governance (NISG)'}</strong>
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard icon={Users} label="Enrolled Learners" value="42" color="var(--accent-blue)" sub="Across 2 batches" />
        <StatCard icon={BookOpen} label="Database Modules" value={courses.length || 6} color="var(--accent-violet)" sub="Live DB Synced" />
        <StatCard icon={CheckCircle} label="Avg. Pass Rate" value="88%" color="var(--accent-emerald)" sub="+4% this quarter" />
        <StatCard icon={AlertCircle} label="At-Risk Learners" value="1" color="var(--accent-rose)" sub="Requires review" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} color="var(--accent-blue)" /> Trainee Assessment Overview
          </h2>
          <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Trainee', 'Batch', 'Quiz Score', 'Attendance', 'Status'].map(h => (
                    <th key={h} style={{ padding: '14px 18px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trainees.map((t, i) => {
                  const s = STATUS[t.status];
                  return (
                    <tr key={t.name} style={{ borderBottom: i < trainees.length - 1 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '14px 18px', fontSize: '14px', fontWeight: 600 }}>{t.name}</td>
                      <td style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--text-secondary)' }}>Batch {t.batch}</td>
                      <td style={{ padding: '14px 18px', fontSize: '14px', fontWeight: 700, color: t.score >= 80 ? 'var(--accent-emerald)' : t.score >= 70 ? 'var(--accent-blue)' : 'var(--accent-rose)' }}>
                        {t.score}%
                      </td>
                      <td style={{ padding: '14px 18px', fontSize: '13px', color: 'var(--text-secondary)' }}>{t.attendance}%</td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: `${s.color}20`, color: s.color }}>
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} color="var(--accent-blue)" /> Active Batches
            </h3>
            {batches.map(b => (
              <div key={b.name} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{b.count} trainees</div>
                  </div>
                  <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: 600, background: `${b.color}20`, color: b.color }}>
                    {b.status}
                  </span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', height: '6px' }}>
                  <div style={{ width: `${b.completion}%`, height: '100%', background: b.color, borderRadius: '6px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
