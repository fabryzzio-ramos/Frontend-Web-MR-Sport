import { Outlet, Navigate } from "react-router-dom";
import { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../../context/AuthContext";

const ROLES = {
    ADMIN: "admin",
};

const useAdminCheck = () => {
    const { user, loading, error } = useAuth();
    const isAdmin = user && user.rol === ROLES.ADMIN;
    return { isAdmin, loading, error };
};

function AdminLayout() {
    const { isAdmin, loading, error } = useAdminCheck();

    useEffect(() => {
        document.title = "Panel de Administración";
    }, []);

    if (loading) {
        return (
        <div
            className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-slate-900 to-slate-800"
            role="status"
            aria-live="polite"
        >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-4">Cargando...</span>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
            <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Error de Autenticación</h2>
            <p>{error.message || "Ocurrió un error. Intenta recargar la página."}</p>
            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
                Recargar
            </button>
            </div>
        </div>
        );
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-950 to-slate-900 text-white transition-all duration-300">

            <AdminSidebar />
        
        <main
            className="flex-1 p-4 md:p-8 overflow-auto"
            role="main"
            aria-label="Contenido principal del panel de administración"
        >
            <div className="max-w-7xl mx-auto">
            <Outlet />
            </div>
        </main>
        </div>
    );
}

export default AdminLayout;