import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(correo, contraseña);
<<<<<<< HEAD
            navigate("/");
=======
           
>>>>>>> 0ff43ba206c6bf929d6274b531a084fc1801a1e2
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                {/* LOGO / CLUB */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white">MR SPORT</h1>
                    <p className="text-gray-400">Acceso al panel del club</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="sr-only" htmlFor="correo">Correo electronico</label>
                    <input id="correo" type="email" aria-required="true" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-red-600 placeholder-gray-500" />

                    <label className="sr-only" htmlFor="contrasela">Contraseña</label>
                    <input id="contraseña" type="password" aria-required="true" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-red-600 placeholder-gray-500" />
                    {error && <p>{error}</p>}

                    <button disabled={loading} type="submit" className={`w-full mt-8 bg-red-600 text-white py-3 rounded-full transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"} font-semibold hover:bg-red-700 transition`}>{loading ? "Cargando..." : "Iniciar sesión"}</button>
                </form>

                {/* FOOTER */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link to="/registro" className="text-red-600 hover:underline">Registrate</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;