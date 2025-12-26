import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import MatchCard from "../matches/MatchCard";
import useScrollAnimation from "../../hooks/useScrollAnimation";

function NextMatch() {
    const [partidos, setPartidos] = useState([]);
    const { ref, visible } = useScrollAnimation();

    useEffect(() => {
        const cargarPartidos = async () => {
            try {
                const data = await apiGet("/partidos");
                setPartidos(data);
            } catch (error) {
                console.error("Error cargando partidos", error.message);
            }
        };

        cargarPartidos();
    }, []);

    return (
        <section ref={ref} className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} bg-gradient-to-b from-black to-slate-900 px-10 py-20`}>
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
                <SectionTitle title="Proximo Partido" subtitle="Calendario oficial del club" />

                {partidos.length === 0 ? (
                    <p className="text-center text-gray-400 mt-10">No hay partidos programados</p>
                ) : (
                    
                    <div className="grid gap-6
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4 mt-12">
                        {partidos.map((partido) => (
                        <MatchCard key={partido._id} partido={partido} />
                        ))}
                    </div>
                )}

                <div className="mt-14 flex justify-center">
                    <Link to="/partidos" className="px-8 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white font-semibold transition">Ver calendario completo</Link>
                </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-600/30 to-transparent my-20"></div>

        </section>
    );
}

export default NextMatch;