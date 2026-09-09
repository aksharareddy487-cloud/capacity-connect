import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, LogOut, User, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ROLE_COLORS = {
  trainee: 'var(--accent-emerald)',
  trainer: 'var(--accent-blue)',
  admin: 'var(--accent-rose)',
};
const ROLE_LABELS = { trainee: 'Trainee', trainer: 'Trainer', admin: 'Admin' };

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 'var(--navbar-h)',
      zIndex: 100, display: 'flex', alignItems: 'center', padding: '0 24px',
      background: 'rgba(15,17,23,0.9)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Left: hamburger + branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <button onClick={onToggleSidebar} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-secondary)', padding: '8px', borderRadius: '8px',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <Zap size={20} />
        </button>
        <span className="gradient-text" style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          CapacityConnect
        </span>
      </div>

      {/* Center: search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
        borderRadius: '12px', padding: '8px 16px', flex: '0 1 380px',
      }}>
        <Search size={16} color="var(--text-secondary)" />
        <input
          placeholder="Search courses, trainers, resources…"
          style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', flex: 1, fontSize: '14px' }}
        />
      </div>

      {/* Right: profile only */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-end', position: 'relative' }}>

        {/* Role badge */}
        {user && (
          <span style={{
            padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
            background: `${ROLE_COLORS[user.role]}22`,
            color: ROLE_COLORS[user.role],
            border: `1px solid ${ROLE_COLORS[user.role]}44`,
          }}>
            {ROLE_LABELS[user.role]}
          </span>
        )}

        {/* Profile dropdown */}
        {user && (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProfileOpen(o => !o)} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '6px 12px 6px 6px', cursor: 'pointer',
              transition: 'all 0.2s', color: 'var(--text-primary)',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: 700, fontSize: '13px',
                background: `linear-gradient(135deg, ${ROLE_COLORS[user.role]}, var(--accent-violet))`,
              }}>
                {user.avatar}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{user.department}</div>
              </div>
              <ChevronDown size={14} color="var(--text-secondary)" />
            </button>

            {profileOpen && (
              <div className="glass fade-in" style={{
                position: 'absolute', right: 0, top: 'calc(100% + 12px)',
                width: '220px', zIndex: 200, padding: '8px', overflow: 'hidden',
              }}>
                <div style={{ padding: '8px 12px 12px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{user.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{user.email}</div>
                </div>

                <button
                  onClick={() => { navigate('/profile'); setProfileOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                    padding: '9px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: 'none', color: 'var(--text-secondary)', fontSize: '13px',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <User size={15} /> My Profile
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                    padding: '9px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: 'none', color: 'var(--accent-rose)', fontSize: '13px',
                    borderTop: '1px solid var(--border)', marginTop: '4px',
                  }}
                >
                  <LogOut size={15} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
