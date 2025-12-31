import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes

function MatchRow({ partido }) {
    const fecha = new Date(partido.fecha);
    const hora = fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    const dia = fecha.getDate();
    const mes = fecha.toLocaleDateString("es-ES", { month: "short" }).toUpperCase();

    // Asumiendo que partido tiene un campo 'resultado' (e.g., "2-1" o null si pendiente)
    const resultado = partido.resultado || "Pendiente";

    return (
        <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            {/* FECHA Y HORA */}
            <div className="flex flex-col items-center md:items-start">
                <p className="text-2xl font-bold text-white">{dia}</p>
                <p className="text-xs uppercase text-gray-400">{mes}</p>
                <p className="text-sm text-gray-300 mt-1">{hora}</p>
            </div>

            {/* EQUIPOS */}
            <div className="flex items-center gap-2 font-semibold text-white">
                <span className="truncate">{partido.local}</span>
                <span className="text-gray-500 text-sm">VS</span>
                <span className="truncate">{partido.rival}</span>
            </div>

            {/* RESULTADO */}
            <div className="flex items-center">
                <span className={`text-lg font-bold ${resultado === "Pendiente" ? "text-yellow-400" : "text-green-400"}`}>
                    {resultado}
                </span>
            </div>

            {/* ESTADIO */}
            <div className="flex items-center text-sm text-gray-400">
                <span className="truncate">{partido.lugar}</span>
            </div>
        </motion.div>
    );
}

export default MatchRow;