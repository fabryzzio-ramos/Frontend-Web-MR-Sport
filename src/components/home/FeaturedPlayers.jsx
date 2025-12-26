import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import PlayerCard from "../team/PlayerCard";

function FeaturedPlayers() {
    const [jugadores, setJugadores] = useState([])

    useEffect(() => {
            const cargarJugadores = async () => {
                try {
                    const data = await apiGet("/jugadores");
                    setJugadores(data);
                } catch (error) {
                    console.error(error.message);
                }
            };
    
            cargarJugadores();
        }, []);

    return (
        <section className="bg-gradient-to-b from-slate-900 to-[#020617] py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER */}
                <div className="mb-12 text-center">
                    <p className="text-red-500 font-semibold tracking-wide">JUGADORES DESTACADOS</p>
                    <h2 className="text-4xl font-extrabold text-white mt-2">Orgullo del Club</h2>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {jugadores.map((jugador) => (
                        <PlayerCard key={jugador._id} jugador={jugador} />
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <button className="px-8 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white font-semibold transition">Ver equipo completo</button>
                </div>
            </div>
        </section>
    );    
}

export default FeaturedPlayers;