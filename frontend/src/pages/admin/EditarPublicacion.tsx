import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Badge } from "../../components/ui/badge";
import { productService } from "../../services/productService";
import ProductForm from "../../components/admin/ProductForm";
import { useAuth } from "../../context/AuthContext";

export default function EditarPublicacion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductById(id!);
      setProduct(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (productData: any) => {
    try {
      setSubmitting(true);
      await productService.updateProduct(id!, productData);
      alert("✅ Producto actualizado exitosamente");
      navigate("/admin/productos");
    } catch (err: any) {
      alert("❌ Error al actualizar: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Verificar si es admin
  if (user?.role !== "ADMIN") {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <Badge className="bg-[#FF6B81] text-white">🚫 Acceso Denegado</Badge>
            <p className="text-gray-500 mt-2">No tienes permisos para editar publicaciones.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando producto...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <Badge className="bg-[#FF6B81] text-white">❌ Error</Badge>
            <p className="text-gray-500 mt-2">{error || "Producto no encontrado"}</p>
            <button
              onClick={() => navigate("/admin/productos")}
              className="mt-4 text-[#7D5FFF] hover:underline"
            >
              Volver a productos
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Badge className="bg-[#FFD93D] text-[#303030] mb-2">✏️ Editar Producto</Badge>
        <h1 className="text-3xl font-extrabold text-[#603060]">✏️ Editar {product.name}</h1>
        <p className="text-gray-500 mb-6">Actualiza los datos del producto.</p>

        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          loading={submitting}
          title="Editar Producto"
          submitText="💾 Actualizar producto"
        />
      </div>
    </Layout>
  );
}