import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip } from "recharts";

const colores = ["#dc2626", "#f97316", "#22c55e", "#3b82f6"];
const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function cargarDashboard() {
            try {
                const res = await apiGet("/admin/dashboard");
                setData(res);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        cargarDashboard();
    }, []);

    if (loading) return <p className="text-center mt-10">Cargando...</p>

    const partidosPorMes = data?.partidosPorMes?.map(item => ({
        mes: meses[item._id - 1],
        total: item.total
    }));

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Panel de Administracion</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="jugadores" value={data.totalJugadores} />
                <Card title="partidos" value={data.totalPartidos} />
                <Card title="productos" value={data.totalProductos} />
            </div>

            {data.proximoPartido && (
                <div className="mt-10 bg-slate-900 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Próximo Partido</h2>
                    <p>{data.proximoPartido.local} vs {data.proximoPartido.rival}</p>
                    <p className="text-gray-400">{data.proximoPartido.fecha}</p>
                </div>
            )}

            {data.jugadoresPorPosicion && (
                <div className="mt-12 bg-slate-900 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Jugadores por Posición</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={data.jugadoresPorPosicion} dataKey="total" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label >{data.jugadoresPorPosicion.map((_, index) => (
                                <Cell key={index} fill={colores[index % colores.length]} />
                            ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

            {partidosPorMes && (
                <div className="mt-12 bg-slate-900 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Partidos por mes</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={partidosPorMes}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <BarTooltip />
                            <Bar dataKey="total" fill="#dc2626" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
        
    );
}


function Card({ title, value }) {
    return (
        <div className="bg-slate-900 p-6 rounded-xl shadow">
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{value}</p>
        </div>
    );
}

export default Dashboard;