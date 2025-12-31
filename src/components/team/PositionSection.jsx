import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes
import PlayerCard from "./PlayerCard";

function PositionSection({ title, jugador }) {
    if (jugador.length === 0) {
        return (
            <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                    {title}
                </h2>
                <p className="text-gray-400 text-center py-8">No hay jugadores en esta posición por el momento.</p>
            </section>
        );
    }

    return (
        <motion.section 
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Título mejorado con estilo profesional */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3 border-b-2 border-gray-600 pb-2">
                {title}
            </h2>

            {/* Grid mejorado con responsividad y efectos visuales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {jugador.map((j, index) => (
                    <motion.div
                        key={j._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="transition-transform duration-300"
                    >
                        <PlayerCard jugador={j} />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export default PositionSection;