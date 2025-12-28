import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔹 VERIFICAR SESIÓN (COOKIE)
    async function checkAuth() {
        try {
            const res = await apiGet("/auth/me");
            setUser(res.usuario);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    // 🔹 LOGIN
    async function login(correo, contraseña) {
        await apiPost("/auth/login", { correo, contraseña });
        await checkAuth(); // 🔥 AQUÍ ESTÁ LA CLAVE
    }

    // 🔹 LOGOUT
    async function logout() {
        await apiPost("/auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}