import { createContext, useContext, useState, ReactNode } from "react"

// Tipos
interface User {
  id: number
  name: string
  email: string
  role: "CLIENTE" | "ADMIN"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  isAuthenticated: boolean
}

// Crear el Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    // Simulación de login (después será real)
    setUser({
      id: 1,
      name: "María Pérez",
      email: email,
      role: "CLIENTE",
    })
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el Context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}