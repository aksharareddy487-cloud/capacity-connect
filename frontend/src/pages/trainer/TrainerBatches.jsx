import { useState } from 'react';
import { Users, Plus, BookOpen, Calendar, CheckCircle2, ChevronRight, Search } from 'lucide-react';

const BATCHES = [
  { id: 'Q3-2024', name: 'Batch 2024-Q3 (Engineering Cohort)', trainees: 24, progress: 72, startDate: 'Jul 1, 2024', endDate: 'Sep 30, 2024', status: 'Active', lead: 'Priya Nair', color: 'var(--accent-blue)' },
  { id: 'Q4-2024', name: 'Batch 2024-Q4 (Product & L&D Cohort)', trainees: 18, progress: 15, startDate: 'Sep 1, 2024', endDate: 'Dec 15, 2024', status: 'Onboarding', lead: 'Priya Nair', color: 'var(--accent-amber)' },
  { id: 'Q2-2024', name: 'Batch 2024-Q2 (Fullstack DevOps)', trainees: 30, progress: 100, startDate: 'Apr 1, 2024', endDate: 'Jun 30, 2024', status: 'Completed', lead: 'Ananya Rao', color: 'var(--accent-emerald)' },
];

export default function TrainerBatches() {
  const [search, setSearch] = useState('');

  const filtered = BATCHES.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
            My Batches & <span className="gradient-text">Cohorts</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Manage assigned learner cohorts, track overall completion, and oversee rosters.
          </p>
        </div>
        <button className="btn-glow" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Create New Batch
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map(b => (
          <div key={b.id} className="glass" style={{ padding: '24px', borderRadius: '16px', borderTop: `4px solid ${b.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: `${b.color}20`, color: b.color }}>
                {b.status}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>ID: {b.id}</span>
            </div>

            <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '12px' }}>{b.name}</h3>

            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Users size={15} color="var(--accent-blue)" /> {b.trainees} Trainees</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={15} color="var(--accent-cyan)" /> {b.startDate}</span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Batch Completion</span>
                <span style={{ fontWeight: 700, color: b.color }}>{b.progress}%</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                <div style={{ width: `${b.progress}%`, height: '100%', background: b.color, borderRadius: '6px' }} />
              </div>
            </div>

            <button style={{ width: '100%', padding: '9px', borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)', fontSize: '13px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              Manage Trainee Roster <ChevronRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
