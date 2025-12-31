import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes

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
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-6 relative overflow-hidden">
            {/* Patrón deportivo sutil para identidad del equipo */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmVkIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-10 bg-repeat"></div>
            
            <motion.div 
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* LOGO / CLUB */}
                <div className="text-center mb-10">
                    <motion.div 
                        className="text-6xl mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        ⚽ {/* Ícono de balón para reforzar identidad deportiva */}
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">MR SPORT</h1>
                    <p className="text-gray-400 mt-2">Acceso al panel del club</p>
                </div>

                {/* FORM */}
                <motion.form 
                    onSubmit={handleSubmit} 
                    className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700/50 space-y-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <div>
                        <label className="sr-only" htmlFor="correo">Correo electrónico</label>
                        <input 
                            id="correo" 
                            type="email" 
                            aria-required="true" 
                            placeholder="Correo electrónico" 
                            value={correo} 
                            onChange={(e) => setCorreo(e.target.value)} 
                            className="w-full bg-transparent border-b-2 border-gray-600 py-3 text-white focus:outline-none focus:border-red-600 placeholder-gray-500 transition-colors duration-300" 
                        />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="contraseña">Contraseña</label>
                        <input 
                            id="contraseña" 
                            type="password" 
                            aria-required="true" 
                            placeholder="Contraseña" 
                            value={contraseña} 
                            onChange={(e) => setContraseña(e.target.value)} 
                            className="w-full bg-transparent border-b-2 border-gray-600 py-3 text-white focus:outline-none focus:border-red-600 placeholder-gray-500 transition-colors duration-300" 
                        />
                    </div>

                    {error && (
                        <motion.p 
                            className="text-red-500 text-sm text-center bg-red-900/20 p-2 rounded-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button 
                        disabled={loading} 
                        type="submit" 
                        className={`w-full mt-8 bg-red-600 text-white py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700 hover:shadow-xl"}`}
                        whileHover={!loading ? { scale: 1.05 } : {}}
                        whileTap={!loading ? { scale: 0.95 } : {}}
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </motion.button>
                </motion.form>

                {/* FOOTER */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        ¿No tienes cuenta?{" "}
                        <Link to="/registro" className="text-red-600 hover:text-red-500 transition-colors duration-300 hover:underline">Regístrate</Link>
                    </p>
                </div>
            </motion.div>
        </main>
    );
}

export default Login;