import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { adminService, type Product } from "../../services/adminService";

export default function AdminProductos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

const loadProducts = async () => {
  try {
    setLoading(true);
    setError(null);
const data = await adminService.getProducts(1, 50);
console.log("📦 AdminProductos - Datos recibidos:", data);
setProducts(data.data || []); // ✅ CORREGIDO
  } catch (err: any) {
    setError(err.message || "Error al cargar productos");
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <Layout title="Gestionar Productos">
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando productos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Gestionar Productos">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#603060]">📋 Gestionar Productos</h1>
          <Link to="/crear-publicacion">
            <Button className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold">
              ➕ Crear Producto
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6">
            ⚠️ {error}
          </div>
        )}

        {products.length === 0 ? (
          <Card className="border-2 border-[#00D2D3] shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-gray-500 font-medium">No hay productos creados</p>
              <Link to="/crear-publicacion" className="mt-4 inline-block text-[#7D5FFF] hover:underline">
                Crear el primer producto →
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-[#00D2D3] shadow-lg overflow-x-auto">
            <CardContent className="p-0">
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
                                // Implementar delete
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
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}