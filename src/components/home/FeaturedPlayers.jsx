import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { Link } from "react-router-dom"; // Agregado para el botón como enlace
import PlayerCard from "../team/PlayerCard";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import PlayerCardSkeleton from "../skeletons/PlayerCardSkeleton";

function FeaturedPlayers() {
    const [jugadores, setJugadores] = useState([]);
    const { ref, visible } = useScrollAnimation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Agregado para manejar errores

    useEffect(() => {
        const cargarJugadores = async () => {
            try {
                const data = await apiGet("/jugadores");
                setJugadores(data);
            } catch (error) {
                console.error("Error cargando jugadores", error.message);
                setError("No se pudieron cargar los jugadores. Inténtalo más tarde."); // Mensaje amigable
            } finally {
                setLoading(false);
            }
        };

        cargarJugadores();
    }, []);

    const destacados = jugadores.slice(0, 6);

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out delay-100 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } bg-gradient-to-b from-slate-900 via-black to-[#020617] py-20 overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-6">
                {/* HEADER - Mejorado con gradientes y línea decorativa */}
                <div className={`transition-all duration-1000 delay-200 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                } mb-12 text-center`}>
                    <p className="text-red-500 font-semibold tracking-wide uppercase text-sm md:text-base">
                        Jugadores Destacados
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Orgullo del Club
                    </h2>
                    <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Contenido de jugadores */}
                <div className={`transition-all duration-1000 delay-400 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}>
                    {error ? (
                        <p className="text-center text-red-400 font-medium">{error}</p>
                    ) : destacados.length === 0 ? (
                        <p className="text-center text-gray-400">Aún no hay jugadores</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 hover:shadow-2xl transition-shadow duration-500">
                            {loading
                                ? Array.from({ length: 6 }).map((_, i) => <PlayerCardSkeleton key={i} />)
                                : destacados.map((jugador) => (
                                    <div key={jugador._id} className="transform hover:scale-105 transition-transform duration-300">
                                        <PlayerCard jugador={jugador} />
                                    </div>
                                ))
                            }
                        </div>
                    )}

                    {/* Botón mejorado como enlace */}
                    <div className="mt-12 flex justify-center">
                        <Link 
                            to="/equipo" 
                            className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:scale-105 font-semibold transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            aria-label="Ver el equipo completo del club"
                        >
                            Ver equipo completo
                        </Link>
                    </div>
                </div>
            </div>

            {/* Divider mejorado con gradiente animado */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent my-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
            </div>
        </section>
    );
}

export default FeaturedPlayers;