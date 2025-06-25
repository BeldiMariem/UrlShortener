import React, { createContext, useState, ReactNode } from "react";
import { ILoginPayload, IRegisterPayload, IUser } from "../domain/models/User";
import { login as loginUser, register as registerUser } from "../application/usecases/auth/authUseCases";
import { logout as logoutAPI } from "../application/usecases/auth/authUseCases";

interface AuthContextProps {
  user: IUser | null;
  login: (payload: ILoginPayload) => Promise<void>;
  register: (payload: IRegisterPayload) => Promise<void>;
  isAuthenticated: boolean;  // <-- Add this
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (payload: ILoginPayload) => {
    const u = await loginUser(payload);
    setUser(u);
  };

  const register = async (payload: IRegisterPayload) => {
    const u = await registerUser(payload);
    setUser(u);
  };

  // Provide isAuthenticated boolean based on user state
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
export const logout = async () => {
  try {
    await logoutAPI();
  } catch (err) {
    console.error("Logout error", err);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};