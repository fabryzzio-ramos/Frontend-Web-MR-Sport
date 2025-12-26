function MatchRow({ partido }) {
    const fecha = new Date(partido.fecha);

    return (
        <div className="flex items-center border-b border-gray-700 py-4 text-white">
            {/* FECHA */}
            <div className="w-20 text-center">
                <p className="text-2xl font-bold">{fecha.getDate()}</p>
                <p className="text-xs uppercase text-gray-400">{fecha.toLocaleDateString("es-ES",{month: "short"})}</p>
            </div>

            {/* JORNADA */}
            <div className="w-28 text-sm text-gray-400">Jornada {partido.jornada}</div>

            {/* EQUIPOS */}
            <div className="flex-1 flex items-center gap-4 font-semibold">
                <span>{partido.local}</span>
                <span className="text-gray-500">VS</span>
                <span>{partido.rival}</span>
            </div>

            {/* LUGAR */}
            <div className="w-32 text-sm text-gray-400 text-rigth">
                <p className="text-xs">{partido.lugar}</p>
            </div>
        </div>
    );
}

export default MatchRow;