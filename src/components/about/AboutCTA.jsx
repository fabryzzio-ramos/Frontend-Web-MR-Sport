import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";

function AboutCTA() {
    const { ref, visible } = useScrollAnimation();

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out delay-600 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            } bg-gradient-to-t from-black via-gray-900 to-gray-900 border-t border-red-500/30 py-32 px-6 text-center overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>
            
            {/* Elemento decorativo sutil - ícono de trofeo o estrella */}
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 text-red-500 opacity-20 animate-pulse">
                <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-red-500 to-red-600 bg-clip-text text-transparent leading-tight">
                    Más que un club
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-lg md:text-xl leading-relaxed">
                    MR Sport es comunidad, esfuerzo y pasión por el fútbol. Sé parte de nuestra historia y únete a la familia que trasciende el campo de juego.
                </p>
                
                <Link 
                    to="/contacto" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-red-500/50 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    Únete al club
                </Link>
            </div>
        </section>
    );
}

export default AboutCTA;