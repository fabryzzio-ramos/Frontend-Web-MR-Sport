import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes

function MonthFilter({ mesActual, setMesActual }) {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return (
        <motion.div 
            className="flex gap-4 overflow-x-auto mb-10 pb-4 scrollbar-hide" // Agregué scrollbar-hide para ocultar scrollbar en navegadores compatibles
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            {meses.map((mes, index) => (
                <motion.button 
                    key={mes} 
                    onClick={() => setMesActual(index)} 
                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
                        mesActual === index 
                            ? "bg-red-600 text-white shadow-lg scale-105" 
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {mes}
                </motion.button>
            ))}
        </motion.div>
    );
}

export default MonthFilter;