import useScrollAnimation from "../../hooks/useScrollAnimation";

function ClubHistory() {
    const { ref, visible } = useScrollAnimation();

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            } bg-gradient-to-b from-black via-gray-900 to-black text-white py-24 px-6 md:px-20 overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>
            
            {/* Elemento decorativo sutil - línea timeline o ícono */}
            <div className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-red-500 to-transparent opacity-50"></div>

            <div className="relative max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent leading-tight">
                    Nuestra Historia
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* TEXTO PRINCIPAL */}
                    <div className="space-y-6">
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                            MR Sport nació con el sueño de formar más que jugadores, formar personas.
                            Desde nuestros inicios, el club ha crecido gracias al esfuerzo, la unión y el amor por el fútbol.
                        </p>
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                            Cada partido, cada entrenamiento y cada victoria representa el compromiso con nuestra comunidad y nuestros valores.
                            Somos una familia que trasciende el campo de juego.
                        </p>
                        
                        {/* CTA para engagement */}
                        <a 
                            href="#valores" 
                            className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                            Conoce nuestros valores
                        </a>
                    </div>

                    {/* ELEMENTO VISUAL - Placeholder para imagen o ícono */}
                    <div className="flex justify-center">
                        <div className="w-64 h-64 bg-gradient-to-br from-red-500/20 to-transparent rounded-full flex items-center justify-center border border-red-500/30 hover:scale-105 transition-transform duration-300">
                            <svg className="w-24 h-24 text-red-500 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider mejorado con gradiente animado */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent my-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
            </div>
        </section>
    );
}

export default ClubHistory;