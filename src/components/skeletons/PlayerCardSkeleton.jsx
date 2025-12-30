import React from "react";

function PlayerCardSkeleton() {
    return (
        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 rounded-3xl overflow-hidden animate-pulse shadow-xl">
            {/* Simula el número gigante */}
            <div className="absolute top-6 right-6 w-24 h-24 bg-gradient-to-b from-red-600/10 to-red-500/5 rounded-full"></div>

            {/* Simula la imagen */}
            <div className="w-full aspect-[3/4] bg-gradient-to-b from-slate-700 to-slate-600"></div>
            
            {/* Simula el overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Simula la info */}
            <div className="absolute bottom-0 p-6 w-full">
                <div className="h-4 bg-red-500/20 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-slate-600 rounded w-2/3"></div>
            </div>
        </div>
    );
}

export default PlayerCardSkeleton;