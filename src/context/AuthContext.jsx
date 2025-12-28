import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // OBTNER USUARIO ACTUAL
    useEffect(() => {
        async function loadUser() {
            try {
                const data = await apiGet("/auth/me");
                setUser({
                    id: data.usuario.id,
                    nombre: data.usuario.nombre,
                    correo: data.usuario.correo,
                    rol: data.usuario.rol
                });
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

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

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated,
        }}>
            {children}
        </AuthContext.Provider>
    );
}  

export function useAuth() {
    return useContext(AuthContext);
}