import { createContext, useContext, useState, type ReactNode, useEffect } from "react";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  fullName: string;
  email: string;
  phone?: string;
  role: "CLIENTE" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: { 
    fullName: string; 
    email: string; 
    password: string; 
    phone?: string; 
    address?: string;
    termsAccepted?: boolean;  // ✅ NUEVO
  }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const register = async (userData: { 
    fullName: string; 
    email: string; 
    password: string; 
    phone?: string; 
    address?: string;
    termsAccepted?: boolean;  // ✅ NUEVO
  }) => {
    try {
      // Envía los datos al backend incluyendo termsAccepted
      await api.post("/auth/register", userData);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error al registrar usuario");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}