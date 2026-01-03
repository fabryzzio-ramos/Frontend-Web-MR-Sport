import { useEffect, useState, useMemo } from "react";
import { apiGet } from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip } from "recharts";

const COLORES = ["#dc2626", "#f97316", "#22c55e", "#3b82f6"];
const MESES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const TEXTOS = {
    loading: "Cargando datos del dashboard...",
    error: "Error al cargar datos. Intenta recargar.",
    title: "Panel de Administración",
    nextMatch: "Próximo Partido",
    playersByPosition: "Jugadores por Posición",
    matchesByMonth: "Partidos por Mes",
    refresh: "Refrescar",
};

function Card({ title, value, icon }) {
    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <div>
            <p className="text-gray-400 text-sm uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{value}</p>
            </div>
            <div className="text-4xl text-gray-500">{icon}</div>
        </div>
        </div>
    );
}

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarDashboard = async () => {
        setLoading(true);
        setError(null);
        try {
        const res = await apiGet("/admin/dashboard");
        setData(res);
        } catch (err) {
        setError(err.message || TEXTOS.error);
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        cargarDashboard();
    }, []);

    const partidosPorMes = useMemo(() => {
        return data?.partidosPorMes?.map(item => ({
        mes: MESES[item._id - 1],
        total: item.total
        })) || [];
    }, [data]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 p-3 rounded-lg shadow-lg text-white">
            <p className="font-semibold">{`${label}: ${payload[0].value}`}</p>
            </div>
        );
        }
        return null;
    };

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-[400px] text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mr-4"></div>
            <p>{TEXTOS.loading}</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="p-6 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
            onClick={cargarDashboard}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
            {TEXTOS.refresh}
            </button>
        </div>
        );
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-white">{TEXTOS.title}</h1>
            <button
            onClick={cargarDashboard}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            aria-label="Refrescar datos del dashboard"
            >
            {TEXTOS.refresh}
            </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <Card title="Jugadores" value={data.totalJugadores} icon="👥" />
            <Card title="Partidos" value={data.totalPartidos} icon="⚽" />
            <Card title="Productos" value={data.totalProductos} icon="🛒" />
        </div>

        {data.proximoPartido && (
            <div className="mt-10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">{TEXTOS.nextMatch}</h2>
            <p className="text-lg text-gray-300">{data.proximoPartido.local} vs {data.proximoPartido.rival}</p>
            <p className="text-gray-400 mt-2">{data.proximoPartido.fecha}</p>
            </div>
        )}

        {data.jugadoresPorPosicion && (
            <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">{TEXTOS.playersByPosition}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart aria-label="Gráfico de jugadores por posición">
                <Pie
                    data={data.jugadoresPorPosicion}
                    dataKey="total"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ _id, total }) => `${_id}: ${total}`}
                >
                    {data.jugadoresPorPosicion.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            </div>
        )}

        {partidosPorMes.length > 0 && (
            <div className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">{TEXTOS.matchesByMonth}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={partidosPorMes} aria-label="Gráfico de partidos por mes">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <BarTooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#dc2626" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </div>
        )}
        </div>
    );
}

export default Dashboard;