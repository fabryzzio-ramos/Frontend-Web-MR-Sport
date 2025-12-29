import React from "react";

function MatchCard({ partido }) {
    if (!partido) return null;

    const optimizeImageUrl = (url) => {
        if (!url) return null;
        return url.replace("/upload/", "/upload/w_300,h_300,c_fit,q_auto,f_auto/");
    };

    return (
        <div className="bg-[#020617] border border-white/10 rounded-3xl p-4 mb:p-6 text-sm md:text-base shadow-xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-300">
            {/* COMPETICION */}
            <p className="text-sm text-gray-400 text-center mb-6">{partido.competicion}</p>

            {/* EQUIPOS */}
            <div className="flex justify-between items-center mb-8">

                {/* EQUIPO LOCAL */}
                <div className="flex flex-col items-center gap-2">
                    {partido.logo?.local?.url ? (
                        <img src={optimizeImageUrl(partido.logo.local.url)} alt={`Logo del club ${partido.local}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">Logo</div>
                    )}
                    <span className="text-sm font-semibold text-white">{partido.local}</span>
                </div>

                {/* VERSUS */}
                <span className="text-red-500 font-bold text-xl">VS</span>

                {/* EQUIPO VISITANTE */}
                <div className="flex flex-col items-center gap-2">
                    {partido.logo?.rival?.url ? (
                        <img src={optimizeImageUrl(partido.logo.rival.url)} alt={`Logo del club ${partido.rival}`} className="w-16 h-16 object-contain" loading="lazy" decoding="async" />
                    ) : (
                        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs">Logo</div>
                    )}
                    <span className="text-sm font-semibold text-white">{partido.rival}</span>
                </div>
            </div>

            {/* INFO DEL PARTIDO */}
            <div className="border-t border-white/10 pt-4 text-sm text-gray-300 space-y-1 text-center">
                <p>{partido.fecha}</p>
                <p>{partido.lugar}</p>
            </div>
        </div>
    );
}

export default React.memo(MatchCard);