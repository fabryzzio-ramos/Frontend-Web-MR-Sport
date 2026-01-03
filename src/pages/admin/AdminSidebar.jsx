import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
    { to: "/admin", label: "Dashboard", icon: "📊", end: true },
    { to: "/admin/jugadores", label: "Jugadores", icon: "👥" },
    { to: "/admin/partidos", label: "Partidos", icon: "⚽" },
    { to: "/admin/productos", label: "Productos", icon: "🛒" },
    { to: "/admin/ordenes", label: "Ordenes", icon: "📋" },
];

const TEXTOS = {
    logout: "Cerrar Sesión",
    loggingOut: "Cerrando sesión...",
};

function AdminSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function handleLogout() {
        setIsLoggingOut(true);
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <aside
        className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col shadow-lg"
        role="navigation"
        aria-label="Barra lateral de administración"
        >
        {/* Logo */}
        <div className="p-6 text-xl font-bold text-red-500 border-b border-slate-700">
            MR SPORT
            <span className="block text-xs text-gray-400">Admin Panel</span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-2" role="menu">
            {NAV_ITEMS.map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `
                flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-400 hover:bg-slate-700 hover:text-white hover:shadow-sm"
                }
                `}
                role="menuitem"
                aria-label={`Ir a ${item.label}`}
            >
                <span className="text-lg mr-3 group-hover:scale-110 transition-transform">
                {item.icon}
                </span>
                {item.label}
            </NavLink>
            ))}
        </nav>

        {/* Botón de Logout */}
        <div className="p-4 border-t border-slate-700">
            <button
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                isLoggingOut
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 hover:shadow-md"
            } text-white`}
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-label={isLoggingOut ? TEXTOS.loggingOut : TEXTOS.logout}
            >
            {isLoggingOut ? TEXTOS.loggingOut : TEXTOS.logout}
            </button>
        </div>
        </aside>
    );
}

export default AdminSidebar;