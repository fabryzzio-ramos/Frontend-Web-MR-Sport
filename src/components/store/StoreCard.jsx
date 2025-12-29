import React from "react";

function StoreCard({ producto }) {
    if (!producto) return null;

    const imageUrl = producto.imagen?.url ? producto.imagen.url.replace("/upload/", "/upload/w_400,h_400,c_fill,q_auto,f_auto/") : "/placeholder.png";
    return (
        <div className="bg-[#020617] rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition">
            <div className="h-64">
                <img src={imageUrl} alt={producto.nombre} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>

            <div className="p-4 text-center">
                <h3 className="text-white font-semibold text-sm">{producto.nombre}</h3>
                <p className="text-red-500 font-bold mt-1">S/ {producto.precio}</p>
            </div>
        </div>
    );
}

export default React.memo(StoreCard);