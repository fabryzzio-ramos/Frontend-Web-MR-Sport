import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔑 FUNCIÓN ÚNICA DE VERIFICACIÓN
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

    // 🔥 SOLO AQUÍ se ejecuta al cargar la app
    useEffect(() => {
        checkAuth();
    }, []);

    async function login(correo, contraseña) {
        setLoading(true);
        await apiPost("/auth/login", { correo, contraseña });

        // ⏳ ESPERA a que la cookie exista
        await checkAuth();
    }

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
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}