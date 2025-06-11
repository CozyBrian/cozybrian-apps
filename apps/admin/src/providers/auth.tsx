import React from "react";
import { wait } from "@cozy/utils"

export interface user {
  email: string;
  token: string;
}
export interface IAuthContext {
  isAuthenticated: boolean;
  login: (data: user) => Promise<void>;
  logout: () => Promise<void>;
  user: user | null;
}

const AuthContext = React.createContext<IAuthContext | null>(null);

const key = "admin.auth.user";

function getStoredUser() {
  const userData = localStorage.getItem(key);
  if (userData) {
    return JSON.parse(userData);
  } else {
    return null;
  }
}

function setStoredUser(user: user | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<user | null>(getStoredUser());
  const isAuthenticated = !!user;

  const logout = React.useCallback(async () => {
    await wait(250);

    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (data: user) => {
    await wait(500);

    setStoredUser(data);
    setUser(data);
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
