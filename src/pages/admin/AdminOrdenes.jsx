import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../services/api";

function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    async function cargarOrdenes() {
        try {
            const data = await apiGet("/ordenes");
            setOrdenes(data);
        } catch (error) {
            setError("Error al cargar ordenes")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarOrdenes();
    }, []);

    async function cambiarEstado(id, estado) {
        try {
            await apiPost(`/ordenes/${id}/estado`, {estado});
            cargarOrdenes();
        } catch (error) {
            alert("Error al cambiar estado")
        }
    }

    if (loading) {
        return <div className="p-6 text-white">Cargando ordenes...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-white">Órdenes</h1>

            {error && <p className="text-red-500">{error}</p>}

            {ordenes.length === 0 && (
                <p className="text-gray-400">No hay órdenes aún</p>
            )}

            <div className="space-y-4">
                {ordenes.map((orden) => (
                    <div key={orden._id} className="bg-slate-900 border border-white/10 rounded-xl p-5">
                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-sm text-gray-400">Cliente</p>
                                <p className="font-semibold">{orden.usuario?.nombre} - {orden.usuario?.correo}</p>
                            </div>

                            <span className={`px-3 py-1 rounded-full text-sm 
                                ${orden.estado === "pendiente" && "bg-yellow-500/20 text-yellow-400"}
                                ${orden.estado === "pagado" && "bg-green-500/20 text-green-400"}
                                ${orden.estado === "enviado" && "bg-blue-500/20 text-blue-400"}`}>{orden.estado}</span>
                        </div>

                        {/* PRODUCTOS */}
                        <div className="space-y-2">
                            {orden.productos.map((item, index) => (
                                <div key={index} className="flex jusitfy-between text-sm text-gray-300">
                                    <span>{item.producto?.nombre} x {item.cantidad}</span>
                                    <span>S/ {item.precio * item.cantidad}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex gap-2">
                            {item.estado !== "pagado" && (
                                <button onClick={() => cambiarEstado(item._id, "pagado")} className="px-3 py-1 bg-blue-600 rounded text-sm">Marcar pagado</button>
                            )}
                            {item.estado !== "enviado" && (
                                <button onClick={() => cambiarEstado(item._id, "enviado")} className="px-3 py-1 bg-green-600 rounded text-sm">Marcar enviado</button>
                            )}
                        </div>
                        {/* FOOTER */}
                        <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
                            <p className="text-gray-400 text-sm">{new Date(orden.createdAt).toLocaleDateString()}</p>
                            <p className="text-lg font-bold text-red-500">Total: S/ {orden.total}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminOrdenes;