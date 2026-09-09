import { FileText, Download, FileSpreadsheet, ShieldCheck, Clock } from 'lucide-react';

const REPORTS = [
  { title: 'Q3 Organization Capacity & Audit Report', type: 'PDF Audit Document', date: 'Sep 1, 2024', size: '2.4 MB', color: 'var(--accent-rose)' },
  { title: 'Full Employee Competency & Skill Gap Data', type: 'CSV Data Export', date: 'Sep 5, 2024', size: '1.1 MB', color: 'var(--accent-emerald)' },
  { title: 'Trainer Batch Attendance & Grading Log', type: 'Excel Spreadsheet', date: 'Sep 8, 2024', size: '850 KB', color: 'var(--accent-blue)' },
];

export default function AdminReports() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
          Executive Reports & <span className="gradient-text">Compliance Exports</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Download regulatory compliance reports, skill gap audits, and raw CSV analytics.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {REPORTS.map(r => (
          <div key={r.title} className="glass" style={{ padding: '20px 24px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderLeft: `4px solid ${r.color}` }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>{r.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '16px' }}>
                <span>Type: {r.type}</span>
                <span>Generated: {r.date}</span>
                <span>Size: {r.size}</span>
              </div>
            </div>
            <button className="btn-glow" style={{ padding: '9px 18px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Download size={15} /> Export File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
