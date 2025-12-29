import React from "react";

function PlayerCard({ jugador }) {
    if (!jugador) return null;

    const imageUrl = jugador.foto?.url ? jugador.foto.url.replace("/upload/", "/upload/w_400,h_400,c_fill,q_auto,f_auto/") : "/placeholder.png";
    return (
        <div className="relative bg-[#020617] border border-white/10 rounded-3xl overflow-hidden group hover:border-red-500/50 hover:scale-105 transition-all duration-300">
            {/* NUMERO GIGANTE */}
            <span className="absolute top-6 right-6 text-[140px] font-extrabold text-red-600/10 z-0">{jugador.numero}</span>

            {/* IMAGEN */}
            <img src={imageUrl} alt={jugador.nombre} className="relative z-10 w-full aspect-[3/4] h-100 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" />
            
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* INFO */}
            <div className="absolute bottom-0 p-6 w-full z-30">
                <p className="text-red-500 text-sm font-semibold tracking-wide">{jugador.posicion}</p>
                <h3 className="text-white text-xl font-bold mt-1">{jugador.nombre}</h3>
            </div>
        </div>
    );
}

export default React.memo(PlayerCard);