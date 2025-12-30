import React from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";

function AboutClub() {
    const { ref, visible } = useScrollAnimation();

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } bg-gradient-to-b from-[#020617] to-slate-900 py-20 text-center overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* TEXTO - Mejorado con animaciones y gradientes */}
                <div className={`transition-all duration-1000 delay-200 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}>
                    <h4 className="text-red-500 font-semibold uppercase tracking-widest mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Sobre el club
                    </h4>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Más que un equipo,<br /> 
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">una familia</span>
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-8 text-base md:text-lg">
                        MR Sport no es solo un club de fútbol. Es esfuerzo, disciplina y pasión por el juego.
                        Representamos compromiso dentro y fuera de la cancha, formando jugadores y personas con valores.
                    </p>

                    {/* VALORES - Mejorados con íconos, hover y gradientes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="group border border-gray-700 p-4 rounded-lg hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-500/10 hover:to-transparent hover:scale-105 hover:shadow-red-500/20 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <h5 className="text-white font-semibold">Pasión</h5>
                            </div>
                            <p className="text-gray-400 text-sm">Amor por el fútbol</p>
                        </div>

                        <div className="group border border-gray-700 p-4 rounded-lg hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-500/10 hover:to-transparent hover:scale-105 hover:shadow-red-500/20 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h5 className="text-white font-semibold">Unión</h5>
                            </div>
                            <p className="text-gray-400 text-sm">Equipo y familia</p>
                        </div>

                        <div className="group border border-gray-700 p-4 rounded-lg hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-500/10 hover:to-transparent hover:scale-105 hover:shadow-red-500/20 transition-all duration-300 cursor-pointer md:col-span-2">
                            <div className="flex items-center gap-3 mb-2">
                                <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h5 className="text-white font-semibold">Compromiso</h5>
                            </div>
                            <p className="text-gray-400 text-sm">Dentro y fuera del campo</p>
                        </div>
                    </div>
                </div>

                {/* BLOQUE VISUAL - Mejorado con gradientes, animaciones y hover */}
                <div className={`relative border border-red-500/30 rounded-2xl p-10 bg-gradient-to-br from-[#020617] via-[#020617] to-red-900/20 hover:to-red-900/30 hover:border-red-500/50 hover:shadow-red-500/20 hover:shadow-2xl transition-all duration-500 group ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}>
                    {/* LÍNEA DECORATIVA - Mejorada con animación */}
                    <span className="absolute -top-3 left-6 bg-[#020617] px-3 text-red-500 font-semibold group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                        Identidad
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Nuestra identidad
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                        Representamos orgullo, sacrificio y amor por el fútbol.
                        Cada partido es una historia que defendemos juntos, dentro y fuera de la cancha.
                    </p>
                    {/* Elemento decorativo sutil */}
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-to-br from-red-500/10 to-transparent rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
            </div>

            {/* Divider mejorado con gradiente animado */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent my-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
            </div>
        </section>
    );
}

export default AboutClub;