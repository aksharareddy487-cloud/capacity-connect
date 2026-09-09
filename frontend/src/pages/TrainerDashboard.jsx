import { Users, BookOpen, ClipboardList, BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';

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

const batches = [
  { name: 'Batch 2024-Q3', count: 24, completion: 68, status: 'active', color: 'var(--accent-blue)' },
  { name: 'Batch 2024-Q4', count: 18, completion: 12, status: 'onboarding', color: 'var(--accent-amber)' },
];

const trainees = [
  { name: 'Arjun Sharma', batch: 'Q3', score: 87, status: 'ontrack', attendance: 92 },
  { name: 'Meera Krishnan', batch: 'Q3', score: 94, status: 'excellent', attendance: 98 },
  { name: 'Rohit Gupta', batch: 'Q3', score: 61, status: 'atrisk', attendance: 74 },
  { name: 'Sneha Reddy', batch: 'Q3', score: 78, status: 'ontrack', attendance: 88 },
  { name: 'Vijay Bose', batch: 'Q4', score: 45, status: 'new', attendance: 100 },
];

const STATUS = {
  ontrack: { color: 'var(--accent-blue)', label: 'On Track' },
  excellent: { color: 'var(--accent-emerald)', label: 'Excellent' },
  atrisk: { color: 'var(--accent-rose)', label: 'At Risk' },
  new: { color: 'var(--accent-amber)', label: 'New' },
};

export default function TrainerDashboard() {
  return (
    <div className="fade-in" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          Trainer Hub, <span className="gradient-text">Priya 👋</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Managing <strong style={{ color: 'var(--accent-blue)' }}>2 active batches</strong> · 42 learners enrolled
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard icon={Users} label="Total Trainees" value="42" color="var(--accent-blue)" sub="2 batches" />
        <StatCard icon={BookOpen} label="Courses Authored" value="6" color="var(--accent-violet)" sub="2 in review" />
        <StatCard icon={CheckCircle} label="Avg. Completion" value="68%" color="var(--accent-emerald)" sub="+5% this week" />
        <StatCard icon={AlertCircle} label="At-Risk Learners" value="3" color="var(--accent-rose)" sub="Needs attention" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
        {/* Trainee performance table */}
        <div>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} color="var(--accent-blue)" /> Trainee Performance
          </h2>
          <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Trainee', 'Batch', 'Score', 'Attendance', 'Status'].map(h => (
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
                    <tr key={t.name} style={{ borderBottom: i < trainees.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
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

          {/* Attendance quick chart */}
          <div className="glass" style={{ padding: '20px', marginTop: '16px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ClipboardList size={16} color="var(--accent-cyan)" /> Attendance Overview – This Week
            </h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '80px' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
                const vals = [88, 92, 76, 95, 84];
                return (
                  <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                      <div style={{
                        width: '100%', height: `${vals[i]}%`,
                        background: `linear-gradient(180deg, var(--accent-blue), var(--accent-violet))`,
                        borderRadius: '4px 4px 0 0', transition: 'height 0.8s ease',
                        minHeight: '4px',
                      }} />
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{day}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-blue)' }}>{vals[i]}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: batches + schedule */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} color="var(--accent-blue)" /> My Batches
            </h3>
            {batches.map(b => (
              <div key={b.name} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{b.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{b.count} trainees</div>
                  </div>
                  <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: 600, background: `${b.color}20`, color: b.color }}>
                    {b.status}
                  </span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', height: '6px' }}>
                  <div style={{ width: `${b.completion}%`, height: '100%', background: b.color, borderRadius: '6px' }} />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{b.completion}% complete</div>
              </div>
            ))}
          </div>

          <div className="glass" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="var(--accent-amber)" /> Today's Schedule
            </h3>
            {[
              { time: '10:00 AM', task: 'Live session – React Advanced', type: 'live' },
              { time: '02:00 PM', task: 'Grade Q3 assessments', type: 'task' },
              { time: '04:00 PM', task: 'Q4 onboarding review', type: 'meeting' },
            ].map(s => (
              <div key={s.time} style={{ display: 'flex', gap: '14px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '11px', color: 'var(--accent-blue)', fontWeight: 700, minWidth: '62px', paddingTop: '2px' }}>{s.time}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{s.task}</div>
              </div>
            ))}
          </div>

          <div className="glass" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.1))' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>
              <TrendingUp size={16} style={{ display: 'inline', marginRight: '8px', color: 'var(--accent-cyan)' }} />
              Course Completion Trend
            </div>
            {['React Advanced', 'Node.js Micro', 'AWS Cloud'].map((c, i) => {
              const v = [72, 45, 90];
              return (
                <div key={c} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{c}</span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{v[i]}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '4px' }}>
                    <div style={{ width: `${v[i]}%`, height: '100%', background: 'var(--accent-cyan)', borderRadius: '4px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
