// 📁 frontend/src/pages/Favoritos.tsx

/**
 * 📌 PÁGINA: FAVORITOS
 * 
 * Página de productos favoritos del usuario.
 * Conecta la lógica (useFavoritos) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Tipado fuerte con TypeScript
 */

import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { type Favorite } from "../services/favoriteService";
import { useFavoritos } from "../hooks/useFavoritos.ts";

export default function Favoritos() {
  // =============================================
  // 🧠 LÓGICA (extraída a useFavoritos)
  // =============================================
  const {
    favorites,
    loading,
    error,
    isAuthenticated,
    handleRemoveFavorite,
  } = useFavoritos();

  // =============================================
  // 🔄 ESTADO DE CARGA
  // =============================================
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-[#6A757C] mt-4">Cargando tus favoritos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🔒 NO AUTENTICADO
  // =============================================
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full border-2 border-[#00D2D3] shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">
                Inicia sesión para ver tus favoritos
              </h2>
              <p className="text-[#6A757C] mb-6">
                Guarda tus productos favoritos y accede a ellos desde cualquier lugar.
              </p>
              <Link to="/login">
                <Button className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  Iniciar Sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 📭 SIN FAVORITOS
  // =============================================
  if (favorites.length === 0) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full border-2 border-[#00D2D3] shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">❤️</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">
                No tienes productos favoritos
              </h2>
              <p className="text-[#6A757C] mb-6">
                Explora nuestra tienda y guarda tus productos favoritos para encontrarlos fácilmente.
              </p>
              <Link to="/productos">
                <Button className="w-full bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  🛒 Ver Tienda
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // ❤️ LISTA DE FAVORITOS
  // =============================================
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-2">
              ❤️ Mis Favoritos
            </h1>
            <p className="text-[#6A757C] mt-1">
              {favorites.length} producto{favorites.length !== 1 ? "s" : ""} guardado
              {favorites.length !== 1 ? "s" : ""}
            </p>
          </div>
          {error && (
            <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-2 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* =============================================
        📦 GRID DE FAVORITOS
        ============================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((favorite: Favorite) => (
            <Card
              key={favorite.id}
              className="border-2 border-[#00D2D3]/30 hover:border-[#7D5FFF] transition-all duration-300 hover:shadow-xl group"
            >
              <CardContent className="p-4">
                {/* Imagen */}
                <Link to={`/producto/${favorite.product.id}`}>
                  <div className="aspect-square bg-gradient-to-br from-[#F0F0C0]/30 to-[#F0C0F0]/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {favorite.product.images && favorite.product.images.length > 0 ? (
                      <img
                        src={favorite.product.images[0]}
                        alt={favorite.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-6xl">📦</span>
                    )}
                  </div>
                </Link>

                {/* Nombre */}
                <Link to={`/producto/${favorite.product.id}`}>
                  <h3 className="font-bold text-[#303030] hover:text-[#7D5FFF] transition-colors line-clamp-2 min-h-[48px]">
                    {favorite.product.name}
                  </h3>
                </Link>

                {/* Precio */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-extrabold text-[#603060]">
                    ${favorite.product.price.toLocaleString("es-CL")}
                  </span>
                  <Badge className="bg-[#FFD93D] text-[#303030] hover:bg-[#FFD93D]/80">
                    ❤️ Favorito
                  </Badge>
                </div>

                {/* Botones */}
                <div className="flex gap-2 mt-3">
                  <Link to={`/producto/${favorite.product.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-[#00D2D3] to-[#00B8C9] hover:from-[#00B8C9] hover:to-[#00D2D3] text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                      Ver Producto
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleRemoveFavorite(favorite.product.id)}
                    className="bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    ✕
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}