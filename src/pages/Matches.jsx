import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import MonthFilter from "../components/matches/MonthFilter";
import MatchesTable from "../components/matches/MatchesTable";
import useSEO from "../hooks/useSEO";
import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes

function Matches() {
    useSEO({
        title: "Partidos | MR Sport",
        description: "Calendario de partidos, resultados y competiciones del club MR Sport."
    });

    const [partidos, setPartidos] = useState([]);
    const [mesActual, setMesActual] = useState(new Date().getMonth());

    useEffect(() => {
        const cargarPartidos = async () => {
            try {
                const data = await apiGet("/partidos");
                setPartidos(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        cargarPartidos();
    }, []);

    const partidosFiltrados = partidos.filter(p => {
        return new Date(p.fecha).getMonth() === mesActual;
    });

    return (
        <main className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen px-6 md:px-20 py-16 relative overflow-hidden">
            {/* Fondo sutil con patrón o imagen relacionada con fútbol para reforzar identidad */}
            <div className="absolute inset-0 bg-[url('/path/to/subtle-football-pattern.png')] opacity-10 bg-cover bg-center"></div>

            {/* Header mejorado */}
            <motion.header 
                className="relative z-10 text-center mb-12"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-wide drop-shadow-lg">
                    Calendario de Partidos
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Mantente al día con todos los partidos de MR Sport. Consulta fechas, horarios, resultados y estadios para no perderte ninguna acción en el campo.
                </p>
            </motion.header>

            {/* Contenido principal con animaciones */}
            <motion.div 
                className="relative z-10 space-y-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <MonthFilter mesActual={mesActual} setMesActual={setMesActual} />
                <MatchesTable partidos={partidosFiltrados} />
            </motion.div>

            {/* Footer sutil para cerrar la página */}
            <motion.footer 
                className="relative z-10 text-center mt-20 py-8 border-t border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                <p className="text-gray-400 text-sm">
                    © 2023 MR Sport. Todos los derechos reservados. | Vive la emoción del fútbol con nosotros.
                </p>
            </motion.footer>
        </main>
    );
}

export default Matches;