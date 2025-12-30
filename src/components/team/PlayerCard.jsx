import React from "react";
import { Link } from "react-router-dom"; // Agregado para enlace opcional al perfil

function PlayerCard({ jugador }) {
    if (!jugador) return null;

    const imageUrl = jugador.foto?.url 
        ? jugador.foto.url.replace("/upload/", "/upload/w_400,h_400,c_fill,q_auto,f_auto/") 
        : "/placeholder.png";

    return (
        <div className="relative bg-gradient-to-b from-[#020617] to-slate-900 border border-white/10 rounded-3xl overflow-hidden group hover:border-red-500/50 hover:shadow-red-500/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out">
            {/* NÚMERO GIGANTE - Mejorado con gradiente y animación */}
            <span className="absolute top-6 right-6 text-[140px] font-extrabold bg-gradient-to-b from-red-600/10 to-red-500/5 bg-clip-text text-transparent z-0 group-hover:scale-110 group-hover:text-red-600/20 transition-all duration-500">
                {jugador.numero}
            </span>

            {/* IMAGEN - Mejorada con hover scale */}
            <img 
                src={imageUrl} 
                alt={`Foto de ${jugador.nombre}, jugador número ${jugador.numero} en posición ${jugador.posicion}`} 
                className="relative z-10 w-full aspect-[3/4] object-cover group-hover:scale-110 transition-transform duration-500" 
                loading="lazy" 
                decoding="async" 
            />
            
            {/* OVERLAY - Mejorado con gradiente dinámico */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-red-900/20 transition-all duration-500"></div>

            {/* INFO - Mejorada con gradientes y espaciado */}
            <div className="absolute bottom-0 p-6 w-full z-30">
                <p className="text-red-500 text-sm font-semibold tracking-wide uppercase bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    {jugador.posicion}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-bold mt-1 leading-tight">
                    {jugador.nombre}
                </h3>
            </div>

            {/* Enlace opcional al perfil del jugador - Agregado para UX */}
            <Link 
                to={`/equipo/${jugador._id}`} 
                className="absolute inset-0 z-40" 
                aria-label={`Ver perfil de ${jugador.nombre}`}
            ></Link>
        </div>
    );
}

export default React.memo(PlayerCard);