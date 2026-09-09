import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Start with no user logged in by default so app opens directly to /login
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('capacity_connect_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('capacity_connect_user');
      localStorage.removeItem('capacity_connect_token');
    }
  }, [user]);

  // Real backend database authentication only
  const loginApi = useCallback(async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(res.status === 404 ? 'API server endpoint not found.' : 'Server returned an invalid response.');
    }

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Invalid email or password.');
    }

    const userData = {
      ...data.user,
      avatar: data.user.name ? data.user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U',
    };
    setUser(userData);
    setToken(data.token);
    localStorage.setItem('capacity_connect_token', data.token);
    return { success: true, user: userData };
  }, []);

  // Real backend database signup - creates account without auto-logging in
  const signupApi = useCallback(async ({ name, email, password, role, department, designation, targetRole }) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, department, designation, targetRole }),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('Server returned an invalid response during registration.');
    }

    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Registration failed.');
    }

    return { success: true, message: data.message || 'Account registered successfully.', email: data.user?.email || email };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('capacity_connect_user');
    localStorage.removeItem('capacity_connect_token');
  }, []);

  return (
    <AuthContext.Provider value={{
      user, token, loginApi, signupApi, logout, isAuthenticated: !!user
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
