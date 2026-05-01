import { createContext, useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface Auth {
  isConnected: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const login = () => {
    setIsConnected(true);
  };

  const logout = () => {
    setIsConnected(false);
    qc.clear();
  };

  return <AuthContext.Provider value={{ isConnected, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
