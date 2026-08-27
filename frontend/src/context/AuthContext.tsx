// 📁 frontend/src/context/AuthContext.tsx

/**
 * 📌 AUTH CONTEXT
 * 
 * Contexto global de autenticación.
 * Provee el estado del usuario y funciones de autenticación.
 * 
 * ✅ Buenas prácticas:
 * - Contexto tipado con TypeScript
 * - Persistencia de sesión con localStorage
 * - Manejo de errores consistente
 * - Separación de responsabilidades
 * - login() devuelve el usuario para redirección inmediata
 */

import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import api from "../services/api";

// =============================================
// 📌 INTERFAZ DE USUARIO
// =============================================

interface User {
  id: number;
  name: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  role: "CLIENTE" | "ADMIN";
  createdAt?: string;
}

// =============================================
// 📌 INTERFAZ DEL CONTEXTO
// =============================================

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User>; // ✅ Ahora devuelve User
  register: (userData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    termsAccepted?: boolean;
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

// =============================================
// 🎯 CONTEXTO
// =============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================
// 🧠 PROVIDER
// =============================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // =============================================
  // 💾 CARGAR SESIÓN GUARDADA
  // =============================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // =============================================
  // 🔐 LOGIN
  // =============================================
  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      
      return user; // ✅ Devuelve el usuario para redirección inmediata
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  // =============================================
  // 📝 REGISTER
  // =============================================
  const register = async (userData: {
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    termsAccepted?: boolean;
  }) => {
    try {
      await api.post("/auth/register", userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  // =============================================
  // 🚪 LOGOUT
  // =============================================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // =============================================
  // 🔍 ESTADO DE AUTENTICACIÓN
  // =============================================
  const isAuthenticated = user !== null;

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// =============================================
// 🪝 HOOK PERSONALIZADO
// =============================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}