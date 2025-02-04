"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { fetchLogin, fetchLogout } from "@/api/client/auth";
import Router from "next/navigation";

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
  const router = Router.useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const data = await fetchLogin(email, password);
      if (!data || data.error) {
        throw new Error("User not found");
      }
      console.log("User logged in:", data);
      localStorage.setItem("auth_token", data.token);
      setUser(data);
      router.refresh();
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("auth_token");
      setUser(null);
      await fetchLogout();
      router.refresh();
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
