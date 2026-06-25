interface ProductCardProps {
  name: string
  price: number
  image?: string
}

export default function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <div className="h-32 bg-gray-200 rounded flex items-center justify-center mb-3">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover rounded" />
        ) : (
          <span className="text-gray-400">📷 Imagen</span>
        )}
      </div>
      <h3 className="font-semibold text-lg">{name}</h3>
      <p className="text-blue-600 font-bold">${price.toLocaleString()}</p>
    </div>
  )
}