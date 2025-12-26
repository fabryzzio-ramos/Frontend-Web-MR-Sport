function PlayerCardSkeleton() {
    return (
        <div className="bg-slate-800 rounded-xl p-4 animate-pulse">
            <div className="w-full h-48 bg-slate-700 rounded mb-4" />
            <div className="h-4 bg-slate-700 rounded w-2/3 mb-2" />
            <div className="h-3 bg-slate-700 rounded w-1/3" />
        </div>
    );
}

export default PlayerCardSkeleton;