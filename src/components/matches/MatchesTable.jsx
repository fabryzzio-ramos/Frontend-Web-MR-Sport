// MatchesTable mejorado
import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes
import MatchRow from "./MatchRow";

function MatchesTable({ partidos }) {
    if (partidos.length === 0) {
        return (
            <motion.div 
                className="bg-gray-900 rounded-xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-gray-400 text-lg">No hay partidos programados para este mes.</p>
            </motion.div>
        );
    }

    return (
        <motion.div 
            className="bg-gradient-to-r from-gray-900 to-black rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Header de la tabla para profesionalismo */}
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                    <span>Fecha y Hora</span>
                    <span>Equipos</span>
                    <span>Resultado</span>
                    <span>Estadio</span>
                </div>
            </div>
            
            {/* Filas de partidos con animaciones */}
            <div className="divide-y divide-gray-700">
                {partidos.map((p, index) => (
                    <motion.div
                        key={p._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <MatchRow partido={p} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default MatchesTable;