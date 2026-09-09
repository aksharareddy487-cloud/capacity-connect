import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarW = collapsed ? '64px' : '260px';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar onToggleSidebar={() => setCollapsed(c => !c)} />
      <Sidebar collapsed={collapsed} onCollapse={() => setCollapsed(c => !c)} />
      <main style={{
        marginLeft: sidebarW,
        paddingTop: 'var(--navbar-h)',
        minHeight: '100vh',
        transition: 'margin-left 0.25s cubic-bezier(0.4,0,0.2,1)',
        padding: `calc(var(--navbar-h) + 24px) 28px 40px calc(${sidebarW} + 28px)`,
      }}>
        <Outlet />
      </main>
    </div>
  );
}
