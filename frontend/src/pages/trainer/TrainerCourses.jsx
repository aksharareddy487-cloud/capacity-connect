import { useState } from 'react';
import { BookOpen, Plus, Edit, Trash2, Eye, Star } from 'lucide-react';

const COURSES = [
  { id: 1, name: 'React 18 Advanced Patterns & Architecture', modules: 8, enrolled: 42, status: 'Published', rating: 4.9, color: 'var(--accent-blue)' },
  { id: 2, name: 'Node.js Microservices & Event Architecture', modules: 10, enrolled: 35, status: 'Published', rating: 4.8, color: 'var(--accent-violet)' },
  { id: 3, name: 'GraphQL & Modern API Design', modules: 6, enrolled: 0, status: 'Draft', rating: 0, color: 'var(--accent-amber)' },
];

export default function TrainerCourses() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
            Course Library & <span className="gradient-text">Authoring Workbench</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Author, edit, and publish training curricula for assigned cohorts.
          </p>
        </div>
        <button className="btn-glow" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Author New Course
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {COURSES.map(c => (
          <div key={c.id} className="glass" style={{ padding: '24px', borderRadius: '16px', borderTop: `4px solid ${c.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', background: `${c.color}20`, color: c.color }}>
                {c.status}
              </span>
              {c.rating > 0 && (
                <span style={{ fontSize: '12px', color: 'var(--accent-amber)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={13} fill="var(--accent-amber)" /> {c.rating}
                </span>
              )}
            </div>

            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>{c.name}</h3>

            <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              <span>{c.modules} Modules</span>
              <span>{c.enrolled} Enrolled Learners</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-primary)', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Edit size={14} /> Edit Modules
              </button>
              <button style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer' }}>
                <Eye size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
