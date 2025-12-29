import { useState, useEffect } from "react";
import { apiGet } from "../../services/api";
import { CheckCircleIcon, ClockIcon, TruckIcon } from "lucide-react";

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
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-lg font-medium">Cargando órdenes...</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <main className="min-h-screen bg-black text-white px-6 py-20">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="w-full text-white px-0 py-4">
            <div className="w-full">
                <div className="text-center mb-12">
                    {/* Placeholder para logo - reemplaza con tu logo */}
                    <div className="inline-block mb-4">
                        <img src="/favicon.ico" alt="Logo del Equipo" className="h-16 w-auto" />
                    </div>
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Mis Órdenes
                    </h1>
                    <p className="text-gray-400 text-lg">Gestión de Órdenes - MR Sport</p>
                </div>

                {ordenes.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-400 text-xl mb-4">Aún no has realizado compras</p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Explorar Productos
                        </button>
                    </div>
                ): (
                    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {ordenes.map((orden, index) => (
                            <div key={orden._id} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                                {/* HEADER */}
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <p className="text-sm text-gray-400 font-medium">Orden #{orden._id.slice(-6)}</p>
                                        <p className="text-xs text-gray-500">Fecha: {new Date(orden.fecha).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {orden.estado === "pendiente" && <ClockIcon className="h-5 w-5 text-yellow-400" />}
                                        {orden.estado === "pagado" && <CheckCircleIcon className="h-5 w-5 text-green-400" />}
                                        {orden.estado === "enviado" && <TruckIcon className="h-5 w-5 text-blue-400" />}
                                        <span className={`px-4 py-2 text-sm rounded-full font-semibold ${
                                            orden.estado === "pendiente" ? "bg-yellow-500/20 text-yellow-400" : 
                                            orden.estado === "pagado" ? "bg-green-500/20 text-green-400" : 
                                            "bg-blue-500/20 text-blue-400"
                                        }`}>
                                            {orden.estado.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* PRODUCTOS */}
                                <div className="space-y-3 mb-6">
                                    {orden.productos.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm text-gray-300 bg-gray-700/50 rounded-lg p-3">
                                            <span className="font-medium">{item.producto?.nombre} x{item.cantidad}</span>
                                            <span className="text-blue-400 font-semibold">S/ {((item.precio || item.producto.precio) * item.cantidad).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* TOTAL */}
                                <div className="border-t border-gray-600 pt-4 flex justify-between items-center font-bold text-lg">
                                    <span>Total</span>
                                    <span className="text-red-500">S/ {orden.total.toFixed(2)}</span>
                                </div>

                                {/* Botón opcional para detalles */}
                                <div className="mt-6 text-center">
                                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                        Ver Detalles
                                    </button>
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