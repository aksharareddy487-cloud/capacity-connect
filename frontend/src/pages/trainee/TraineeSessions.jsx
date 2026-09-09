import { useState } from 'react';
import { Calendar, Clock, Video, User, CheckCircle2 } from 'lucide-react';

const SESSIONS = [
  { id: 1, title: 'Live Q&A & Lab – Foundations of Cloud Infrastructure for Government Portals', trainer: 'Prof. Sunita Deshmukh', time: 'Today, 3:00 PM - 4:30 PM', status: 'Live Soon', type: 'Virtual Workshop', link: 'https://meet.google.com/demo-capacity-connect', color: 'var(--accent-blue)', batch: 'GovCloud Batch 2024-Q3' },
  { id: 2, title: 'Hands-on Lab: District Dashboard Analytics & KPI Formulation', trainer: 'Prof. Sunita Deshmukh', time: 'Sep 11, 10:00 AM - 12:00 PM', status: 'Scheduled', type: 'Lab Session', link: '#', color: 'var(--accent-emerald)', batch: 'Data Governance Batch 2024-Q3' },
  { id: 3, title: 'DPDP Act 2023 Principles & CERT-In Protocols Assessment', trainer: 'Prof. Sunita Deshmukh', time: 'Sep 13, 2:00 PM - 3:30 PM', status: 'Scheduled', type: 'Assessment', link: '#', color: 'var(--accent-amber)', batch: 'GovCloud Batch 2024-Q3' },
  { id: 4, title: 'CPGRAMS Citizen Grievance Redressal SLA Review', trainer: 'Prof. Sunita Deshmukh', time: 'Sep 15, 11:00 AM - 1:00 PM', status: 'Scheduled', type: 'Workshop', link: '#', color: 'var(--accent-violet)', batch: 'E-Service Delivery Batch 2024-Q3' },
  { id: 5, title: 'Orientation & National Capacity Building Roadmap Briefing', trainer: 'Prof. Sunita Deshmukh', time: 'Sep 1, 10:00 AM', status: 'Completed', type: 'Orientation', link: '#', color: 'var(--accent-cyan)', batch: 'GovCloud Batch 2024-Q3' },
];

export default function TraineeSessions() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
          Training <span className="gradient-text">Sessions & Schedule</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Join live virtual workshops, lab sessions, and Q&A hours for capacity building.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {SESSIONS.map(s => (
          <div key={s.id} className="glass" style={{ padding: '22px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ flex: '1 1 340px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: `${s.color}18`, color: s.color }}>
                  {s.type}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.batch}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{s.title}</h3>
              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={14} color="var(--accent-cyan)" /> {s.time}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={14} color="var(--accent-blue)" /> {s.trainer}</span>
              </div>
            </div>

            <div>
              {s.status === 'Live Soon' ? (
                <a href={s.link} target="_blank" rel="noreferrer" className="btn-glow" style={{ padding: '10px 20px', borderRadius: '10px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                  <Video size={16} /> Join Live Workshop
                </a>
              ) : s.status === 'Completed' ? (
                <span style={{ fontSize: '13px', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16,185,129,0.12)', padding: '8px 16px', borderRadius: '10px' }}>
                  <CheckCircle2 size={16} /> Session Attended
                </span>
              ) : (
                <button style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
                  Add to Calendar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
