import useScrollAnimation from "../../hooks/useScrollAnimation";

function ClubValues() {
    const valores = [
        { 
            titulo: "Pasión", 
            desc: "Vivimos el fútbol con el corazón.", 
            icono: (
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            )
        },
        { 
            titulo: "Disciplina", 
            desc: "El trabajo constante nos define.", 
            icono: (
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                </svg>
            )
        },
        { 
            titulo: "Respeto", 
            desc: "Dentro y fuera del campo.", 
            icono: (
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            )
        },
        { 
            titulo: "Familia", 
            desc: "Somos más que un equipo.", 
            icono: (
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            )
        },
    ];

    const { ref, visible } = useScrollAnimation();

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out delay-400 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            } bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-24 px-6 md:px-20 overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>
            
            <div className="relative max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent leading-tight">
                    Nuestros Valores
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {valores.map((v, index) => (
                        <div 
                            key={v.titulo} 
                            className={`group bg-gradient-to-br from-black via-gray-900 to-black p-8 rounded-2xl text-center border border-gray-700 hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-500/10 hover:to-transparent hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 cursor-pointer ${
                                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                            }`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                                {v.icono}
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white group-hover:text-red-400 transition-colors duration-300">
                                {v.titulo}
                            </h3>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                                {v.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Divider mejorado con gradiente animado */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent my-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
            </div>
        </section>
    );
}

export default ClubValues;