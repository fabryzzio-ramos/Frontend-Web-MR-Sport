import { motion } from "framer-motion"; // Asegúrate de instalar framer-motion si no lo tienes
import { Mail, Instagram, MapPin } from "react-icons";

function ContactInfo() {
    const infoItems = [
        {
            label: "Correo",
            value: "mrsport.academy@gmail.com",
            icon: {Mail}, // O usa un ícono SVG como <MailIcon />
            link: "mailto:mrsport.academy@gmail.com"
        },
        {
            label: "Redes",
            value: "Instagram @mrsport.academy",
            icon: {Instagram}, // O usa un ícono SVG como <InstagramIcon />
            link: "https://instagram.com/mrsport.academy"
        },
        {
            label: "Ubicación",
            value: "Comas, Lima, Perú",
            icon: {MapPin}, // O usa un ícono SVG como <LocationIcon />
            link: "https://maps.google.com/?q=Comas,Lima,Perú" // O una URL específica si tienes
        }
    ];

    return (
        <section className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800 py-16 md:py-20 px-6 relative overflow-hidden">
            {/* Fondo sutil para reforzar identidad */}
            <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.png')] opacity-5 bg-cover bg-center"></div>
            
            <motion.div 
                className="relative z-10 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Título opcional para mejor estructura y SEO */}
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                    Información de Contacto
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {infoItems.map((item, index) => (
                        <motion.div 
                            key={item.label}
                            className="group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4 group-hover:text-red-500 transition-colors">
                                    {item.icon}
                                </div>
                                <p className="text-gray-500 text-sm mb-2 uppercase tracking-wide">
                                    {item.label}
                                </p>
                                <p className="text-white font-medium text-lg">
                                    {item.value}
                                </p>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

export default ContactInfo;