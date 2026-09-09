import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowRight, Zap, Mail, Lock, User, UserPlus, LogIn, AlertCircle, CheckCircle, Database
} from 'lucide-react';

export default function Login() {
  const { loginApi, signupApi } = useAuth();
  const navigate = useNavigate();

  // ONLY 2 Tabs: 'login' or 'signup'
  const [tab, setTab] = useState('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('trainee');
  const [department, setDepartment] = useState('Rural Development & Panchayati Raj');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Sign In Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      const result = await loginApi(email, password);
      navigate(`/${result.user.role || 'trainee'}`);
    } catch (err) {
      setError(err.message || 'Login failed. Account not found or password incorrect.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Sign Up Submit -> Navigates to Sign In tab with success message
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const result = await signupApi({ name, email, password, role, department });
      setSuccessMsg('Account created successfully in database! Please sign in with your credentials.');
      setTab('login');
      setPassword('');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const fillCredential = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setSuccessMsg('');
  };

  return (
    <div className="animated-bg" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background Orbs */}
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

      <div className="fade-in" style={{ width: '100%', maxWidth: '460px', textAlign: 'center' }}>
        {/* Logo Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))',
            boxShadow: '0 0 35px rgba(99,102,241,0.4)',
          }}>
            <Zap size={28} color="white" />
          </div>
          <h1 className="gradient-text" style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>
            CapacityConnect
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            National Public Sector Capacity Building Portal
          </p>
        </div>

        {/* Form Container Glass */}
        <div className="glass" style={{ padding: '28px', textAlign: 'left' }}>

          {/* EXACTLY 2 TABS: Sign In and Sign Up */}
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '4px',
            borderRadius: '12px', marginBottom: '20px', border: '1px solid var(--border)',
          }}>
            {[
              { id: 'login', label: 'Sign In', icon: LogIn },
              { id: 'signup', label: 'Sign Up', icon: UserPlus },
            ].map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setError(''); setSuccessMsg(''); }}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '9px', border: 'none',
                    background: active ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-violet))' : 'transparent',
                    color: active ? 'white' : 'var(--text-secondary)',
                    fontWeight: active ? 700 : 500, fontSize: '13px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    transition: 'all 0.2s',
                  }}
                >
                  <Icon size={15} /> {t.label}
                </button>
              );
            })}
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div style={{
              padding: '12px 14px', borderRadius: '10px', marginBottom: '18px',
              background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.35)',
              color: 'var(--accent-emerald)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
              fontWeight: 600
            }}>
              <CheckCircle size={17} style={{ flexShrink: 0 }} /> {successMsg}
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div style={{
              padding: '12px 14px', borderRadius: '10px', marginBottom: '18px',
              background: 'rgba(244,63,94,0.14)', border: '1px solid rgba(244,63,94,0.35)',
              color: 'var(--accent-rose)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
              fontWeight: 600
            }}>
              <AlertCircle size={17} style={{ flexShrink: 0 }} /> {error}
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
                    placeholder="e.g. trainee@capacityconnect.gov.in"
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
                style={{ width: '100%', marginTop: '4px', padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? 'Verifying with Database…' : 'Sign In'} <ArrowRight size={16} />
              </button>

              {/* Database Seeded Credentials Reference */}
              <div style={{
                marginTop: '12px', padding: '12px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', fontSize: '11px',
              }}>
                <div style={{ fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Database size={13} /> Seeded Database Accounts:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <button type="button" onClick={() => fillCredential('trainee@capacityconnect.gov.in', 'trainee123')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', fontSize: '11px' }}>
                    🟢 <strong>Trainee:</strong> trainee@capacityconnect.gov.in (pass: trainee123)
                  </button>
                  <button type="button" onClick={() => fillCredential('trainer@capacityconnect.gov.in', 'trainer123')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', fontSize: '11px' }}>
                    🔵 <strong>Trainer:</strong> trainer@capacityconnect.gov.in (pass: trainer123)
                  </button>
                  <button type="button" onClick={() => fillCredential('admin@capacityconnect.gov.in', 'admin123')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', textAlign: 'left', cursor: 'pointer', fontSize: '11px' }}>
                    🔴 <strong>Admin:</strong> admin@capacityconnect.gov.in (pass: admin123)
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '4px' }}>
                Need a new account?{' '}
                <button type="button" onClick={() => { setTab('signup'); setError(''); setSuccessMsg(''); }} style={{ color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Create Account via Sign Up
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
                    placeholder="e.g. Ramesh Kumar"
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
                    placeholder="ramesh@gov.in"
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
                    placeholder="Create a secure password"
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
                    <option value="Rural Development & Panchayati Raj">Rural Development</option>
                    <option value="Department of Administrative Reforms (DARPG)">DARPG</option>
                    <option value="National Institute of Smart Governance (NISG)">NISG</option>
                    <option value="Health & Family Welfare">Health & Welfare</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-glow"
                style={{ width: '100%', marginTop: '4px', padding: '12px', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? 'Saving to Database…' : 'Register Account'} <UserPlus size={16} />
              </button>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Already registered?{' '}
                <button type="button" onClick={() => { setTab('login'); setError(''); setSuccessMsg(''); }} style={{ color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Sign In
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
