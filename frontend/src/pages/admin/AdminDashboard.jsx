import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Building2, Shield, AlertTriangle, CheckCircle, Globe } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, sub, trend }) => (
  <div className="glass fade-in" style={{ padding: '22px', borderRadius: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${color}22` }}>
        <Icon size={22} color={color} />
      </div>
      {trend && (
        <span style={{ fontSize: '11px', color: trend > 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)', fontWeight: 700, padding: '3px 8px', background: trend > 0 ? 'rgba(16,185,129,0.12)' : 'rgba(244,63,94,0.12)', borderRadius: '20px' }}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1, marginBottom: '4px' }}>{value}</div>
    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</div>
    {sub && <div style={{ fontSize: '11px', color, marginTop: '4px', fontWeight: 600 }}>{sub}</div>}
  </div>
);

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
          if (data.usersList) setUsersList(data.usersList);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalUsers = stats?.totalUsers ?? usersList.length ?? 4;
  const trainedUsers = stats?.totalEnrollments ?? 3;
  const activeCoursesCount = stats?.totalCourses ?? 6;

  const departments = [
    { name: 'Department of Administrative Reforms (DARPG)', total: 120, trained: 96, color: 'var(--accent-blue)' },
    { name: 'National Institute of Smart Governance (NISG)', total: 45, trained: 38, color: 'var(--accent-violet)' },
    { name: 'Rural Development & Panchayati Raj', total: 80, trained: 52, color: 'var(--accent-amber)' },
    { name: 'Health & Family Welfare', total: 35, trained: 31, color: 'var(--accent-emerald)' },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '6px' }}>
          Admin Console, <span className="gradient-text">{user?.name || 'Dr. Ramesh Varma'} 👋</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          <strong style={{ color: 'var(--accent-rose)' }}>Live Database Overview</strong> — {totalUsers} registered staff across public sector departments
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <StatCard icon={Users} label="Total Users in DB" value={totalUsers} color="var(--accent-blue)" trend={10} />
        <StatCard icon={CheckCircle} label="Active Enrollments" value={trainedUsers} color="var(--accent-emerald)" sub="Live DB Synced" trend={15} />
        <StatCard icon={AlertTriangle} label="Active Courses" value={activeCoursesCount} color="var(--accent-amber)" sub="Accredited Modules" />
        <StatCard icon={Shield} label="System Roles" value="3" color="var(--accent-violet)" sub="Trainee, Trainer, Admin" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Department capacity */}
          <div className="glass" style={{ padding: '22px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={18} color="var(--accent-blue)" /> Department Capacity Distribution
            </h2>
            {departments.map(d => {
              const pct = Math.round((d.trained / d.total) * 100);
              return (
                <div key={d.name} style={{ marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div>
                      <span style={{ fontWeight: 600, fontSize: '13px' }}>{d.name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '8px' }}>{d.trained}/{d.total} trained</span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '14px', color: d.color }}>{pct}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '6px', height: '8px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${pct}%`, height: '100%',
                      background: `linear-gradient(90deg, ${d.color}, ${d.color}bb)`,
                      borderRadius: '6px', transition: 'width 1s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* User management table */}
          <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '18px 20px 14px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={17} color="var(--accent-violet)" /> Registered Database Accounts
              </h2>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Name & Email', 'Department', 'Role', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usersList.map((u, i) => (
                  <tr key={u.id || u.name} style={{ borderBottom: i < usersList.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{u.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '12px 18px', fontSize: '12px', color: 'var(--text-secondary)' }}>{u.department}</td>
                    <td style={{ padding: '12px 18px', fontSize: '12px', textTransform: 'capitalize', fontWeight: 600, color: u.role === 'admin' ? 'var(--accent-rose)' : u.role === 'trainer' ? 'var(--accent-blue)' : 'var(--accent-emerald)' }}>{u.role}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 9px', borderRadius: '20px', background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)' }}>
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass" style={{ padding: '20px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(139,92,246,0.08))' }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <Globe size={16} color="var(--accent-rose)" /> Org Capacity Index
            </div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>78%</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Capacity target index reached</div>
          </div>
        </div>
      </div>
    </div>
  );
}
