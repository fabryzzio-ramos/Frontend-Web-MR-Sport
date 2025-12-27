import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import PositionSection from "../components/team/PositionSection";

import useSEO from "../hooks/useSEO";

function Team() {
    useSEO({
        title: "Equipo oficial | Club Deportivo Oficial",
        description: "Conoce a los jugadores y cuerpo técnico de MR Sport."
    });

    const [jugadores, setJugadores] = useState([]);

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

    const porteros = jugadores.filter(p => p.posicion === "Portero");
    const defensas = jugadores.filter(p => p.posicion === "Defensa");
    const mediocampista = jugadores.filter(p => p.posicion === "Mediocampista");
    const delantero = jugadores.filter(p => p.posicion === "Delantero");

    return (
        <main className="bg-black min-h-screen px-6 md:px-16 py-18">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-16">Nuestro Equipo</h1>

            <PositionSection title="Porteros" jugador={porteros} />
            <PositionSection title="Defensas" jugador={defensas} />
            <PositionSection title="Mediocampistas" jugador={mediocampista} />
            <PositionSection title="Delanteros" jugador={delantero} />
        </main>
    );
}

export default Team;