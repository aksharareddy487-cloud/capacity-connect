import { useState } from 'react';
import { ClipboardList, Check, X, Save } from 'lucide-react';

const INITIAL_ROSTER = [
  { id: 1, name: 'Aarav Sharma', batch: 'GovCloud Q3', status: 'present', score: 88 },
  { id: 2, name: 'Ananya Patel', batch: 'GovCloud Q3', status: 'present', score: 95 },
  { id: 3, name: 'Rohit Gupta', batch: 'GovCloud Q3', status: 'absent', score: 62 },
  { id: 4, name: 'Sneha Reddy', batch: 'Data Governance Q3', status: 'present', score: 84 },
  { id: 5, name: 'Vijay Bose', batch: 'Data Governance Q3', status: 'present', score: 78 },
];

export default function TrainerAttendance() {
  const [roster, setRoster] = useState(INITIAL_ROSTER);

  const toggleStatus = (id) => {
    setRoster(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'present' ? 'absent' : 'present' } : r));
  };

  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
            Attendance & <span className="gradient-text">Grading Center</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Mark daily session attendance and submit assessment scores for active batches.
          </p>
        </div>
        <button className="btn-glow" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Save size={16} /> Save Attendance Records
        </button>
      </div>

      <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Trainee Name</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Batch</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Assessment Score</th>
              <th style={{ padding: '14px 20px', textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Attendance Toggle</th>
            </tr>
          </thead>
          <tbody>
            {roster.map((r, i) => (
              <tr key={r.id} style={{ borderBottom: i < roster.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: '14px' }}>{r.name}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{r.batch}</td>
                <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 700, color: 'var(--accent-blue)' }}>{r.score}%</td>
                <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                  <button
                    onClick={() => toggleStatus(r.id)}
                    style={{
                      padding: '6px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                      background: r.status === 'present' ? 'rgba(16,185,129,0.18)' : 'rgba(244,63,94,0.18)',
                      color: r.status === 'present' ? 'var(--accent-emerald)' : 'var(--accent-rose)',
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                    }}
                  >
                    {r.status === 'present' ? <><Check size={14} /> Present</> : <><X size={14} /> Absent</>}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
