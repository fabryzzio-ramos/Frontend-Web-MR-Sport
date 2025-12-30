import React from "react";
import { Link } from "react-router-dom"; // Agregado para enlace opcional al partido

function MatchCard({ partido }) {
    if (!partido) return null;

    const optimizeImageUrl = (url) => {
        if (!url) return null;
        return url.replace("/upload/", "/upload/w_300,h_300,c_fit,q_auto,f_auto/");
    };

    return (
        <div className="group bg-gradient-to-b from-[#020617] to-slate-900 border border-white/10 rounded-3xl p-4 md:p-6 text-sm md:text-base shadow-xl hover:shadow-red-500/20 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 ease-out relative overflow-hidden">
            {/* Overlay sutil para hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* COMPETICIÓN - Mejorada con gradiente */}
            <p className="relative z-10 text-sm text-gray-400 text-center mb-6 font-medium bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
                {partido.competicion}
            </p>

            {/* EQUIPOS */}
            <div className="relative z-10 flex justify-between items-center mb-8">
                {/* EQUIPO LOCAL */}
                <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform duration-300">
                    {partido.logo?.local?.url ? (
                        <img 
                            src={optimizeImageUrl(partido.logo.local.url)} 
                            alt={`Logo del club ${partido.local}`} 
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border-2 border-white/20 shadow-lg" 
                            loading="lazy" 
                            decoding="async" 
                        />
                    ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                            {partido.local?.charAt(0) || "L"}
                        </div>
                    )}
                    <span className="text-sm md:text-base font-semibold text-white text-center leading-tight">
                        {partido.local}
                    </span>
                </div>

                {/* VERSUS - Mejorado con ícono */}
                <div className="flex flex-col items-center">
                    <span className="text-red-500 font-bold text-xl md:text-2xl mb-2">VS</span>
                    <div className="w-px h-8 bg-gradient-to-b from-red-500 to-transparent"></div>
                </div>

                {/* EQUIPO VISITANTE */}
                <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform duration-300">
                    {partido.logo?.rival?.url ? (
                        <img 
                            src={optimizeImageUrl(partido.logo.rival.url)} 
                            alt={`Logo del club ${partido.rival}`} 
                            className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-full border-2 border-white/20 shadow-lg" 
                            loading="lazy" 
                            decoding="async" 
                        />
                    ) : (
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                            {partido.rival?.charAt(0) || "R"}
                        </div>
                    )}
                    <span className="text-sm md:text-base font-semibold text-white text-center leading-tight">
                        {partido.rival}
                    </span>
                </div>
            </div>

            {/* INFO DEL PARTIDO - Mejorada con íconos sutiles */}
            <div className="relative z-10 border-t border-white/10 pt-4 text-sm text-gray-300 space-y-2 text-center">
                <p className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {partido.fecha}
                </p>
                <p className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {partido.lugar}
                </p>
            </div>

            {/* Enlace opcional al detalle del partido - Agregado para UX */}
            <Link 
                to={`/partidos/${partido._id}`} 
                className="absolute inset-0 z-20" 
                aria-label={`Ver detalles del partido entre ${partido.local} y ${partido.rival}`}
            ></Link>
        </div>
    );
}

export default React.memo(MatchCard);