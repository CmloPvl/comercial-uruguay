import ProductCard from "../components/products/ProductCard"

// Datos de ejemplo
const productos = [
  { id: 1, name: "Refrigerador Samsung", price: 450000 },
  { id: 2, name: "Lavadora LG", price: 320000 },
  { id: 3, name: "Microondas Oster", price: 180000 },
  { id: 4, name: "Licuadora Oster", price: 45000 },
  { id: 5, name: "Plancha Philips", price: 25000 },
  { id: 6, name: "Ventilador", price: 35000 },
]

export default function Productos() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">📦 Productos</h1>
      <p className="text-gray-600 mb-4">Catálogo de productos</p>
      
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