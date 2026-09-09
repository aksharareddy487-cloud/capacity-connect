import { Database, Target, TrendingUp, ShieldAlert } from 'lucide-react';

const CAPACITY_DATA = [
  { dept: 'Engineering', target: 120, current: 96, pct: 80, status: 'On Track', color: 'var(--accent-blue)' },
  { dept: 'Product & Design', target: 45, current: 38, pct: 84, status: 'On Track', color: 'var(--accent-violet)' },
  { dept: 'Sales & Marketing', target: 80, current: 52, pct: 65, status: 'Needs Focus', color: 'var(--accent-amber)' },
  { dept: 'HR & Operations', target: 35, current: 31, pct: 88, status: 'On Track', color: 'var(--accent-emerald)' },
  { dept: 'Finance & Compliance', target: 28, current: 18, pct: 64, status: 'Needs Focus', color: 'var(--accent-rose)' },
];

export default function AdminCapacity() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
          Capacity Planning & <span className="gradient-text">Skill Gap Analysis</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Departmental target capacity vs actual trained employee headcount metrics.
        </p>
      </div>

      <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={18} color="var(--accent-blue)" /> Department Capacity Distribution
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {CAPACITY_DATA.map(c => (
            <div key={c.dept}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ fontWeight: 600 }}>{c.dept} ({c.current}/{c.target} Trained)</span>
                <span style={{ fontWeight: 700, color: c.color }}>{c.pct}% ({c.status})</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', height: '10px', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: '6px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
