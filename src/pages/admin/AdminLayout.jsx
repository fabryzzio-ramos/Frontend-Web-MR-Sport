import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
    const { user, loading } = useAuth();
<<<<<<< HEAD
    
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>
        );
    }
=======

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Cargando...
            </div>
        );
    }

    if (!user || user.rol !== "admin") {
        return <Navigate to="/" replace />;
    }
>>>>>>> 0ff43ba206c6bf929d6274b531a084fc1801a1e2

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