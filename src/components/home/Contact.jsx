import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";

function Contact() {
    const { ref, visible } = useScrollAnimation();

    return (
        <section 
            ref={ref} 
            className={`relative py-24 px-6 bg-gradient-to-t from-black via-[#020617] to-[#020617] overflow-hidden transition-all duration-1000 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
            {/* DECORACIÓN - Mejorada con animación sutil */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(220,38,38,0.15),transparent_70%)] animate-pulse"></div>
            {/* Overlay adicional para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>

            <div className={`relative max-w-4xl mx-auto text-center text-white transition-all duration-1000 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    Más que un club
                    <br />
                    <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Una familia
                    </span>
                </h2>

                <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
                    Sé parte del club. Vive cada partido, apoya al equipo y representa
                    nuestros colores dentro y fuera de la cancha.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/equipo" 
                        className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        aria-label="Conoce al equipo del club MR Sport"
                    >
                        Conoce al equipo
                    </Link>
                    <Link 
                        to="/tienda" 
                        className="px-8 py-4 border-2 border-red-500 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        aria-label="Visita la tienda oficial de MR Sport"
                    >
                        Tienda oficial
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Contact;