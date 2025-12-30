import { useEffect, useState } from "react";
import useSWR from "swr";
import { apiGet } from "../../services/api";
import useSEO from "../../hooks/useSEO";
import ProductGrid from "./ProductGrid";
import { motion } from "framer-motion"; // Para animaciones
import { ShirtIcon, TrophyIcon, StarIcon, FilterIcon } from "lucide-react"; // Íconos para categorías

const fetcher = (url) => apiGet(url);

function StoreHome() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState({ categoria: "", precioMax: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [error, setError] = useState(null);

    useSEO({
        title: "Tienda Oficial | MR Sport",
        description: "Compra camisetas oficiales, productos del club MR Sport y apoya al equipo."
    });

    const { data: productos, error: swrError, isLoading } = useSWR("/productos", fetcher, {
        onError: (err) => setError("Error al cargar productos. Intenta recargar la página."),
        revalidateOnFocus: true,
    });

    // Productos destacados simulados (puedes reemplazar con data real)
    const destacados = productos?.slice(0, 4) || [];

    const filteredProductos = productos?.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filter.categoria || producto.categoria === filter.categoria) &&
        (!filter.precioMax || producto.precio <= parseFloat(filter.precioMax))
    ) || [];

    const paginatedProductos = filteredProductos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (error || swrError) {
        return (
            <section className="max-w-7xl mx-auto px-6 py-16 text-center">
                <h1 className="text-4xl font-extrabold text-white mb-4">Error</h1>
                <p className="text-red-400">{error || "Algo salió mal."}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Recargar
                    </button>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
            {/* Hero Section */}
            <motion.div 
                className="bg-gradient-to-r from-red-600 to-red-500 text-white p-8 rounded-2xl mb-8 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <img src="/hero-stadium.jpg" alt="Estadio MR Sport" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold mb-4">¡Apoya al Equipo MR Sport!</h1>
                    <p className="text-xl mb-6">Descuentos exclusivos en productos oficiales</p>
                    <button className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition">Ver Ofertas</button>
                </div>
            </motion.div>

            {/* Categorías Destacadas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: ShirtIcon, label: "Camisetas", categoria: "camisetas" },
                    { icon: TrophyIcon, label: "Accesorios", categoria: "accesorios" },
                    { icon: StarIcon, label: "Destacados", categoria: "destacados" },
                ].map((cat, idx) => (
                    <motion.button
                        key={idx}
                        onClick={() => setFilter({ ...filter, categoria: cat.categoria })}
                        className="bg-gray-800 hover:bg-red-600 p-4 rounded-xl flex flex-col items-center transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        <cat.icon className="h-8 w-8 mb-2 text-red-500" />
                        <span className="text-white font-semibold">{cat.label}</span>
                    </motion.button>
                ))}
            </div>

            {/* Carrusel de Destacados */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Productos Destacados</h2>
                <div className="flex overflow-x-auto space-x-4 pb-4">
                    {destacados.map((prod) => (
                        <motion.div key={prod._id} className="min-w-[200px] bg-gray-800 rounded-xl p-4" whileHover={{ scale: 1.05 }}>
                            <img src={prod.imagen?.url} alt={prod.nombre} className="w-full h-32 object-cover rounded mb-2" />
                            <h3 className="text-white font-semibold">{prod.nombre}</h3>
                            <p className="text-red-500">S/ {prod.precio}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Filtros y Búsqueda */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input 
                    type="text"
                    placeholder="Buscar productos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#020617] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    aria-label="Buscar productos"
                />
                <select 
                    value={filter.categoria} 
                    onChange={(e) => setFilter({ ...filter, categoria: e.target.value })}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                    <option value="">Todas las categorías</option>
                    <option value="camisetas">Camisetas</option>
                    <option value="accesorios">Accesorios</option>
                </select>
                <input 
                    type="number" 
                    placeholder="Precio máximo" 
                    value={filter.precioMax} 
                    onChange={(e) => setFilter({ ...filter, precioMax: e.target.value })}
                    className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
            </div>

            <ProductGrid productos={paginatedProductos} isLoading={isLoading} />

            {/* Paginación */}
            {filteredProductos.length > itemsPerPage && (
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-800 text-white rounded-l hover:bg-gray-700 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 bg-gray-700 text-white">Página {currentPage}</span>
                    <button 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        disabled={currentPage * itemsPerPage >= filteredProductos.length}
                        className="px-4 py-2 bg-gray-800 text-white rounded-r hover:bg-gray-700 disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </section>
    );
}

export default StoreHome;