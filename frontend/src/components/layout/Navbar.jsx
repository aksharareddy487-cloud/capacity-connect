import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Search, ChevronDown, LogOut, Settings, User,
  Zap, Moon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ROLE_COLORS = {
  trainee: 'var(--accent-emerald)',
  trainer: 'var(--accent-blue)',
  admin: 'var(--accent-rose)',
};
const ROLE_LABELS = { trainee: 'Trainee', trainer: 'Trainer', admin: 'Admin' };

const notifications = [
  { id: 1, text: 'New course assigned: React Advanced', time: '2m ago', unread: true },
  { id: 2, text: 'Your quiz score: 92/100', time: '1h ago', unread: true },
  { id: 3, text: 'Batch 2024-Q3 session starting soon', time: '3h ago', unread: false },
];

export default function Navbar({ onToggleSidebar }) {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const unread = notifications.filter(n => n.unread).length;

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
        <span className="gradient-text" style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}>
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

      {/* Right: notifs + profile */}
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

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} style={{
            position: 'relative', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
            borderRadius: '10px', padding: '8px', cursor: 'pointer', color: 'var(--text-secondary)',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center',
          }}>
            <Bell size={18} />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px',
                borderRadius: '50%', background: 'var(--accent-rose)',
              }} className="pulse" />
            )}
          </button>
          {notifOpen && (
            <div className="glass fade-in" style={{
              position: 'absolute', right: 0, top: 'calc(100% + 12px)',
              width: '320px', zIndex: 200, padding: '12px',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '12px', padding: '0 4px' }}>
                Notifications ({unread} unread)
              </div>
              {notifications.map(n => (
                <div key={n.id} style={{
                  padding: '10px 12px', borderRadius: '10px', marginBottom: '6px',
                  background: n.unread ? 'rgba(99,102,241,0.09)' : 'transparent',
                  borderLeft: n.unread ? '3px solid var(--accent-blue)' : '3px solid transparent',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.4' }}>{n.text}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        {user && (
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }} style={{
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
                {/* Quick role switch */}
                <div style={{ padding: '4px 8px 8px', borderBottom: '1px solid var(--border)', marginBottom: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Switch Role</div>
                  {['trainee','trainer','admin'].map(r => (
                    <button key={r} onClick={() => { switchRole(r); setProfileOpen(false); navigate(`/${r}`); }} style={{
                      display: 'block', width: '100%', textAlign: 'left', padding: '6px 10px',
                      borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px',
                      background: user.role === r ? 'rgba(99,102,241,0.15)' : 'transparent',
                      color: user.role === r ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      fontWeight: user.role === r ? 600 : 400, marginBottom: '2px',
                    }}>
                      {ROLE_LABELS[r]}
                    </button>
                  ))}
                </div>
                {[
                  { icon: User, label: 'My Profile' },
                  { icon: Settings, label: 'Settings' },
                  { icon: Moon, label: 'Appearance' },
                ].map(({ icon: Icon, label }) => (
                  <button key={label} style={{
                    display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                    padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    background: 'none', color: 'var(--text-secondary)', fontSize: '13px',
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Icon size={15} /> {label}
                  </button>
                ))}
                <button onClick={handleLogout} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
                  padding: '8px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  background: 'none', color: 'var(--accent-rose)', fontSize: '13px',
                  borderTop: '1px solid var(--border)', marginTop: '4px',
                }}>
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
