import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const MOCK_USER: User = {
  id: '1',
  email: 'admin@example.com',
  name: 'John Doe',
  role: 'admin',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USER);

  const login = async (email: string, _password: string) => {
    // Mock login - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser({ ...MOCK_USER, email });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (email: string, _password: string, name: string) => {
    // Mock signup
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser({ ...MOCK_USER, email, name, role: 'user' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
