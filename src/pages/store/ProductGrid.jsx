import { memo } from "react";
import ProductCard from "./ProductCard";

function ProductSkeleton() {
    return (
        <div className="bg-[#020617] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-700"></div>
            <div className="p-4 text-center">
                <div className="h-4 bg-gray-600 rounded mb-2"></div>
                <div className="h-6 bg-red-500/20 rounded"></div>
                <div className="h-10 bg-gray-600 rounded mt-3"></div>
            </div>
        </div>
    );
}

function ProductGrid({ productos, isLoading = false }) {
    if (!productos || productos.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-white text-lg">No hay productos disponibles.</p>
                <p className="text-gray-400 mt-2">Intenta recargar o busca otros productos.</p>
            </div>
        );
    }

    return (
        <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            role="grid"
            aria-label="Lista de productos"
        >
            {isLoading
                ? Array.from({length:8}).map((_,index) => <ProductSkeleton key={index} />)
                : productos.map((producto, index) => (
                    <div
                        key={producto._id || index}
                        className="animate-fade-in"
                        style={{animationDelay: `${index * 0.1}s` }}
                    >
                        <ProductCard producto={producto} />
                    </div>
                ))
            }
        </div>
    );
}

export default memo(ProductGrid);