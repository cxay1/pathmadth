import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface UserProfile {
  id?: string;
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: 'job_seeker' | 'employer' | 'admin';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Token storage helpers
const getStoredToken = (): string | null => {
  try { return localStorage.getItem('token'); } catch { return null; }
};
const setStoredToken = (token: string): void => {
  try { localStorage.setItem('token', token); } catch {}
};
const removeStoredToken = (): void => {
  try { localStorage.removeItem('token'); } catch {}
};

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

// Tolerant payload decode: supports base64 JSON or JWT
const decodePayload = (token: string): any | null => {
  try {
    if (!token) return null;
    let payloadPart = token;
    if (token.includes('.')) {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      payloadPart = parts[1];
    }
    let base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad === 2) base64 += '==';
    else if (pad === 3) base64 += '=';
    else if (pad !== 0) base64 += '===';
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    // Try raw base64 JSON (server returns a single-chunk base64 sometimes)
    try {
      const json = atob(token);
      return JSON.parse(json);
    } catch {
      return null;
    }
  }
};

const isExpired = (payload: any): boolean => {
  if (!payload) return true;
  const now = Date.now() / 1000;
  const exp = typeof payload.exp === 'number' ? payload.exp : (
    typeof payload.iat === 'number' ? payload.iat + 24 * 60 * 60 : now - 1
  );
  return exp < now;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    removeStoredToken();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const fetchUserProfile = async (token: string): Promise<UserProfile | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return null;
      const body = await res.json();
      const u = body.user || body;
      return {
        id: u.id,
        userId: u.user_id || u.userId,
        email: u.email,
        firstName: u.first_name || u.firstName,
        lastName: u.last_name || u.lastName,
        role: u.role,
      };
    } catch {
      return null;
    }
  };

  const login = async (token: string): Promise<void> => {
    setError(null);
    if (!token || typeof token !== 'string') {
      setError('Invalid token provided');
      throw new Error('Invalid token provided');
    }
    const payload = decodePayload(token);
    if (isExpired(payload)) {
      setError('Token has expired');
      throw new Error('Token has expired');
    }
    setStoredToken(token);
    const profile = await fetchUserProfile(token);
    if (profile) {
      setUser(profile);
      setIsAuthenticated(true);
      return;
    }
    if (payload) {
      setUser({
        id: payload.userId || payload.sub,
        userId: payload.userId || payload.sub,
        email: payload.email,
        role: payload.role || 'job_seeker',
      });
      setIsAuthenticated(true);
      return;
    }
    setError('Login failed');
    logout();
    throw new Error('Login failed');
  };

  useEffect(() => {
    (async () => {
      const token = getStoredToken();
      if (!token) { setLoading(false); return; }
      const payload = decodePayload(token);
      if (isExpired(payload)) { logout(); setLoading(false); return; }
      const profile = await fetchUserProfile(token);
      if (profile) {
        setUser(profile);
        setIsAuthenticated(true);
      } else if (payload) {
        setUser({ id: payload.userId || payload.sub, userId: payload.userId || payload.sub, email: payload.email, role: payload.role || 'job_seeker' });
        setIsAuthenticated(true);
      } else {
        logout();
      }
      setLoading(false);
    })();
  }, [logout]);

  const value: AuthContextType = { isAuthenticated, user, login, logout, loading, error };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}; 