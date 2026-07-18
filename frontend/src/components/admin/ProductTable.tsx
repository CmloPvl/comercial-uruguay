import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { Product } from "../../services/adminService";

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  loading?: boolean;
}

export default function ProductTable({ products, onDelete, loading = false }: ProductTableProps) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7D5FFF] mx-auto"></div>
        <p className="text-gray-500 mt-2">Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-4xl mb-3">📦</p>
        <p className="text-gray-500 font-medium">No hay productos creados</p>
        <Link to="/crear-publicacion" className="mt-4 inline-block text-[#7D5FFF] hover:underline">
          Crear el primer producto →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-[#F0F0C0]/30 to-[#F0C0F0]/30">
            <th className="text-left py-3 px-4 font-bold text-[#603060]">Producto</th>
            <th className="text-left py-3 px-4 font-bold text-[#603060]">SKU</th>
            <th className="text-left py-3 px-4 font-bold text-[#603060]">Precio</th>
            <th className="text-left py-3 px-4 font-bold text-[#603060]">Stock</th>
            <th className="text-left py-3 px-4 font-bold text-[#603060]">Estado</th>
            <th className="text-left py-3 px-4 font-bold text-[#603060]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
              <td className="py-3 px-4 font-medium text-[#303030]">{product.name}</td>
              <td className="py-3 px-4 text-gray-500">{product.sku}</td>
              <td className="py-3 px-4 font-bold text-[#603060]">
                ${Number(product.price).toLocaleString('es-CL')}
              </td>
              <td className="py-3 px-4">
                <Badge className={product.stock > 10 ? 'bg-[#90C090] text-white' : product.stock > 0 ? 'bg-[#FFD93D] text-[#303030]' : 'bg-[#FF6B81] text-white'}>
                  {product.stock > 0 ? `${product.stock} unidades` : 'Sin stock'}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Badge className={product.isActive ? 'bg-[#00D2D3] text-white' : 'bg-gray-400 text-white'}>
                  {product.isActive ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <Link to={`/admin/productos/${product.id}/editar`}>
                    <Button variant="outline" size="sm" className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3]/10">
                      ✏️
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10"
                    onClick={() => {
                      if (confirm('¿Eliminar este producto?')) {
                        onDelete(product.id);
                      }
                    }}
                  >
                    🗑️
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}