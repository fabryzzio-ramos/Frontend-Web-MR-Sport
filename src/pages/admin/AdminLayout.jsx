import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
    const user = JSON.parse(localStorage.getItem("usuario"));

    if (!user || user.rol !== "admin") return <Navigate to="/login" />

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