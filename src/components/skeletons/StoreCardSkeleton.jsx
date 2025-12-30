import React from "react";

function StoreCardSkeleton() {
    return (
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10 animate-pulse shadow-xl">
            {/* Simula la imagen */}
            <div className="h-64 bg-gradient-to-b from-slate-700 to-slate-600"></div>

            {/* Simula el texto */}
            <div className="p-4 text-center">
                <div className="h-4 bg-slate-600 rounded w-3/4 mb-2 mx-auto"></div>
                <div className="h-5 bg-red-500/20 rounded w-1/2 mx-auto"></div>
            </div>
        </div>
    );
}

export default StoreCardSkeleton;