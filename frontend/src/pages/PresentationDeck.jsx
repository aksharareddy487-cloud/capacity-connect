import { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Maximize2, Minimize2, FileText,
  Zap, AlertCircle, CheckCircle2, Cpu, Sparkles, TrendingUp,
  Layers, Database, Shield, Layout, Play, Eye
} from 'lucide-react';

const SLIDES = [
  {
    id: 'title',
    title: 'CapacityConnect',
    subtitle: 'A Digital Capacity Building & Learning Management Portal',
    category: 'Overview',
    icon: Zap,
    color: 'var(--accent-blue)',
    content: (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: '24px', margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
          boxShadow: '0 0 50px rgba(99,102,241,0.5)',
        }}>
          <Zap size={40} color="white" />
        </div>
        <h1 className="gradient-text" style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '16px' }}>
          CapacityConnect
        </h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 32px', lineHeight: 1.5 }}>
          Empowering organizations with structured competency mapping, role-based dashboards, and automated skill tracking.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Trainee Portal', 'Trainer Analytics', 'Admin Capacity Planning'].map((tag) => (
            <span key={tag} style={{
              padding: '8px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', color: 'var(--accent-blue)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    speakerNotes: 'Welcome team! Today we are introducing CapacityConnect, an end-to-end portal addressing institutional learning gaps.',
  },
  {
    id: 'problem',
    title: '1. The Core Problem',
    subtitle: 'Fragmented Learning & Lack of Real-Time Capacity Metrics',
    category: 'Problem Statement',
    icon: AlertCircle,
    color: 'var(--accent-rose)',
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', padding: '20px 0' }}>
        {[
          {
            num: '01',
            title: 'Fragmented Systems',
            desc: 'Training data, course materials, and attendance tracked across disconnected spreadsheets and emails.',
            color: 'var(--accent-rose)',
          },
          {
            num: '02',
            title: 'No Real-time Metrics',
            desc: 'Leadership lacks visibility into department-level competency readiness and skills gaps.',
            color: 'var(--accent-amber)',
          },
          {
            num: '03',
            title: 'Passive Trainee Engagement',
            desc: 'Learners lack clear progression paths, deadline reminders, and centralized certification records.',
            color: 'var(--accent-violet)',
          },
        ].map((item) => (
          <div key={item.num} className="glass" style={{ padding: '28px', borderLeft: `4px solid ${item.color}` }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: item.color, marginBottom: '12px' }}>{item.num}</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    ),
    speakerNotes: 'Emphasize how manual tracking causes operational latency and blind spots for leadership.',
  },
  {
    id: 'solution',
    title: '2. Our Unified Solution',
    subtitle: 'Role-Tailored Architecture for Seamless Execution',
    category: 'Solution',
    icon: CheckCircle2,
    color: 'var(--accent-emerald)',
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px 0' }}>
        {[
          {
            role: 'Trainee Hub',
            color: 'var(--accent-emerald)',
            features: ['Personalized course dashboard', 'Competency radar & progress bars', 'Upcoming session schedule', 'Digital certificates repository'],
          },
          {
            role: 'Trainer Workbench',
            color: 'var(--accent-blue)',
            features: ['Batch cohort management', 'Attendance & grading center', 'Course authoring & publishing', 'At-risk trainee alert system'],
          },
          {
            role: 'Admin Console',
            color: 'var(--accent-rose)',
            features: ['Org-wide capacity gauge', 'Department coverage analytics', 'Role-based access control', 'Automated executive reporting'],
          },
        ].map((col) => (
          <div key={col.role} className="glass" style={{ padding: '24px', background: `${col.color}08`, border: `1px solid ${col.color}30` }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: col.color, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} /> {col.role}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.features.map((f) => (
                <li key={f} style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: col.color, flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
    speakerNotes: 'Walk through how each user role gets a dedicated experience designed specifically for their daily workflow.',
  },
  {
    id: 'architecture',
    title: '3. Technical Architecture',
    subtitle: 'Modern, Scalable & High-Performance Stack',
    category: 'Architecture',
    icon: Cpu,
    color: 'var(--accent-violet)',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { title: 'Frontend Layer', desc: 'Vite + React 18, Tailwind CSS v4, Lucide Icons, React Router v6', icon: Layout, color: 'var(--accent-cyan)' },
            { title: 'Backend REST API', desc: 'Node.js Express framework, modular routing, JWT auth middleware', icon: Database, color: 'var(--accent-blue)' },
            { title: 'Security & Access', desc: 'Role-Based Access Control (RBAC), sanitized payloads, CORS protection', icon: Shield, color: 'var(--accent-violet)' },
          ].map((block) => {
            const Icon = block.icon;
            return (
              <div key={block.title} className="glass" style={{ padding: '20px' }}>
                <Icon size={24} color={block.color} style={{ marginBottom: '12px' }} />
                <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{block.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{block.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Data flow banner */}
        <div className="glass" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))', textAlign: 'center' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, marginBottom: '10px' }}>
            Data Flow Pipeline
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', fontWeight: 600, fontSize: '14px' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>Client UI (React)</span>
            <span style={{ color: 'var(--text-secondary)' }}>── HTTP/JSON ──▶</span>
            <span style={{ color: 'var(--accent-blue)' }}>Express Router</span>
            <span style={{ color: 'var(--text-secondary)' }}>── Auth Middleware ──▶</span>
            <span style={{ color: 'var(--accent-violet)' }}>Capacity Controllers</span>
          </div>
        </div>
      </div>
    ),
    speakerNotes: 'Detail the decoupled frontend/backend architecture which allows scaling the UI and API independently.',
  },
  {
    id: 'features',
    title: '4. Key Platform Features',
    subtitle: 'Built for Immediate Productivity & Engagement',
    category: 'Features',
    icon: Sparkles,
    color: 'var(--accent-amber)',
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '16px 0' }}>
        {[
          { title: '⚡ Rapid Role Switcher', desc: 'Instant demo mode toggle between Trainee, Trainer, and Admin views directly from login or navbar.' },
          { title: '📊 Dynamic Capacity Metrics', desc: 'Real-time calculation of department coverage, batch progress, and organizational skill indexes.' },
          { title: '🎯 Interactive Competency Maps', desc: 'Visual progress indicators and radar distributions for active learning tracks.' },
          { title: '🔔 Real-time Notifications', desc: 'Contextual notification center for assignment due dates, quiz feedback, and session alerts.' },
        ].map((f) => (
          <div key={f.title} className="glass" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>{f.title}</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    ),
    speakerNotes: 'Highlight the role switcher feature as it makes reviewing screen implementations seamless during testing.',
  },
  {
    id: 'impact',
    title: '5. Measurable Impact & Roadmap',
    subtitle: 'Transforming Organizational Learning Outcomes',
    category: 'Impact & Roadmap',
    icon: TrendingUp,
    color: 'var(--accent-cyan)',
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '16px 0' }}>
        <div className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} /> Projected Business Impact
          </h3>
          {[
            { metric: '+40%', label: 'Increase in On-Time Course Completion' },
            { metric: '-65%', label: 'Reduction in Administrative Tracking Hours' },
            { metric: '100%', label: 'Real-time Visibility into Org Capacity' },
          ].map((m) => (
            <div key={m.label} style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-emerald)', minWidth: '75px' }}>{m.metric}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div className="glass" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} /> Next Horizon (Roadmap)
          </h3>
          {[
            { phase: 'Phase 1 (Current)', desc: 'Core Shell, Role Dashboards, Presentation Deck' },
            { phase: 'Phase 2 (Next Week)', desc: 'Backend DB Integration & Live Assessment Engine' },
            { phase: 'Phase 3 (Next Month)', desc: 'AI-Powered Skill Gap Recommendations' },
          ].map((r) => (
            <div key={r.phase} style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{r.phase}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    speakerNotes: 'Conclude with clear impact metrics and a structured roadmap for future development sprints.',
  },
];

export default function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const slide = SLIDES[currentSlide];
  const total = SLIDES.length;

  const prevSlide = () => setCurrentSlide((c) => Math.max(0, c - 1));
  const nextSlide = () => setCurrentSlide((c) => Math.min(total - 1, c + 1));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 120px)',
    }}>
      {/* Presentation Control Bar */}
      <div className="glass" style={{
        padding: '12px 20px', borderRadius: '14px', marginBottom: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => setShowDrawer((d) => !d)} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px',
            border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)',
            fontSize: '13px', cursor: 'pointer', fontWeight: 600,
          }}>
            <Layout size={14} /> Slide {currentSlide + 1} of {total}
          </button>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
            {slide.category}
          </span>
        </div>

        {/* Center: Slide quick jump indicator */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: idx === currentSlide ? '24px' : '8px', height: '8px', borderRadius: '4px',
                background: idx === currentSlide ? slide.color : 'rgba(255,255,255,0.2)',
                border: 'none', cursor: 'pointer', transition: 'all 0.25s',
              }}
              title={s.title}
            />
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setShowNotes((n) => !n)} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px',
            border: '1px solid var(--border)',
            background: showNotes ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
            color: showNotes ? 'var(--accent-blue)' : 'var(--text-secondary)',
            fontSize: '13px', cursor: 'pointer',
          }}>
            <FileText size={14} /> Notes
          </button>
          <button onClick={toggleFullscreen} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px',
            border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)',
            fontSize: '13px', cursor: 'pointer',
          }}>
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />} {isFullscreen ? 'Exit' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="glass fade-in" style={{
        flex: 1, padding: '36px', borderRadius: '20px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', position: 'relative', borderTop: `4px solid ${slide.color}`,
        minHeight: '480px',
      }}>
        {/* Slide Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <span style={{
              fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px',
              color: slide.color, background: `${slide.color}15`, padding: '4px 10px', borderRadius: '12px',
              display: 'inline-block', marginBottom: '8px',
            }}>
              {slide.category}
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {slide.title}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {slide.subtitle}
            </p>
          </div>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${slide.color}18`, border: `1px solid ${slide.color}35`,
          }}>
            <slide.icon size={24} color={slide.color} />
          </div>
        </div>

        {/* Slide Main Content */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%' }}>
            {slide.content}
          </div>
        </div>

        {/* Slide Footer Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--border)',
        }}>
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px',
              border: '1px solid var(--border)', background: 'rgba(255,255,255,0.05)',
              color: currentSlide === 0 ? 'rgba(255,255,255,0.2)' : 'var(--text-primary)',
              cursor: currentSlide === 0 ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 600,
            }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Use ← → arrow keys to navigate
          </span>

          <button
            onClick={nextSlide}
            disabled={currentSlide === total - 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px',
              border: 'none', background: currentSlide === total - 1 ? 'rgba(255,255,255,0.1)' : `linear-gradient(135deg, ${slide.color}, var(--accent-violet))`,
              color: 'white', cursor: currentSlide === total - 1 ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 600,
              boxShadow: currentSlide === total - 1 ? 'none' : `0 0 20px ${slide.color}40`,
            }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Speaker Notes Overlay */}
      {showNotes && (
        <div className="glass fade-in" style={{
          marginTop: '16px', padding: '16px 20px', borderRadius: '14px',
          background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
        }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-blue)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={14} /> Speaker Notes (Slide {currentSlide + 1})
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
            {slide.speakerNotes}
          </p>
        </div>
      )}

      {/* Slide Drawer Modal */}
      {showDrawer && (
        <div className="fade-in" style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
        }} onClick={() => setShowDrawer(false)}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', padding: '24px', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>All Presentation Slides</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SLIDES.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => { setCurrentSlide(idx); setShowDrawer(false); }}
                  style={{
                    padding: '14px 18px', borderRadius: '12px', border: '1px solid var(--border)',
                    background: idx === currentSlide ? `${s.color}18` : 'rgba(255,255,255,0.03)',
                    borderColor: idx === currentSlide ? s.color : 'var(--border)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', color: s.color, fontWeight: 700 }}>Slide {idx + 1} · {s.category}</div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{s.title}</div>
                  </div>
                  <ChevronRight size={16} color="var(--text-secondary)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
