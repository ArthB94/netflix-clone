"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { fetchLogin, fetchLogout, fetchMe } from "@/api/auth";
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

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await fetchMe();
        if (!data || data.error || !data.username) {
          throw new Error("User not found");
        }
        setUser(data);
      } catch (error) {
        setUser(null);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await fetchLogin(email, password);
      setUser(data); // Met à jour l'utilisateur après connexion
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetchLogout();
      setUser(null); // Supprime l'utilisateur après déconnexion
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
