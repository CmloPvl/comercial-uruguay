import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

interface User {
  id: number
  name: string
  fullName: string
  email: string
  phone?: string
  role: "CLIENTE" | "ADMIN"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  register: (userData: Omit<User, "id"> & { password: string }) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email: string, password: string) => {
    // Buscar usuario en localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = storedUsers.find((u: any) => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      console.log("✅ Login exitoso:", userWithoutPassword)
    } else {
      // Fallback: usuario demo
      if (email === "demo@comercialuruguay.cl" && password === "demo123") {
        const demoUser = {
          id: 1,
          name: "María Pérez",
          fullName: "María Pérez",
          email: email,
          phone: "+56 9 1234 5678",
          role: "CLIENTE" as const,
        }
        setUser(demoUser)
        localStorage.setItem("user", JSON.stringify(demoUser))
        console.log("✅ Login con demo:", demoUser)
      } else {
        throw new Error("Credenciales incorrectas")
      }
    }
  }

  const register = (userData: Omit<User, "id"> & { password: string }) => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    
    // Verificar si el email ya existe
    if (storedUsers.some((u: any) => u.email === userData.email)) {
      throw new Error("El correo ya está registrado")
    }

    const newUser = {
      ...userData,
      id: Date.now(),
    }
    
    storedUsers.push(newUser)
    localStorage.setItem("users", JSON.stringify(storedUsers))
    console.log("✅ Usuario registrado:", newUser)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}