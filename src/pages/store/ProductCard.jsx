import { useState, memo } from "react";
import { useCart } from "../../context/CartContext";

function ProductCard({ producto}) {
    const { addToCart } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);

    const imageUrl = producto.imagen?.url 
        ? producto.imagen.url.replace("/upload/", "/upload/w_400,h_400,c_fill,g_center,q_auto,f_auto/") 
        : "/placeholder.png";

    return (
        <div className="bg-[#020617] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group max-w-sm mx-auto">
            <div className="relative h-64">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl"></div>
                )}
                <img 
                    src={imageUrl}
                    alt={producto.nombre || "Producto sin nombre"}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => { e.target.src= "/placeholder.png"; setImageLoaded(true)}}
                    />
            </div>

            <div className="p-4 text-center">
                <h3 className="text-white font-semibold text-base md:text-lg leading-tight">{producto.nombre}</h3>
                <p className="text-red-500 font-bold text-lg mt-2">S/ {producto.precio}</p>

                <button 
                    onClick={() => addToCart(producto)}
                    className="mt-4 w-full border border-red-600 text-red-500 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Agregar al carrito
                </button>
            </div>
        </div>
    );
}

export default memo(ProductCard);