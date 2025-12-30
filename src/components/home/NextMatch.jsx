import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import MatchCard from "../matches/MatchCard";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import MatchCardSkeleton from "../skeletons/MatchCardSkeleton";

function NextMatch() {
    const [partidos, setPartidos] = useState([]);
    const { ref, visible } = useScrollAnimation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Agregado para manejar errores de forma visible

    useEffect(() => {
        const cargarPartidos = async () => {
            try {
                const data = await apiGet("/partidos");
                setPartidos(data);
            } catch (error) {
                console.error("Error cargando partidos", error.message);
                setError("No se pudieron cargar los partidos. Inténtalo más tarde."); // Mensaje amigable
            } finally {
                setLoading(false);
            }
        };

        cargarPartidos();
    }, []);

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } bg-gradient-to-b from-black via-slate-900 to-black px-6 py-20 overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
                {/* Título mejorado con gradiente */}
                <div className={`transition-all duration-1000 delay-200 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}>
                    <SectionTitle 
                        title="Próximo Partido" 
                        subtitle="Calendario oficial del club" 
                        titleClass="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                        subtitleClass="text-red-500"
                    />
                </div>

                {/* Contenido de partidos */}
                <div className={`transition-all duration-1000 delay-400 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}>
                    {error ? (
                        <p className="text-center text-red-400 mt-10 font-medium">{error}</p>
                    ) : partidos.length === 0 ? (
                        <p className="text-center text-gray-400 mt-10">No hay partidos programados</p>
                    ) : (
                        <div className="grid gap-8 mt-12
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3
                            xl:grid-cols-4
                            hover:shadow-2xl transition-shadow duration-500">
                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => <MatchCardSkeleton key={i} />)
                                : partidos.map((partido) => (
                                    <div key={partido._id} className="transform hover:scale-105 transition-transform duration-300">
                                        <MatchCard partido={partido} />
                                    </div>
                                ))}
                        </div>
                    )}

                    {/* Botón mejorado */}
                    <div className="mt-14 flex justify-center">
                        <Link 
                            to="/partidos" 
                            className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-full hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:scale-105 font-semibold transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                            aria-label="Ver el calendario completo de partidos"
                        >
                            Ver calendario completo
                        </Link>
                    </div>
                </div>
            </div>

            {/* Divider mejorado con gradiente */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent my-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
            </div>
        </section>
    );
}

export default NextMatch;