import { memo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";
import { StarIcon, EyeIcon } from "lucide-react";

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

function ProductCard({ producto }) {
    const { addToCart } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const imageUrl = producto.imagen?.url 
        ? producto.imagen.url.replace("/upload/", "/upload/w_400,h_400,c_fill,g_center,q_auto,f_auto/") 
        : "/placeholder.png";

    return (
        <>
            <motion.div 
                className="bg-[#020617] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 group max-w-sm mx-auto cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowModal(true)}
            >
                <div className="relative h-64 overflow-hidden">
                    {!imageLoaded && <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-t-2xl"></div>}
                    <motion.img 
                        src={imageUrl}
                        alt={producto.nombre || "Producto sin nombre"}
                        className={`w-full h-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => { e.target.src= "/placeholder.png"; setImageLoaded(true)}}
                        whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <EyeIcon className="h-8 w-8 text-white" />
                    </div>
                </div>
                <div className="p-4 text-center">
                    <h3 className="text-white font-semibold text-base md:text-lg leading-tight">{producto.nombre}</h3>
                    <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="h-4 w-4 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-red-500 font-bold text-lg mt-2">S/ {producto.precio}</p>
                    <motion.button 
                        onClick={(e) => { e.stopPropagation(); addToCart(producto); }}
                        className="mt-4 w-full border border-red-600 text-red-500 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                    >
                        Agregar al carrito
                    </motion.button>
                </div>
            </motion.div>

            {/* Modal de Vista Rápida */}
            {showModal && (
                <motion.div 
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setShowModal(false)}
                >
                    <motion.div 
                        className="bg-gray-900 p-8 rounded-2xl max-w-md w-full mx-4"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={imageUrl} alt={producto.nombre} className="w-full h-64 object-cover rounded mb-4" />
                        <h3 className="text-white font-bold text-xl mb-2">{producto.nombre}</h3>
                        <p className="text-gray-400 mb-4">{producto.descripcion || "Descripción no disponible."}</p>
                        <p className="text-red-500 font-bold text-lg mb-4">S/ {producto.precio}</p>
                        <button 
                            onClick={() => { addToCart(producto); setShowModal(false); }}
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                        >
                            Agregar al carrito
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </>
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
        <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            role="grid"
            aria-label="Lista de productos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {isLoading
                ? Array.from({length:8}).map((_,index) => <ProductSkeleton key={index} />)
                : productos.map((producto, index) => (
                    <motion.div
                        key={producto._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <ProductCard producto={producto} />
                    </motion.div>
                ))
            }
        </motion.div>
    );
}

export default memo(ProductGrid);