import { motion } from "framer-motion"; // Instala con: npm install framer-motion
import { MdEmail, MdLocationOn } from "react-icons/md"; // Íconos de Material Design
import { FaInstagram } from "react-icons/fa"; // Ícono de Font Awesome para Instagram

function ContactInfo() {
    const infoItems = [
        {
            label: "Correo",
            value: "mrsport.academy@gmail.com",
            icon: MdEmail, // Ícono corregido
            link: "mailto:mrsport.academy@gmail.com"
        },
        {
            label: "Redes",
            value: "Instagram @mrsport.academy",
            icon: FaInstagram, // Ícono corregido (de Font Awesome)
            link: "https://instagram.com/mrsport.academy"
        },
        {
            label: "Ubicación",
            value: "Comas, Lima, Perú",
            icon: MdLocationOn, // Ícono corregido
            link: "https://maps.google.com/?q=Comas,Lima,Perú"
        }
    ];

    return (
        <section className="bg-black py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.h2 
                    className="text-3xl font-bold text-white text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Información de Contacto
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {infoItems.map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-900 p-6 rounded-2xl text-center hover:bg-gray-800 transition duration-300 shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div 
                                className="text-red-600 text-4xl mb-4 mx-auto w-fit"
                                whileHover={{ rotate: 10 }}
                            >
                                <item.icon />
                            </motion.div>
                            <h3 className="text-lg font-semibold text-white mb-2">{item.label}</h3>
                            <p className="text-gray-400">{item.value}</p>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ContactInfo;