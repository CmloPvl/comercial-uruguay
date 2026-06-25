import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Perfil() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No has iniciado sesión</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ir a Login
        </button>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">👤 Mi Perfil</h1>
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <p><span className="font-semibold">Nombre:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Rol:</span> {user.role}</p>
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  )
}