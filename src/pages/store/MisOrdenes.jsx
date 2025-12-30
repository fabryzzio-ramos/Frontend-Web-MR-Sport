import { useState, useEffect, useMemo } from "react";
import { apiGet } from "../../services/api";
import { CheckCircleIcon, ClockIcon, TruckIcon, SearchIcon, FilterIcon, TrophyIcon, EyeIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Para animaciones

function MisOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterEstado, setFilterEstado] = useState("todos");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrden, setSelectedOrden] = useState(null); // Para modal de detalles
    const itemsPerPage = 8;

    useEffect(() => {
        async function cargarOrdenes() {
            try {
                const data = await apiGet("/ordenes/mis-ordenes");
                setOrdenes(data);
            } catch (err) {
                setError("No se pudieron cargar tus órdenes. Intenta recargar.");
            } finally {
                setLoading(false);
            }
        }
        cargarOrdenes();
    }, []);

    // Filtrar y buscar órdenes
    const filteredOrdenes = useMemo(() => {
        return ordenes.filter(orden => {
            const matchesSearch = orden._id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterEstado === "todos" || orden.estado === filterEstado;
            return matchesSearch && matchesFilter;
        });
    }, [ordenes, searchTerm, filterEstado]);

    // Paginación
    const paginatedOrdenes = filteredOrdenes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Estados de carga y error
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
                <motion.div 
                    className="flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mb-4"></div>
                    <p className="text-lg font-medium">Cargando tus órdenes...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">
                <div className="max-w-5xl mx-auto text-center">
                    <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">
            <div className="max-w-7xl mx-auto">
                {/* Header con identidad */}
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <TrophyIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Mis Órdenes
                    </h1>
                    <p className="text-gray-400 text-lg">Gestión de Órdenes - MR SPORT SHOP</p>
                </motion.div>

                {/* Filtros y búsqueda */}
                <motion.div 
                    className="flex flex-wrap gap-4 mb-8 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
                        <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Buscar por ID de orden"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent text-white placeholder-gray-400 focus:outline-none"
                            aria-label="Buscar orden por ID"
                        />
                    </div>
                    <div className="flex items-center bg-gray-800 border border-gray-600 rounded-lg px-4 py-2">
                        <FilterIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <select
                            value={filterEstado}
                            onChange={(e) => setFilterEstado(e.target.value)}
                            className="bg-transparent text-white focus:outline-none"
                            aria-label="Filtrar por estado"
                        >
                            <option value="todos">Todos los Estados</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="pagado">Pagado</option>
                            <option value="enviado">Enviado</option>
                        </select>
                    </div>
                </motion.div>

                {filteredOrdenes.length === 0 ? (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-gray-400 text-xl mb-4">No se encontraron órdenes con esos filtros.</p>
                        <button 
                            onClick={() => { setSearchTerm(""); setFilterEstado("todos"); }}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                        >
                            Limpiar Filtros
                        </button>
                    </motion.div>
                ) : (
                    <>
                        {/* Grid de órdenes */}
                        <motion.div 
                            className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {paginatedOrdenes.map((orden, index) => (
                                <motion.div 
                                    key={orden._id} 
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {/* HEADER */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">Orden #{orden._id.slice(-6)}</p>
                                            <p className="text-xs text-gray-500">
                                                Fecha: {orden.createdAt ? new Date(orden.createdAt).toLocaleDateString() : 'Fecha no disponible'}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {orden.estado === "pendiente" && <ClockIcon className="h-5 w-5 text-yellow-400" />}
                                            {orden.estado === "pagado" && <CheckCircleIcon className="h-5 w-5 text-green-400" />}
                                            {orden.estado === "enviado" && <TruckIcon className="h-5 w-5 text-blue-400" />}
                                            <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                                                orden.estado === "pendiente" ? "bg-yellow-500/20 text-yellow-400" : 
                                                orden.estado === "pagado" ? "bg-green-500/20 text-green-400" : 
                                                "bg-blue-500/20 text-blue-400"
                                            }`}>
                                                {orden.estado.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* PRODUCTOS (resumidos) */}
                                    <div className="space-y-2 mb-6">
                                        {orden.productos.slice(0, 2).map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm text-gray-300 bg-gray-700/50 rounded-lg p-2">
                                                <span className="font-medium">{item.producto?.nombre} x{item.cantidad}</span>
                                                <span className="text-red-400 font-semibold">S/ {((item.precio || item.producto.precio) * item.cantidad).toFixed(2)}</span>
                                            </div>
                                        ))}
                                        {orden.productos.length > 2 && <p className="text-xs text-gray-500">+{orden.productos.length - 2} más...</p>}
                                    </div>

                                    {/* TOTAL */}
                                    <div className="border-t border-gray-600 pt-4 flex justify-between items-center font-bold text-lg mb-4">
                                        <span>Total</span>
                                        <span className="text-red-500">S/ {orden.total.toFixed(2)}</span>
                                    </div>

                                    {/* Botón para detalles */}
                                    <div className="text-center">
                                        <motion.button 
                                            onClick={() => setSelectedOrden(orden)}
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                            aria-label="Ver detalles de la orden"
                                        >
                                            <EyeIcon className="h-4 w-4" />
                                            Ver Detalles
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Paginación */}
                        {filteredOrdenes.length > itemsPerPage && (
                            <div className="flex justify-center mt-8">
                                <button 
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                                    disabled={currentPage === 1} 
                                    className="bg-red-600 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                                >
                                    Anterior
                                </button>
                                <span className="text-white mx-4">Página {currentPage}</span>
                                <button 
                                    onClick={() => setCurrentPage(currentPage + 1)} 
                                    disabled={currentPage * itemsPerPage >= filteredOrdenes.length} 
                                    className="bg-red-600 text-white px-4 py-2 rounded ml-2 disabled:opacity-50"
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modal de detalles */}
            <AnimatePresence>
                {selectedOrden && (
                    <motion.div 
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h3 className="text-white font-bold text-xl mb-4">Detalles de Orden #{selectedOrden._id.slice(-6)}</h3>
                            <p className="text-gray-400 mb-4">Fecha: {selectedOrden.createdAt ? new Date(selectedOrden.createdAt).toLocaleDateString() : 'N/A'}</p>
                            <p className="text-gray-400 mb-4">Estado: <span className={`font-semibold ${selectedOrden.estado === "pendiente" ? "text-yellow-400" : selectedOrden.estado === "pagado" ? "text-green-400" : "text-blue-400"}`}>{selectedOrden.estado.toUpperCase()}</span></p>
                            
                            {/* Productos detallados */}
                            <div className="space-y-3 mb-6">
                                {selectedOrden.productos.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm text-gray-300 bg-gray-700/50 rounded-lg p-3">
                                        <div>
                                            <span className="font-medium">{item.producto?.nombre}</span>
                                            <p className="text-xs text-gray-500">Cantidad: {item.cantidad} | Precio: S/ {item.precio || item.producto.precio}</p>
                                        </div>
                                        <span className="text-red-400 font-semibold">S/ {((item.precio || item.producto.precio) * item.cantidad).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-600 pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-red-500">S/ {selectedOrden.total.toFixed(2)}</span>
                            </div>

                            <div className="flex gap-4 mt-6">
                                <motion.button 
                                    onClick={() => setSelectedOrden(null)} 
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Cerrar
                                </motion.button>
                                {/* Opcional: Botón para reordenar o contactar soporte */}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default MisOrdenes;