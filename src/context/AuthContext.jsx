import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // OBTNER USUARIO ACTUAL
    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        try {
            const res = await apiGet("/auth/me");
            setUser(res.usuario);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(correo, contraseña) {
        const data = await apiPost("/auth/login", {
            correo, contraseña
        });
        
        setUser(data.usuario);
    };

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