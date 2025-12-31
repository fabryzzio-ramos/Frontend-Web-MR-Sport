import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import PositionSection from "../components/team/PositionSection";
import useSEO from "../hooks/useSEO";

// Asumiendo que tienes acceso a un logo o imagen del equipo, puedes importarlo aquí
// import logo from "../assets/logo-mr-sport.png";

function Team() {
    useSEO({
        title: "Equipo | MR Sport",
        description: "Conoce a los jugadores oficiales del club MR Sport, posiciones, números y trayectoria."
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
        <main className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen px-6 md:px-16 py-18 relative overflow-hidden">
            {/* Fondo sutil con patrón o imagen del estadio/equipo para reforzar identidad */}
            <div className="absolute inset-0 bg-[url('/path/to/subtle-stadium-pattern.png')] opacity-10 bg-cover bg-center"></div>
            
            {/* Header con logo y título mejorado */}
            <header className="relative z-10 text-center mb-20">
                {/* Si tienes un logo, descomenta y ajusta */}
                <img src="/favicon.ico" alt="MR Sport Logo" className="mx-auto mb-4 w-24 h-24 md:w-32 md:h-32" />
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-wide drop-shadow-lg">
                    Nuestro Equipo
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    Descubre a los talentosos jugadores que representan a MR Sport en el campo. Cada uno aporta su pasión y habilidad para llevarnos a la victoria.
                </p>
            </header>

            {/* Secciones de posiciones con diseño mejorado */}
            <div className="relative z-10 space-y-16">
                <PositionSection title="Porteros" jugador={porteros} />
                <PositionSection title="Defensas" jugador={defensas} />
                <PositionSection title="Mediocampistas" jugador={mediocampista} />
                <PositionSection title="Delanteros" jugador={delantero} />
            </div>

            {/* Footer sutil para cerrar la página */}
            <footer className="relative z-10 text-center mt-20 py-8 border-t border-gray-700">
                <p className="text-gray-400 text-sm">
                    © 2023 MR Sport. Todos los derechos reservados. | Orgullosamente representando la pasión del fútbol.
                </p>
            </footer>
        </main>
    );
}

export default Team;