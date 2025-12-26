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
            </div>

            {/* GRID */}
            <div className="grid gap-8
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4">
                {partidos.map((partido) => (
                    <MatchCard key={partido._id} partido={partido} />
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button className="px-8 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white font-semibold transition">Ver calendario completo</button>
            </div>
            
        </section>
    );
}

export default NextMatch;