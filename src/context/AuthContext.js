import { createContext, useContext, useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // OBTNER USUARIO ACTUAL
    useEffect(() => {
        const verificarSesion = async () => {
            try {
                const data = await apiGet("/auth/me");
                setUser(data.usuario);
            } catch (error) {
                setUser(null);
                setToken(null)
            } finally {
                setLoading(false);
            }
        };
        verificarSesion();
    }, []);

    async function login(correo, contraseña) {
        const data = await apiPost("/auth/login", {
            correo, contraseña
        });
        
        setUser(data.usuario);
        setToken(data.token);
    };

    function logout() {
        setUser(null);
        setToken(null);
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{
            user,
            token,
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