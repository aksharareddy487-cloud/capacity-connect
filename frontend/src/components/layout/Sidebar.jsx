import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, ClipboardList, Award, Calendar,
  Users, BarChart3, Shield, Database,
  ChevronLeft, ChevronRight, GraduationCap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV = {
  trainee: [
    { to: '/trainee', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/trainee/courses', icon: BookOpen, label: 'My Courses' },
    // { to: '/trainee/sessions', icon: Calendar, label: 'Sessions' },
    // { to: '/trainee/progress', icon: BarChart3, label: 'Progress' },
    // { to: '/trainee/certificates', icon: Award, label: 'Certificates' },
  ],
  trainer: [
    { to: '/trainer', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/trainer/batches', icon: Users, label: 'My Batches' },
    { to: '/trainer/courses', icon: BookOpen, label: 'Course Library' },
    { to: '/trainer/attendance', icon: ClipboardList, label: 'Attendance' },
    { to: '/trainer/analytics', icon: BarChart3, label: 'Analytics' },
  ],
  admin: [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/capacity', icon: Database, label: 'Capacity Planning' },
    { to: '/admin/departments', icon: Shield, label: 'Departments' },
    { to: '/admin/reports', icon: BarChart3, label: 'Reports' },
  ],
};

const ROLE_COLORS = {
  trainee: 'var(--accent-emerald)',
  trainer: 'var(--accent-blue)',
  admin: 'var(--accent-rose)',
};

export default function Sidebar({ collapsed, onCollapse }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const navItems = NAV[user?.role] ?? [];

  return (
    <aside style={{
      position: 'fixed', top: 'var(--navbar-h)', left: 0,
      bottom: 0, zIndex: 90,
      width: collapsed ? '64px' : 'var(--sidebar-w)',
      transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
      background: 'rgba(26,29,46,0.95)', backdropFilter: 'blur(20px)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Role header */}
      <div style={{
        padding: collapsed ? '20px 12px' : '20px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '12px',
        transition: 'padding 0.25s',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(135deg, ${ROLE_COLORS[user?.role] ?? '#6366f1'}, var(--accent-violet))`,
        }}>
          <GraduationCap size={18} color="white" />
        </div>
        {!collapsed && (
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              {user?.name ?? 'User'}
            </div>
            <div style={{ fontSize: '11px', color: ROLE_COLORS[user?.role], fontWeight: 600, textTransform: 'capitalize' }}>
              {user?.role}
            </div>
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: collapsed ? '12px 8px' : '12px', overflowY: 'auto' }}>
        {!collapsed && (
          <div style={{ fontSize: '10px', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: 700, padding: '8px 12px 4px', textTransform: 'uppercase' }}>
            Navigation
          </div>
        )}
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/trainee' || to === '/trainer' || to === '/admin'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: collapsed ? '10px' : '10px 12px',
              borderRadius: '10px', textDecoration: 'none', marginBottom: '4px',
              color: isActive ? 'white' : 'var(--text-secondary)',
              background: isActive ? `linear-gradient(135deg, ${ROLE_COLORS[user?.role]}33, var(--accent-violet)33)` : 'transparent',
              borderLeft: isActive ? `3px solid ${ROLE_COLORS[user?.role]}` : '3px solid transparent',
              fontWeight: isActive ? 600 : 400,
              fontSize: '14px',
              transition: 'all 0.15s',
              justifyContent: collapsed ? 'center' : 'flex-start',
              whiteSpace: 'nowrap', overflow: 'hidden',
              title: collapsed ? label : undefined,
            })}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}


      </nav>

      {/* Collapse toggle */}
      <button onClick={onCollapse} style={{
        margin: '12px', padding: '8px', borderRadius: '10px', border: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.04)', cursor: 'pointer', color: 'var(--text-secondary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
      }}>
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
