import React from "react";

function MatchCardSkeleton() {
    return (
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-4 md:p-6 animate-pulse shadow-xl border border-white/10">
            {/* Simula la competición */}
            <div className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-3/4 mx-auto mb-6"></div>
            
            {/* Simula equipos */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-slate-700 to-slate-600 rounded-full shadow-lg"></div>
                    <div className="h-3 bg-slate-600 rounded w-12"></div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-red-500 rounded mb-2"></div>
                    <div className="w-px h-8 bg-slate-600"></div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-b from-slate-700 to-slate-600 rounded-full shadow-lg"></div>
                    <div className="h-3 bg-slate-600 rounded w-12"></div>
                </div>
            </div>

            {/* Simula info del partido */}
            <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="h-3 bg-slate-600 rounded w-2/3 mx-auto"></div>
                <div className="h-3 bg-slate-600 rounded w-1/2 mx-auto"></div>
            </div>
        </div>
    );
}

export default MatchCardSkeleton;