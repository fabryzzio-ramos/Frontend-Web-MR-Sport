import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    async function handleLogout() {
        await logout();
        navigate("/login")
    }

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
            <div className="p-6 text-xl font-bold text-red-500">
                MR SPORT 
                <span className="block text-xs text-gray-400">Admin Panel</span>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <NavLink to="/admin" end className={({ isActive }) => `
                block px-4 py-2 rounded transition
                ${isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}>
                    Dashboard
                </NavLink>

                <NavLink to="/admin/jugadores" className={({ isActive }) => `
                block px-4 py-2 rounded transition
                ${isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}>
                    Jugadores
                </NavLink>

                <NavLink to="/admin/partidos" className={({ isActive }) => `
                block px-4 py-2 rounded transition
                ${isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}>
                    Partidos
                </NavLink>

                <NavLink to="/admin/productos" className={({ isActive }) => `
                block px-4 py-2 rounded transition
                ${isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}>
                    Productos
                </NavLink>
                
            </nav>

            <button className="m-4 py-2 rounded bg-red-600 hover:bg-red-700 transition" onClick={handleLogout}>Cerrar Sesión</button>
        </aside>
    );
}

export default AdminSidebar;