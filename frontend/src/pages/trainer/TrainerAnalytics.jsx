import { BarChart3, AlertTriangle, TrendingUp, Users } from 'lucide-react';

const AT_RISK = [
  { name: 'Rohit Gupta', batch: 'Q3', issue: 'Low Assessment Score (61%) & Attendance (74%)', status: 'At Risk', color: 'var(--accent-rose)' },
  { name: 'Vijay Bose', batch: 'Q4', issue: 'Pending Prerequisites Module 1', status: 'Needs Attention', color: 'var(--accent-amber)' },
];

export default function TrainerAnalytics() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
          Learning <span className="gradient-text">Analytics & Risk Oversight</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Monitor batch performance trends, module bottlenecks, and flagged learners.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="var(--accent-rose)" /> Flagged At-Risk Trainees
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {AT_RISK.map(r => (
              <div key={r.name} style={{ padding: '16px', borderRadius: '12px', background: `${r.color}10`, borderLeft: `4px solid ${r.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '14px' }}>{r.name} (Batch {r.batch})</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: r.color }}>{r.status}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{r.issue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass" style={{ padding: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.1))' }}>
          <TrendingUp size={32} color="var(--accent-cyan)" style={{ margin: '0 auto 12px' }} />
          <div style={{ fontSize: '28px', fontWeight: 800 }}>87%</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Average Class Quiz Score</div>
        </div>
      </div>
    </div>
  );
}
