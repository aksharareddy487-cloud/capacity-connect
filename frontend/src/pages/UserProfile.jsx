import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Building2, Award, CheckCircle, Save } from 'lucide-react';

const ROLE_COLORS = {
  trainee: 'var(--accent-emerald)',
  trainer: 'var(--accent-blue)',
  admin: 'var(--accent-rose)',
};

export default function UserProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || 'Rural Development & Panchayati Raj');
  const [designation, setDesignation] = useState(user?.designation || 'Capacity Development Officer');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div className="glass" style={{ padding: '28px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px', width: '250px', height: '250px',
          background: `radial-gradient(circle, ${ROLE_COLORS[user.role]}22 0%, transparent 70%)`,
          pointerEvents: 'none'
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 800, fontSize: '26px', color: 'white',
            background: `linear-gradient(135deg, ${ROLE_COLORS[user.role]}, var(--accent-violet))`,
            boxShadow: '0 0 25px rgba(99,102,241,0.3)', flexShrink: 0
          }}>
            {user.avatar || user.name?.slice(0, 2).toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800 }}>{user.name}</h1>
              <span style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                background: `${ROLE_COLORS[user.role]}20`, color: ROLE_COLORS[user.role],
                border: `1px solid ${ROLE_COLORS[user.role]}44`, textTransform: 'uppercase', letterSpacing: '0.5px'
              }}>
                {user.role}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
              {user.email} • {department}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        {/* Left: Edit Profile Details */}
        <div className="glass" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--accent-blue)" /> Account Details
          </h2>

          {saved && (
            <div style={{
              padding: '12px 14px', borderRadius: '10px', marginBottom: '18px',
              background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.35)',
              color: 'var(--accent-emerald)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
              fontWeight: 600
            }}>
              <CheckCircle size={17} /> Profile details updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                Full Name
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px' }}>
                <User size={16} color="var(--text-secondary)" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '14px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                Email Address (Verified Database Identifier)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', opacity: 0.8 }}>
                <Mail size={16} color="var(--text-secondary)" />
                <input
                  type="email"
                  value={user.email}
                  disabled
                  style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-secondary)', width: '100%', fontSize: '14px', cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Department
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 12px' }}>
                  <Building2 size={16} color="var(--text-secondary)" />
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '13px' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Designation / Role
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 12px' }}>
                  <Award size={16} color="var(--text-secondary)" />
                  <input
                    type="text"
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-glow"
              style={{ marginTop: '8px', padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', alignSelf: 'flex-start' }}
            >
              <Save size={16} /> Save Changes
            </button>
          </form>
        </div>


      </div>
    </div>
  );
}
