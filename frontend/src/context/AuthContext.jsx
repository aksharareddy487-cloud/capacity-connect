import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = {
  trainee: {
    id: 1,
    name: 'Arjun Sharma',
    email: 'arjun.sharma@company.com',
    role: 'trainee',
    avatar: 'AS',
    department: 'Engineering',
    batch: 'Batch 2024-Q3',
  },
  trainer: {
    id: 2,
    name: 'Priya Nair',
    email: 'priya.nair@company.com',
    role: 'trainer',
    avatar: 'PN',
    department: 'Learning & Development',
    batches: ['Batch 2024-Q3', 'Batch 2024-Q4'],
  },
  admin: {
    id: 3,
    name: 'Rajan Mehta',
    email: 'rajan.mehta@company.com',
    role: 'admin',
    avatar: 'RM',
    department: 'HR Operations',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('capacity_connect_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('capacity_connect_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('capacity_connect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('capacity_connect_user');
      localStorage.removeItem('capacity_connect_token');
    }
  }, [user]);

  // Demo login
  const loginDemo = useCallback((role) => {
    const demoUser = DEMO_USERS[role] ?? DEMO_USERS.trainee;
    setUser(demoUser);
    setToken('demo_jwt_token_' + role);
    localStorage.setItem('capacity_connect_token', 'demo_jwt_token_' + role);
  }, []);

  // Real backend API login
  const loginApi = useCallback(async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
      const userData = {
        ...data.user,
        avatar: data.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      };
      setUser(userData);
      setToken(data.token);
      localStorage.setItem('capacity_connect_token', data.token);
      return { success: true, user: userData };
    } catch (err) {
      // Fallback: If demo email match or offline demo fallback
      if (email.includes('arjun') || email.includes('trainee')) {
        loginDemo('trainee');
        return { success: true, user: DEMO_USERS.trainee };
      } else if (email.includes('priya') || email.includes('trainer')) {
        loginDemo('trainer');
        return { success: true, user: DEMO_USERS.trainer };
      } else if (email.includes('rajan') || email.includes('admin')) {
        loginDemo('admin');
        return { success: true, user: DEMO_USERS.admin };
      }
      throw err;
    }
  }, [loginDemo]);

  // Real backend API signup
  const signupApi = useCallback(async ({ name, email, password, role, department }) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, department }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Registration failed');
      }
      const userData = {
        ...data.user,
        avatar: data.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      };
      setUser(userData);
      setToken(data.token);
      localStorage.setItem('capacity_connect_token', data.token);
      return { success: true, user: userData };
    } catch (err) {
      // Offline fallback: create local user session
      const newUser = {
        id: Date.now(),
        name,
        email,
        role: role || 'trainee',
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U',
        department: department || 'General',
      };
      setUser(newUser);
      setToken('local_token_' + Date.now());
      return { success: true, user: newUser };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('capacity_connect_user');
    localStorage.removeItem('capacity_connect_token');
  }, []);

  const switchRole = useCallback((role) => {
    const demoUser = DEMO_USERS[role] ?? DEMO_USERS.trainee;
    setUser(demoUser);
    setToken('demo_jwt_token_' + role);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, token, loginDemo, loginApi, signupApi, logout, switchRole, isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
