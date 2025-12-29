import { useState, useEffect } from "react";
import { apiGet } from "../../services/api";

function MisOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarOrdenes() {
            try {
                const data = await apiGet("/ordenes/mis-ordenes");
                setOrdenes(data);
            } catch (error) {
                setError("No se pudieron cargar tus órdenes.");
            } finally {
                setLoading(false);
            }
        }

        cargarOrdenes();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">Cargando ordenes...</div>
        );
    }
    if (error) {
        return <p className="text-red-500">{error}</p>
    }

    return (
        <main className="min-h-screen bg-black text-white px-6 py-20">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-extrabold mb-8">Mis Órdenes</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {ordenes.length === 0 ? (
                    <p className="text-center text-gray-400">Aún no has realizado compras</p>
                ): (
                    <div className="space-y-6">
                        {ordenes.map(orden => (
                            <div key={orden._id} className="bg-[#020617] border border-white/10 rounded-xl p-6">
                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-sm text-gray-400">Orden #{orden._id.slice(-6)}</p>
                                    <span className={`px-3 py-1 text-sm rounded-full font-semibold ${orden.estado === "pendiente" ? "bg-yellow-500/20 text-yellow-400" : orden.estado === "pagado" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>{orden.estado.toUpperCase()}</span>
                                </div>

                                {/* PRODUCTOS */}
                                <div className="space-y-2">
                                    {orden.productos.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm text-gray-300">
                                            <span>{item.producto?.nombre} x{item.cantidad}</span>
                                            <span>S/ {(item.precio || item.producto.precio) * item.cantidad}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* TOTAL */}
                                <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span className="text-red-500">S/ {orden.total}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default MisOrdenes;