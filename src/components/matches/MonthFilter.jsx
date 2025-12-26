function MonthFilter({ mesActual, setMesActual }) {
    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    return (
        <div className="flex gap-4 overflow-x-auto mb-10">
            {meses.map((mes, index) => (
                <button key={mes} onClick={() => setMesActual(index)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${mesActual === index ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}>{mes}</button>
            ))}
        </div>
    );
}

export default MonthFilter;