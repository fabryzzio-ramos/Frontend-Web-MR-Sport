import React from "react";
import { Link } from "react-router-dom"; // Agregado para enlace opcional al producto

function StoreCard({ producto }) {
    if (!producto) return null;

    const imageUrl = producto.imagen?.url 
        ? producto.imagen.url.replace("/upload/", "/upload/w_400,h_400,c_fill,q_auto,f_auto/") 
        : "/placeholder.png";

    return (
        <div className="group bg-gradient-to-b from-[#020617] to-slate-900 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 hover:shadow-red-500/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out relative">
            {/* Overlay sutil para hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="h-64 relative overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={`Producto ${producto.nombre} de la tienda oficial de MR Sport, precio S/ ${producto.precio}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    loading="lazy" 
                    decoding="async" 
                />
            </div>

            <div className="p-4 text-center relative z-10">
                <h3 className="text-white font-semibold text-sm md:text-base leading-tight mb-2">
                    {producto.nombre}
                </h3>
                <p className="text-red-500 font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    S/ {producto.precio}
                </p>
            </div>

            {/* Enlace opcional al detalle del producto - Agregado para UX */}
            <Link 
                to={`/tienda/${producto._id}`} 
                className="absolute inset-0 z-20" 
                aria-label={`Ver detalles de ${producto.nombre}`}
            ></Link>
        </div>
    );
}

export default React.memo(StoreCard);