import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("usuario") || "null");
    if (!user) return <Navigate to="/login" />;
    if (user.rol !== "admin") return <Navigate to="/" />;

    return children;
}

export default AdminRoute;