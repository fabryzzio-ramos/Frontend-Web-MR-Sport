import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
        );
    }

    if (!user || user.rol !== "admin") {
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen flex bg-slate-950 text-white">
            <AdminSidebar />
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;