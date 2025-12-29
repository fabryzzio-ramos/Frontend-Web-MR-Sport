import { useEffect, useState } from "react";
import useSWR from "swr";
import { apiGet } from "../../services/api";
import useSEO from "../../hooks/useSEO";
import ProductGrid from "./ProductGrid";

const fetcher = (url) => apiGet(url);

function StoreHome(parms) {
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);

    useSEO({
        title: "Tienda Oficial | MR Sport",
        description: "Compra camisetas oficiales, productos del club MR Sport y apoya al equipo."
    });

    const { data: productos, error: swrError, isLoading } = useSWR("/productos", fetcher, {
        onError: (err) => setError("Error al cargar productos. Intenta recargar la página."),
        revalidateOnFocus: true,
    });

    const filteredProductos = productos?.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
            <h1 className="text-4xl font-extrabold text-white mb-4">Tienda Oficial</h1>
            <p className="text-gray-400 mb-6">Apoya al club comprando productos oficiales</p>
            
            {/* BARRA DE BUSQUEDA */}
            <div className="mb-8">
                <input 
                    type="text"
                    placeholder="Buscar productos"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 bg-[#020617] border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
                    aria-label="Buscar productos"/>
            </div>

            <ProductGrid productos={filteredProductos} isLoading={isLoading} />
        </section>
    );
}

export default StoreHome