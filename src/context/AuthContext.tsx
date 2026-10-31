import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, phone: string, password?: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updatedData: Partial<User>) => void;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; message: string }>;
}

const DEFAULT_ADMIN: User = {
  id: 'usr-admin-1',
  name: 'Alexander Sterling (GM)',
  email: 'admin@hotelpro.com',
  phone: '+1 (800) 555-0199',
  role: 'admin',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  createdAt: '2026-01-01T00:00:00Z'
};

const DEFAULT_GUEST: User = {
  id: 'usr-guest-1',
  name: 'Eleanor Vance',
  email: 'guest@hotelpro.com',
  phone: '+1 (555) 234-5678',
  role: 'guest',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
  createdAt: '2026-04-12T10:00:00Z'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('hotelpro_auth_user');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load user', e);
    }
    // Default to the guest session so the user has immediate rich interactive access
    return DEFAULT_GUEST;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('hotelpro_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hotelpro_auth_user');
    }
  }, [user]);

  const login = async (email: string, _password?: string): Promise<{ success: boolean; error?: string }> => {
    // Quick demo accounts or registered user check
    const normalized = email.trim().toLowerCase();
    if (normalized === 'admin@hotelpro.com' || normalized.includes('admin')) {
      setUser(DEFAULT_ADMIN);
      return { success: true };
    }

    if (normalized === 'guest@hotelpro.com' || normalized === 'eleanor.vance@example.com') {
      setUser(DEFAULT_GUEST);
      return { success: true };
    }

    // Custom user login
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: normalized,
      phone: '+1 (555) 000-1234',
      role: 'guest',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return { success: true };
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    _password?: string,
    role: UserRole = 'guest'
  ): Promise<{ success: boolean; error?: string }> => {
    if (!name || !email) {
      return { success: false, error: 'Name and email are required.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email: email.trim().toLowerCase(),
      phone: phone || '+1 (555) 000-0000',
      role: role || (email.toLowerCase().includes('admin') ? 'admin' : 'guest'),
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      setUser(DEFAULT_ADMIN);
    } else {
      setUser(DEFAULT_GUEST);
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    setUser(updated);
  };

  const resetPasswordRequest = async (email: string): Promise<{ success: boolean; message: string }> => {
    // Simulate secure reset link generation
    return {
      success: true,
      message: `A secure password reset link has been dispatched to ${email}. Check your inbox within 5 minutes.`
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
        resetPasswordRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
