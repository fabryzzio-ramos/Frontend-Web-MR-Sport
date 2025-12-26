import { useState } from "react";
import { apiPost } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await apiPost("/auth/register", {
                nombre,
                correo,
                contraseña
            });
            
            navigate("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="w-full max-w-md mt-15">

                {/* LOGO */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white">MR SPORT</h1>
                    <p className="text-gray-400 mt-2">Crea tu cuenta</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label className="sr-only" htmlFor="nombre">Nombre de usuario</label>
                    <input id="nombre" type="text" aria-required="true" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-red-600 placeholder-gray-500" />

                    <label className="sr-only" htmlFor="correo">Correo electronico</label>
                    <input id="correo" type="email" aria-required="true" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-red-600 placeholder-gray-500" />

                    <label className="sr-only" htmlFor="contraseña">Contraseña</label>
                    <input id="contraseña" type="password" aria-required="true" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-red-600 placeholder-gray-500" />
                    {error && <p>{error}</p>}

                    <button disabled={loading} type="submit" className={`w-full mt-8 bg-red-600 text-white py-3 rounded-full transition ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"}`}>{loading ? "Cargando..." : "Registrarse" }</button>
                </form>

                {/* FOOTER */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">¿Ya tienes cuenta?{" "}</p>
                    <Link to="/login" className="text-red-600 hover:underline">Inicia sesión</Link>
                </div>
            </div>
        </main>
    );
}

export default Register;