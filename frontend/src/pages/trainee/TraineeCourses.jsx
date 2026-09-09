import { useState } from 'react';
import { BookOpen, Search, Filter, Play, CheckCircle, Clock, Star, Download, ChevronRight } from 'lucide-react';

const COURSES_DATA = [
  { id: 1, title: 'React 18 Advanced Patterns & Architecture', category: 'Frontend', instructor: 'Priya Nair', duration: '12 hrs', modules: 8, completedModules: 6, progress: 75, rating: 4.9, status: 'In Progress', color: 'var(--accent-blue)' },
  { id: 2, title: 'Node.js Microservices & Event Architecture', category: 'Backend', instructor: 'Rajesh Kumar', duration: '16 hrs', modules: 10, completedModules: 4, progress: 40, rating: 4.8, status: 'In Progress', color: 'var(--accent-violet)' },
  { id: 3, title: 'AWS Cloud Practitioner Certification Prep', category: 'Cloud', instructor: 'Ananya Rao', duration: '20 hrs', modules: 12, completedModules: 11, progress: 90, rating: 4.95, status: 'In Progress', color: 'var(--accent-emerald)' },
  { id: 4, title: 'System Design & Scalable Infrastructure', category: 'Architecture', instructor: 'Siddharth Jain', duration: '14 hrs', modules: 9, completedModules: 2, progress: 22, rating: 4.7, status: 'In Progress', color: 'var(--accent-amber)' },
  { id: 5, title: 'Git, GitHub & Enterprise DevOps Workflows', category: 'DevOps', instructor: 'Vikram Mehta', duration: '8 hrs', modules: 5, completedModules: 5, progress: 100, rating: 5.0, status: 'Completed', color: 'var(--accent-cyan)' },
  { id: 6, title: 'Cybersecurity Fundamentals & OWASP Standards', category: 'Security', instructor: 'Neha Sharma', duration: '10 hrs', modules: 6, completedModules: 0, progress: 0, rating: 4.85, status: 'Not Started', color: 'var(--accent-rose)' },
];

export default function TraineeCourses() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = COURSES_DATA.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fade-in" style={{ maxWidth: '1200px' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
            My Courses & <span className="gradient-text">Learning Library</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Access assigned courses, track module completion, and continue learning.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Total Courses: <strong style={{ color: 'var(--text-primary)' }}>{COURSES_DATA.length}</strong>
          </div>
          <div className="glass" style={{ padding: '8px 16px', borderRadius: '12px', fontSize: '13px', color: 'var(--accent-emerald)' }}>
            Completed: <strong>1</strong>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass" style={{ padding: '16px', borderRadius: '16px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', flex: '1 1 300px' }}>
          <Search size={16} color="var(--text-secondary)" />
          <input
            placeholder="Search courses by name or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Filter size={15} color="var(--text-secondary)" />
          {['All', 'In Progress', 'Completed', 'Not Started'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer',
                background: filter === f ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))' : 'rgba(255,255,255,0.05)',
                color: filter === f ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map(c => (
          <div key={c.id} className="glass" style={{ padding: '22px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: `4px solid ${c.color}` }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: c.color, background: `${c.color}15`, padding: '3px 10px', borderRadius: '12px' }}>
                  {c.category}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--accent-amber)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={13} fill="var(--accent-amber)" /> {c.rating}
                </span>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.4 }}>{c.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Instructor: {c.instructor}</p>

              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {c.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={14} /> {c.completedModules}/{c.modules} Modules</span>
              </div>
            </div>

            <div>
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                  <span style={{ fontWeight: 700, color: c.color }}>{c.progress}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: '6px' }} />
                </div>
              </div>

              <button className="btn-glow" style={{
                width: '100%', padding: '10px', fontSize: '13px', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: c.progress === 100 ? 'rgba(16,185,129,0.2)' : `linear-gradient(135deg, ${c.color}, var(--accent-violet))`,
                color: c.progress === 100 ? 'var(--accent-emerald)' : 'white',
                boxShadow: c.progress === 100 ? 'none' : undefined,
                border: c.progress === 100 ? '1px solid rgba(16,185,129,0.4)' : 'none',
              }}>
                {c.progress === 100 ? <><CheckCircle size={15} /> Completed</> : c.progress > 0 ? <><Play size={14} /> Continue Course</> : <><Play size={14} /> Start Course</>}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
