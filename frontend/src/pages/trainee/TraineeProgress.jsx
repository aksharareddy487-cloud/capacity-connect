import { BarChart3, Target, Award, TrendingUp, CheckCircle } from 'lucide-react';

const SKILLS = [
  { skill: 'React & Frontend Architecture', level: 'Advanced', percent: 85, color: 'var(--accent-blue)', status: 'Mastered' },
  { skill: 'Node.js & Express REST APIs', level: 'Intermediate', percent: 65, color: 'var(--accent-violet)', status: 'In Progress' },
  { skill: 'Cloud & Infrastructure (AWS)', level: 'Intermediate', percent: 70, color: 'var(--accent-emerald)', status: 'In Progress' },
  { skill: 'System Design & Scalability', level: 'Foundational', percent: 40, color: 'var(--accent-amber)', status: 'Needs Focus' },
  { skill: 'DevOps & CI/CD Pipelines', level: 'Advanced', percent: 90, color: 'var(--accent-cyan)', status: 'Mastered' },
];

export default function TraineeProgress() {
  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
          Competency & <span className="gradient-text">Skill Analytics</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Detailed evaluation of your learning velocity, skill proficiencies, and targeted growth goals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Skill Breakdown */}
          <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="var(--accent-blue)" /> Skill Proficiency Breakdown
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {SKILLS.map(s => (
                <div key={s.skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.skill}</span>
                    <span style={{ fontWeight: 700, color: s.color }}>{s.percent}% ({s.level})</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', height: '8px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${s.percent}%`, height: '100%', background: s.color, borderRadius: '6px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass" style={{ padding: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))' }}>
            <TrendingUp size={32} color="var(--accent-blue)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>Top 10%</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Batch Performance Percentile</div>
          </div>
        </div>
      </div>
    </div>
  );
}
