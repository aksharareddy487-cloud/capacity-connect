import { Award, Download, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';

const CERTS = [
  { id: 'CC-2024-8841', title: 'DevOps & Enterprise Workflows Professional', issueDate: 'Aug 28, 2024', issuer: 'CapacityConnect L&D', status: 'Verified', color: 'var(--accent-emerald)' },
  { id: 'CC-2024-7102', title: 'Foundational Web Systems Architecture', issueDate: 'Jul 15, 2024', issuer: 'CapacityConnect L&D', status: 'Verified', color: 'var(--accent-blue)' },
];

export default function TraineeCertificates() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
          My Digital <span className="gradient-text">Certificates & Credentials</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Verified certifications earned through CapacityConnect assessment programs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {CERTS.map(c => (
          <div key={c.id} className="glass" style={{ padding: '24px', borderRadius: '16px', borderTop: `4px solid ${c.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${c.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={22} color={c.color} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-emerald)', background: 'rgba(16,185,129,0.12)', padding: '4px 10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={13} /> {c.status}
              </span>
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.4 }}>{c.title}</h3>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Credential ID: {c.id}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>Issued: {c.issueDate} by {c.issuer}</div>

            <button className="btn-glow" style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Download size={15} /> Download PDF Certificate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
