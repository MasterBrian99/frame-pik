import * as React from "react";
import { flushSync } from "react-dom";
import { jwtDecode } from "jwt-decode";

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

export interface AuthUserType {
  userId: number;
  type: string;
  role: string;
  iat: number;
  exp: number;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = "auth.token";

function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  const isAuthenticated = !!user;
  const logout = React.useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (username: string) => {
    const tokeData: AuthUserType = jwtDecode(username);
    console.log(tokeData);

    flushSync(() => {
      setStoredUser(username);
      setUser(username);
    });
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
