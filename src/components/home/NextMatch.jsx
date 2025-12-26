import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import SectionTitle from "./SectionTitle";
import MatchCard from "../matches/MatchCard";

function NextMatch() {
    const [partidos, setPartidos] = useState([]);

    console.log(apiGet("/partidos"));
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
        <section className="bg-gradient-to-b from-black to-slate-900 px-10 py-20 ">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
                <SectionTitle title="Proximo Partido" subtitle="Calendario oficial del club" />

                {partidos.length === 0 ? (
                    <p className="text-center text-gray-400 mt-10">No hay partidos programados</p>
                ) : (
                    
                    <div className="grid gap-8
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4 mt-12">
                        {partidos.map((partido) => (
                        <MatchCard key={partido._id} partido={partido} />
                        ))}
                    </div>
                )}

                <div className="mt-14 flex justify-center">
                    <Link to="/partidos" className="px-8 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white font-semibold transition">Ver calendario completo</Link>
                </div>
            </div>

        </section>
    );
}

export default NextMatch;