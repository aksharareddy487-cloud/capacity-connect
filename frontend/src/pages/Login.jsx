import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap, Briefcase, Shield, ArrowRight, Zap, Mail, Lock, User, Building, UserPlus, LogIn, AlertCircle
} from 'lucide-react';

const DEMO_ROLES = [
  { key: 'trainee', label: 'Trainee', icon: GraduationCap, color: 'var(--accent-emerald)', path: '/trainee', desc: 'Explore courses & certificates' },
  { key: 'trainer', label: 'Trainer', icon: Briefcase, color: 'var(--accent-blue)', path: '/trainer', desc: 'Manage batches & analytics' },
  { key: 'admin', label: 'Admin', icon: Shield, color: 'var(--accent-rose)', path: '/admin', desc: 'Org capacity & user admin' },
];

export default function Login() {
  const { loginDemo, loginApi, signupApi } = useAuth();
  const navigate = useNavigate();

  // Tab state: 'login', 'signup', or 'demo'
  const [tab, setTab] = useState('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('trainee');
  const [department, setDepartment] = useState('Engineering');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle Sign In Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const result = await loginApi(email, password);
      navigate(`/${result.user.role || 'trainee'}`);
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const result = await signupApi({ name, email, password, role, department });
      navigate(`/${result.user.role || 'trainee'}`);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Quick Demo Click
  const handleDemoClick = (roleObj) => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      loginDemo(roleObj.key);
      navigate(roleObj.path);
    }, 400);
  };

  return (
    <div className="animated-bg" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{
        position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        top: '-100px', left: '-100px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        bottom: '-50px', right: '-80px', pointerEvents: 'none',
      }} />

      <div className="fade-in" style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px', margin: '0 auto 14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
            boxShadow: '0 0 40px rgba(99,102,241,0.4)',
          }}>
            <Zap size={30} color="white" />
          </div>
          <h1 className="gradient-text" style={{ fontSize: '30px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '6px' }}>
            CapacityConnect
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>
            Digital Capacity Building & Learning Management Portal
          </p>
        </div>

        {/* Card */}
        <div className="glass" style={{ padding: '28px', textAlign: 'left' }}>

          {/* Mode Switcher Tabs */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px',
            borderRadius: '12px', marginBottom: '24px', border: '1px solid var(--border)',
          }}>
            {[
              { id: 'login', label: 'Sign In', icon: LogIn },
              { id: 'signup', label: 'Sign Up', icon: UserPlus },
              { id: 'demo', label: 'Quick Demo', icon: Zap },
            ].map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setError(''); }}
                  style={{
                    flex: 1, padding: '9px 12px', borderRadius: '9px', border: 'none',
                    background: active ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))' : 'transparent',
                    color: active ? 'white' : 'var(--text-secondary)',
                    fontWeight: active ? 700 : 500, fontSize: '13px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={14} /> {t.label}
                </button>
              );
            })}
          </div>

          {/* Error Message Alert */}
          {error && (
            <div style={{
              padding: '12px', borderRadius: '10px', marginBottom: '18px',
              background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)',
              color: 'var(--accent-rose)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} /> {error}
            </div>
          )}

          {/* TAB 1: SIGN IN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Email Address
                </label>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '10px 14px',
                }}>
                  <Mail size={16} color="var(--text-secondary)" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Password
                </label>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  borderRadius: '10px', padding: '10px 14px',
                }}>
                  <Lock size={16} color="var(--text-secondary)" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '14px' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-glow"
                style={{ width: '100%', marginTop: '6px', padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? 'Authenticating…' : 'Sign In'} <ArrowRight size={16} />
              </button>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4px' }}>
                Don't have an account?{' '}
                <button type="button" onClick={() => setTab('signup')} style={{ color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Create Account
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SIGN UP FORM */}
          {tab === 'signup' && (
            <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Full Name *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px' }}>
                  <User size={16} color="var(--text-secondary)" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Email Address *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px' }}>
                  <Mail size={16} color="var(--text-secondary)" />
                  <input
                    type="email"
                    placeholder="rahul@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                  Password *
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px' }}>
                  <Lock size={16} color="var(--text-secondary)" />
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '14px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                    Role *
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    style={{
                      width: '100%', background: '#1a1d2e', border: '1px solid var(--border)',
                      borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
                    }}
                  >
                    <option value="trainee">Trainee</option>
                    <option value="trainer">Trainer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px', display: 'block' }}>
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    style={{
                      width: '100%', background: '#1a1d2e', border: '1px solid var(--border)',
                      borderRadius: '10px', padding: '10px 12px', color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
                    }}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Sales & Marketing">Sales & Marketing</option>
                    <option value="HR & Operations">HR & Operations</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-glow"
                style={{ width: '100%', marginTop: '6px', padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? 'Creating Account…' : 'Register Account'} <UserPlus size={16} />
              </button>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('login')} style={{ color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: QUICK DEMO LAUNCHER */}
          {tab === 'demo' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>Instant Role Launcher</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Click any role card to launch the live portal immediately without signing up.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {DEMO_ROLES.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.key}
                      onClick={() => handleDemoClick(r)}
                      disabled={loading}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px',
                        padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border)',
                        background: 'rgba(255,255,255,0.03)', cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${r.color}15`; e.currentTarget.style.borderColor = `${r.color}40`; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${r.color}22`, border: `1px solid ${r.color}44`,
                      }}>
                        <Icon size={20} color={r.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{r.label}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{r.desc}</div>
                      </div>
                      <ArrowRight size={15} color="var(--text-secondary)" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
