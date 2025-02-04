"use client";

import { createContext, useContext, useState } from "react";
import { User } from "@/types/auth";
import { fetchLogin, fetchLogout } from "@/api/client/auth";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const data = await fetchLogin(email, password);
      if (!data || data.error) {
        throw new Error("User not found");
      }
      localStorage.setItem("auth_token", data.token);
      setUser(data);
      console.log("User logged in: ", data);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("auth_token");
      setUser(null);
      await fetchLogout();
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
