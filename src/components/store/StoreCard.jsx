import React from "react";

function StoreCard({ producto }) {
    if (!producto) return null;

    return (
        <div className="bg-[#020617] rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition">
            <img src={producto.imagen?.url.replace("/upload/", "/upload/q_auto.f_auto/")} alt={producto.nombre} className="w-full h-56 object-cover" loading="lazy" decoding="async" />

            <div className="p-4 text-center">
                <h3 className="text-white font-semibold text-sm">{producto.nombre}</h3>
                <p className="text-red-500 font-bold mt-1">S/ {producto.precio}</p>
            </div>
        </div>
    );
}

export default React.memo(StoreCard);