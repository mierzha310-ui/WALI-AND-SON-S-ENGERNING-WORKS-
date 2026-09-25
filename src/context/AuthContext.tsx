/**
 * Authentication Context (Demo / Prototype Architecture)
 * 
 * SECURITY NOTICE:
 * This authentication module is built for frontend demo demonstration and state persistence
 * in LocalStorage. It is deliberately structured with standard auth interfaces (User, Token, Session)
 * so it can be seamlessly upgraded to Firebase Auth, Supabase Auth, or a JWT backend service.
 * In a true production environment, credentials must be validated via secure server-side tokens/cookies.
 */

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AdminUser, AuthSession } from '../types';
import { storageService } from '../services/storageService';

interface AuthContextType {
  session: AuthSession;
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo admin account configuration for local administrative testing
const DEMO_ADMIN: AdminUser = {
  id: 'admin-01',
  username: 'admin',
  email: 'admin@walisons.com',
  name: 'Wali Sons Admin',
  role: 'admin',
};

// Default prototype password: admin123
const DEMO_PASSWORD_HASH = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession>(() => storageService.getAuthSession());

  useEffect(() => {
    // Sync session on mount
    const saved = storageService.getAuthSession();
    if (saved && saved.isAuthenticated) {
      setSession(saved);
    }
  }, []);

  const login = useCallback(async (usernameOrEmail: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Artificial small delay to simulate auth network roundtrip
    await new Promise(res => setTimeout(res, 350));

    const cleanInput = usernameOrEmail.trim().toLowerCase();
    const isMatch = (cleanInput === DEMO_ADMIN.username.toLowerCase() || cleanInput === DEMO_ADMIN.email.toLowerCase()) &&
                    password === DEMO_PASSWORD_HASH;

    if (isMatch) {
      const newSession: AuthSession = {
        isAuthenticated: true,
        user: DEMO_ADMIN,
        token: `demo-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        loggedInAt: new Date().toISOString(),
      };
      storageService.setAuthSession(newSession);
      setSession(newSession);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid username or password. Default demo credentials: username "admin", password "admin123".',
    };
  }, []);

  const logout = useCallback(() => {
    storageService.clearAuthSession();
    setSession({
      isAuthenticated: false,
      user: null,
      token: null,
      loggedInAt: null,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        isAuthenticated: session.isAuthenticated,
        currentUser: session.user,
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
