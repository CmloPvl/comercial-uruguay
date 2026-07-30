import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Validar que el token exista
  useEffect(() => {
    if (!token) {
      toast.error("❌ Token inválido o expirado", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("❌ Token inválido");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("❌ La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await api.post("/auth/reset-password", {
        token,
        newPassword,
      });

      if (response.data.success) {
        setIsSuccess(true);
        toast.success("✅ Contraseña actualizada exitosamente", {
          style: {
            border: "2px solid #00D2D3",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "❌ Error al restablecer la contraseña", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-[#FFD93D]/20 via-[#F0C0F0]/30 to-[#00D2D3]/10">
        <Card className="max-w-md w-full border-2 border-[#7D5FFF] shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Badge className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] text-[#303030] mb-3 px-4 py-1.5 rounded-full font-bold">
                🔐 Restablecer Contraseña
              </Badge>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#603060] to-[#7D5FFF] bg-clip-text text-transparent">
                Nueva Contraseña
              </h1>
              <p className="text-gray-500 mt-2">Ingresa tu nueva contraseña para continuar.</p>
            </div>

            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-[#90C090] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#303030]">✅ ¡Contraseña actualizada!</h2>
                <p className="text-gray-500 mt-2">Serás redirigido al login en unos segundos...</p>
                <Link to="/login" className="mt-4 inline-block text-[#7D5FFF] hover:underline">
                  Ir a iniciar sesión →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#603060] text-lg">🔒</span> Nueva contraseña
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#603060] transition"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#90C090] text-lg">🔒</span> Confirmar contraseña
                  </Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !token}
                  className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Guardando..." : "🔐 Actualizar Contraseña"}
                </Button>

                {!token && (
                  <p className="text-center text-[#FF6B81] text-sm">
                    ⚠️ Token inválido o expirado. Solicita un nuevo enlace.
                  </p>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}