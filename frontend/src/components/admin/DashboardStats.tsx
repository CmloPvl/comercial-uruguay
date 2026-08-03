// 📁 frontend/src/components/admin/DashboardStats.tsx

/**
 * 📌 DASHBOARD STATS
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra las tarjetas de estadísticas del dashboard.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos por props
 * - Reutilizable en otras páginas
 * 
 * @param {Object} props
 * @param {DashboardStats} props.stats - Estadísticas del dashboard
 * @returns {JSX.Element} - Tarjetas de estadísticas
 */

import { Link } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";

interface DashboardStatsProps {
  stats: {
    totalProducts: number;
    totalOrders: number;
    totalUsers: number;
    pendingOrders: number;
    monthlySales: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      title: "Productos",
      value: stats.totalProducts,
      icon: "🛍️",
      color: "from-[#7D5FFF] to-[#603060]",
      link: "/admin/productos",
    },
    {
      title: "Pedidos",
      value: stats.totalOrders,
      icon: "📦",
      color: "from-[#00D2D3] to-[#0098A8]",
      link: "/admin/pedidos",
    },
    {
      title: "Usuarios",
      value: stats.totalUsers,
      icon: "👥",
      color: "from-[#FFD93D] to-[#F0C030]",
      link: "/admin/usuarios",
    },
    {
      title: "Pendientes",
      value: stats.pendingOrders,
      icon: "⏳",
      color: "from-[#FF6B81] to-[#E0556E]",
      link: "/admin/pedidos?status=pending",
    },
    {
      title: "Ventas del Mes",
      value: `$${stats.monthlySales.toLocaleString("es-CL")}`,
      icon: "💰",
      color: "from-[#90C090] to-[#5A9E6E]",
      link: "/admin/pedidos",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statItems.map((item) => (
        <Link key={item.title} to={item.link}>
          <Card
            className={`border-2 border-transparent bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer`}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
                    {item.title}
                  </p>
                  <p className="text-2xl font-extrabold">{item.value}</p>
                </div>
                <span className="text-3xl opacity-80">{item.icon}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}