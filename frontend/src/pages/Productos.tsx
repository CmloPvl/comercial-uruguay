import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProductCard from "../components/products/ProductCard"

// Datos de ejemplo (simulando una API)
const productosData = [
  { id: 1, name: "Refrigerador Samsung", price: 450000 },
  { id: 2, name: "Lavadora LG", price: 320000 },
  { id: 3, name: "Microondas Oster", price: 180000 },
  { id: 4, name: "Licuadora Oster", price: 45000 },
  { id: 5, name: "Plancha Philips", price: 25000 },
  { id: 6, name: "Ventilador", price: 35000 },
]

export default function Productos() {
  const [productos, setProductos] = useState<typeof productosData>([])
  const [cargando, setCargando] = useState(true)
  const navigate = useNavigate()

  // Simular carga de datos con useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setProductos(productosData)
      setCargando(false)
    }, 1000) // Simula 1 segundo de carga

    return () => clearTimeout(timeout)
  }, [])

  if (cargando) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">⏳ Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-600">📦 Productos</h1>
        <button 
          onClick={() => navigate("/crear-publicacion")}
          className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
        >
          + Crear Publicación
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            name={producto.name}
            price={producto.price}
          />
        ))}
      </div>
    </div>
  )
}