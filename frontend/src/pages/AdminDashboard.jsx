import { Users, Building2, BarChart3, TrendingUp, Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, sub, trend }) => (
  <div className="glass fade-in" style={{ padding: '22px', borderRadius: '16px' }}>
    <div style={{ display: 'flex', justify: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}22` }}>
        <Icon size={22} color={color} />
      </div>
      {trend && (
        <span style={{ fontSize: '11px', color: trend > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700, padding: '3px 8px', background: trend > 0 ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)', borderRadius: '20px' }}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1, marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</div>
    {sub && <div style={{ fontSize: '11px', color, marginTop: '4px', fontWeight: 600 }}>{sub}</div>}
  </div>
);

const departments = [
  { name: 'Engineering', total: 120, trained: 96, color: 'var(--accent-blue)' },
  { name: 'Product & Design', total: 45, trained: 38, color: 'var(--accent-violet)' },
  { name: 'Sales & Marketing', total: 80, trained: 52, color: 'var(--accent-amber)' },
  { name: 'HR & Operations', total: 35, trained: 31, color: 'var(--accent-emerald)' },
  { name: 'Finance', total: 28, trained: 18, color: 'var(--accent-cyan)' },
];

const alerts = [
  { text: '3 trainees flagged for low attendance in Batch Q3', type: 'warn', time: '2h ago' },
  { text: 'New batch Q4 onboarding completed — 18 users', type: 'ok', time: '5h ago' },
  { text: 'AWS Cloud course completion below target (45% vs 60%)', type: 'warn', time: '1d ago' },
  { text: 'Q3 final assessment reports ready to download', type: 'ok', time: '1d ago' },
];

const users = [
  { name: 'Arjun Sharma', dept: 'Engineering', role: 'Trainee', status: 'Active' },
  { name: 'Priya Nair', dept: 'L&D', role: 'Trainer', status: 'Active' },
  { name: 'Rohit Gupta', dept: 'Engineering', role: 'Trainee', status: 'At Risk' },
  { name: 'Ananya Rao', dept: 'Product', role: 'Trainer', status: 'Active' },
  { name: 'Sneha Reddy', dept: 'Sales', role: 'Trainee', status: 'Active' },
];

export default function AdminDashboard() {
  return (
    <div className="fade-in" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          Admin Console, <span className="gradient-text">Rajan 👋</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          <strong style={{ color: 'var(--accent-rose)' }}>Org-wide</strong> capacity overview — 308 employees across 5 departments
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard icon={Users} label="Total Employees" value="308" color="var(--accent-blue)" trend={8} />
        <StatCard icon={CheckCircle} label="Trained This Quarter" value="235" color="var(--accent-emerald)" sub="76% coverage" trend={12} />
        <StatCard icon={AlertTriangle} label="Pending Enrollments" value="47" color="var(--accent-amber)" sub="Needs action" />
        <StatCard icon={Shield} label="Active Trainers" value="12" color="var(--accent-violet)" sub="3 departments" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Department capacity */}
          <div className="glass" style={{ padding: '22px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="var(--accent-blue)" /> Department Capacity Coverage
            </h2>
            {departments.map(d => {
              const pct = Math.round((d.trained / d.total) * 100);
              return (
                <div key={d.name} style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '14px' }}>{d.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>{d.trained}/{d.total} trained</span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '14px', color: d.color }}>{pct}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`, height: '100%',
                      background: `linear-gradient(90deg, ${d.color}, ${d.color}bb)`,
                      borderRadius: '6px', transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* User management table */}
          <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={17} color="var(--accent-violet)" /> User Management
              </h2>
              <button className="btn-glow" style={{ padding: '7px 16px', fontSize: '12px', borderRadius: '9px' }}>+ Add User</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Name', 'Department', 'Role', 'Status', ''].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.name} style={{ borderBottom: i < users.length - 1 ? '1px solid var(--border)' : 'none' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 18px', fontWeight: 600, fontSize: '14px' }}>{u.name}</td>
                    <td style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--text-secondary)' }}>{u.dept}</td>
                    <td style={{ padding: '12px 18px', fontSize: '12px' }}>{u.role}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: u.status === 'Active' ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.15)', color: u.status === 'Active' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px' }}>
                      <button style={{ fontSize: '12px', color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* System alerts */}
          <div className="glass" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={16} color="var(--accent-amber)" /> System Alerts
            </h3>
            {alerts.map((a, i) => (
              <div key={i} style={{
                padding: '10px 12px', borderRadius: '10px', marginBottom: '8px',
                background: a.type === 'warn' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)',
                borderLeft: `3px solid ${a.type === 'warn' ? 'var(--accent-amber)' : 'var(--accent-emerald)'}`,
              }}>
                <div style={{ fontSize: '12px', color: 'var(--text-primary)', lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '4px' }}>{a.time}</div>
              </div>
            ))}
          </div>

          {/* Org capacity gauge */}
          <div className="glass" style={{ padding: '20px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(139,92,246,0.08))' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Globe size={16} color="var(--accent-rose)" /> Org Capacity Index
            </div>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 16px' }}>
              <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="url(#grad)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50 * 0.76} ${2 * Math.PI * 50 * 0.24}`}
                  strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent-rose)" />
                    <stop offset="100%" stopColor="var(--accent-violet)" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>76%</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>235 of 308 employees trained</div>
            <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--accent-emerald)', fontWeight: 600 }}>↑ 12% vs last quarter</div>
          </div>

          {/* Quick actions */}
          <div className="glass" style={{ padding: '20px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>Quick Actions</h3>
            {['Generate Q3 Report', 'Assign New Batch', 'Export User Data', 'Schedule Audit'].map(action => (
              <button key={action} style={{
                display: 'block', width: '100%', padding: '10px 14px', marginBottom: '8px',
                borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
