import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes

function ContactIntro() {
    return (
        <section className="bg-gradient-to-b from-black to-gray-800 text-white py-20 md:py-32 px-6 text-center relative overflow-hidden">
            {/* Patrón deportivo sutil para continuidad y tema */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmVkIiBvcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-10 bg-repeat"></div> {/* Patrón de balón sutil */}
            
            <motion.div 
                className="relative z-10 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Ícono o emoji para añadir un toque deportivo */}
                <motion.div 
                    className="text-6xl mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    📞 {/* O usa un ícono SVG como un balón o teléfono */}
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
                    Contáctanos
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
                    ¿Quieres formar parte del club, colaborar o simplemente escribirnos? Estamos aquí para escucharte y hacer que tu experiencia con MR Sport sea inolvidable. ¡No dudes en ponerte en contacto!
                </p>
                
                {/* Call-to-action sutil para guiar al usuario */}
                <motion.button 
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Envía un Mensaje
                </motion.button>
            </motion.div>
        </section>
    );
}

export default ContactIntro;