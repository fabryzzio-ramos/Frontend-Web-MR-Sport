import useScrollAnimation from "../../hooks/useScrollAnimation";

function AboutHero() {
    const { ref, visible } = useScrollAnimation();

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } bg-gradient-to-br from-[#020617] via-black to-red-900/20 text-white py-32 px-6 md:px-20 text-center overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/10 to-transparent pointer-events-none"></div>
            
            {/* Elemento decorativo sutil - ícono de fútbol animado */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 text-red-500 opacity-20 animate-bounce">
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            </div>

            <div className="relative max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-red-500 to-red-600 bg-clip-text text-transparent leading-tight">
                    MR SPORT
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                    Pasión, disciplina y orgullo. Un club que representa más que fútbol: una familia unida por el amor al juego.
                </p>
                
                {/* CTA sutil para engagement */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                        href="#historia" 
                        className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                        Descubre nuestra historia
                    </a>
                    <a 
                        href="#valores" 
                        className="inline-block border-2 border-red-500 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    >
                        Nuestros valores
                    </a>
                </div>
            </div>

            {/* Divider sutil para transición */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
        </section>
    );
}

export default AboutHero;