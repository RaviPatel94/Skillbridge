// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI } from '@/lib/auth-api';
import { User, SignUpRequest, SignInRequest, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedToken = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('auth_user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Verify token is still valid by fetching current user
        try {
          const currentUser = await authAPI.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          // Token is invalid, clear storage
          clearAuth();
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  };

  const saveAuth = (token: string, user: User, refreshToken?: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    setToken(token);
    setUser(user);
  };

  const clearAuth = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('refresh_token');
    setToken(null);
    setUser(null);
  };

  const signUp = async (data: SignUpRequest) => {
    setIsLoading(true);
    try {
      const response = await authAPI.signUp(data);
      saveAuth(response.token, response.user, response.refreshToken);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (data: SignInRequest) => {
    setIsLoading(true);
    try {
      const response = await authAPI.signIn(data);
      saveAuth(response.token, response.user, response.refreshToken);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authAPI.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      clearAuth();
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authAPI.refreshToken();
      saveAuth(response.token, response.user, response.refreshToken);
    } catch (error) {
      clearAuth();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    signUp,
    signIn,
    signOut,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}