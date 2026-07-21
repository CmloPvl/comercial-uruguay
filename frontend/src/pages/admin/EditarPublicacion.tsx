import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import { productService } from "../../services/productService";
import { categoryService, type Category } from "../../services/categoryService";
import ProductForm from "../../components/admin/ProductForm";
import { useAuth } from "../../context/AuthContext";

export default function EditarPublicacion() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (id) {
      loadProduct();
      loadCategories();
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

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Error al cargar categorías");
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSubmit = async (productData: any) => {
    try {
      setSubmitting(true);
      await productService.updateProduct(id!, productData);
      toast.success("✅ Producto actualizado exitosamente");
      navigate("/admin/productos");
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar el producto");
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
            <Link to="/" className="mt-4 inline-block text-[#7D5FFF] hover:underline">Volver al inicio</Link>
          </div>
        </div>
      </Layout>
    );
  }

  // =============================================
  // ESTADO DE CARGA (SKELETON)
  // =============================================
  if (loading || loadingCategories) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              <div className="border-2 border-[#7D5FFF] rounded-2xl p-6 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-32 mb-1.5" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-2 border-[#7D5FFF] rounded-2xl p-6 space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
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
      {/* ====== BREADCRUMB ====== */}
      <div className="bg-gradient-to-r from-[#FFD93D]/20 via-[#F0F0C0]/30 to-[#F0C0F0]/20 py-3 px-4 border-b-2 border-[#7D5FFF]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin" className="text-[#603060] hover:text-[#00D2D3]">
                  Panel Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/productos" className="text-[#603060] hover:text-[#00D2D3]">
                  Productos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  ✏️ Editar Producto
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== CONTENIDO ====== */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] text-[#303030] px-4 py-1.5 rounded-full">
              ✏️ Editar Producto
            </Badge>
            <Badge className="bg-[#00D2D3] text-white px-3 py-1 rounded-full">
              {categories.length} categorías
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#603060] mt-3 flex items-center gap-3">
            ✏️ Editar {product.name}
            <span className="text-sm font-normal text-gray-400">| SKU: {product.sku}</span>
          </h1>
          <p className="text-gray-500 mt-1">Actualiza los datos del producto.</p>
        </div>

     <ProductForm
  product={product}
  onSubmit={handleSubmit}
  loading={submitting}
  title="Editar Producto"
  submitText="💾 Actualizar producto"
  categories={categories}
  categoriesLoading={loadingCategories}  // ← Agrega esta línea
/>
      </div>
    </Layout>
  );
}