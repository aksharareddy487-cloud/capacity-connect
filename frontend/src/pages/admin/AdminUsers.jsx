import { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Shield, Filter, Edit, Trash2 } from 'lucide-react';

const SEED_USERS = [
  { id: 'user-admin-1', name: 'Dr. Ramesh Varma', email: 'admin@capacityconnect.gov.in', role: 'admin', department: 'Department of Administrative Reforms (DARPG)', designation: 'Chief Capacity Building Officer', status: 'Active' },
  { id: 'user-trainer-1', name: 'Prof. Sunita Deshmukh', email: 'trainer@capacityconnect.gov.in', role: 'trainer', department: 'National Institute of Smart Governance (NISG)', designation: 'Senior E-Governance Lead Trainer', status: 'Active' },
  { id: 'user-trainee-1', name: 'Aarav Sharma', email: 'trainee@capacityconnect.gov.in', role: 'trainee', department: 'Rural Development & Panchayati Raj', designation: 'Field Operations Assistant', status: 'Active' },
  { id: 'user-trainee-2', name: 'Ananya Patel', email: 'ananya@capacityconnect.gov.in', role: 'trainee', department: 'Health & Family Welfare', designation: 'Public Health Data Analyst', status: 'Active' },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(SEED_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.usersList) {
          setUsers(data.usersList);
        }
      })
      .catch(() => {});
  }, []);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role.toLowerCase() === roleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  return (
    <div className="fade-in" style={{ maxWidth: '1100px' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px' }}>
            User Management & <span className="gradient-text">RBAC Directory</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Central database directory of public administration accounts and role privileges.
          </p>
        </div>
        <button className="btn-glow" style={{ padding: '10px 18px', fontSize: '13px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <UserPlus size={16} /> Register New Account
        </button>
      </div>

      <div className="glass" style={{ padding: '16px', borderRadius: '16px', marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', flex: '1 1 300px' }}>
          <Search size={16} color="var(--text-secondary)" />
          <input
            placeholder="Search user by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '13px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Trainee', 'Trainer', 'Admin'].map(r => (
            <button key={r} onClick={() => setRoleFilter(r)} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', background: roleFilter === r ? 'linear-gradient(135deg, var(--accent-rose), var(--accent-violet))' : 'rgba(255,255,255,0.05)', color: roleFilter === r ? 'white' : 'var(--text-secondary)' }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>User Name & Email</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Department</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Assigned Role</th>
              <th style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '14px 20px', textAlign: 'right', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{u.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{u.email}</div>
                </td>
                <td style={{ padding: '14px 20px', fontSize: '13px', color: 'var(--text-secondary)' }}>{u.department}</td>
                <td style={{ padding: '14px 20px', fontSize: '13px', textTransform: 'capitalize', fontWeight: 600, color: u.role === 'admin' ? 'var(--accent-rose)' : u.role === 'trainer' ? 'var(--accent-blue)' : 'var(--accent-emerald)' }}>
                  {u.role}
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)' }}>
                    {u.status || 'Active'}
                  </span>
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', padding: '4px 8px' }}><Edit size={15} /></button>
                  <button style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', padding: '4px 8px' }}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
