function MatchCardSkeleton() {
    return (
        <div className="bg-slate-800 rounded-2xl p-6 animate-pulse">
            <div className="flex justify-between items-center mb-6">
                <div className="w-12 h-12 bg-slate-700 rounded-full" />
                <div className="w-10 h-4 bg-slate-700 rounded" />
                <div className="w-12 h-12 bg-slate-700 rounded-full" />
            </div>

            <div className="space-y-3">
                <div className="h-3 bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-700 rounded w-1/2" />
            </div>
        </div>
    );
}

export default MatchCardSkeleton;