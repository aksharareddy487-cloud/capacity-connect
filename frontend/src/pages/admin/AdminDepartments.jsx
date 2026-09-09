import { Building2, Users, Shield, Plus } from 'lucide-react';

const DEPARTMENTS = [
  { name: 'Engineering', head: 'Rajesh Kumar', totalEmployees: 120, trained: 96, budget: '$45,000', color: 'var(--accent-blue)' },
  { name: 'Product & Design', head: 'Ananya Rao', totalEmployees: 45, trained: 38, budget: '$20,000', color: 'var(--accent-violet)' },
  { name: 'Sales & Marketing', head: 'Vikram Mehta', totalEmployees: 80, trained: 52, budget: '$30,000', color: 'var(--accent-amber)' },
  { name: 'HR & Operations', head: 'Rajan Mehta', totalEmployees: 35, trained: 31, budget: '$15,000', color: 'var(--accent-emerald)' },
  { name: 'Finance & Compliance', head: 'Neha Sharma', totalEmployees: 28, trained: 18, budget: '$12,000', color: 'var(--accent-cyan)' },
];

export default function AdminDepartments() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
            Department <span className="gradient-text">Allocation & Budgeting</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Manage organizational divisions, department heads, and training budgets.
          </p>
        </div>
        <button className="btn-glow" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Add Department
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {DEPARTMENTS.map(d => (
          <div key={d.name} className="glass" style={{ padding: '24px', borderRadius: '16px', borderTop: `4px solid ${d.color}` }}>
            <div style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{d.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Department Head: {d.head}</div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Trained Staff</span>
              <span style={{ fontWeight: 700, color: d.color }}>{d.trained} / {d.totalEmployees}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Annual L&D Budget</span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{d.budget}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
