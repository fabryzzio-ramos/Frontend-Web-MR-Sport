import StoreCard from "../store/StoreCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import StoreCardSkeleton from "../skeletons/StoreCardSkeleton";

function StorePreview() {
    const [productos, setProductos] = useState([]);
    const { ref, visible } = useScrollAnimation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Agregado para manejar errores

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await apiGet("/productos");
                setProductos(data);
            } catch (error) {
                console.error("Error cargando productos", error.message);
                setError("No se pudieron cargar los productos. Inténtalo más tarde."); // Mensaje amigable
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, []);

    const preview = productos.slice(0, 2); // Solo 4 productos para preview

    return (
        <section 
            ref={ref} 
            className={`relative transition-all duration-1000 ease-out delay-200 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } bg-gradient-to-b from-[#020617] via-black to-[#020617] py-24 overflow-hidden`}
        >
            {/* Overlay decorativo para profundidad */}
            <div className="absolute inset-0 bg-gradient-radial from-red-600/5 to-transparent pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                {/* TEXTO - Mejorado con animaciones y gradientes */}
                <div className={`transition-all duration-1000 delay-300 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}>
                    <p className="text-red-500 font-semibold tracking-wide mb-3 uppercase bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Tienda Oficial
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Viste los colores <br />
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">del club</span>
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md text-base md:text-lg leading-relaxed">
                        Lleva contigo la pasión, el esfuerzo y la identidad de MR Sport.
                        Productos oficiales diseñados para hinchas de verdad.
                    </p>
                    <Link 
                        to="/tienda" 
                        className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        aria-label="Ir a la tienda oficial del club"
                    >
                        Ir a la tienda
                    </Link>
                </div>

                {/* PRODUCTOS - Mejorados con animaciones y hover */}
                <div className={`transition-all duration-1000 delay-500 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}>
                    {error ? (
                        <p className="text-center text-red-400 font-medium">{error}</p>
                    ) : preview.length === 0 ? (
                        <p className="text-center text-gray-400">Aún no hay productos</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 hover:shadow-2xl transition-shadow duration-500">
                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => <StoreCardSkeleton key={i} />)
                                : preview.map((producto) => (  // Corregido: usar preview en lugar de productos
                                    <div key={producto._id} className="transform hover:scale-105 transition-transform duration-300">
                                        <StoreCard producto={producto} />
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>

            {/* Divider mejorado con gradiente animado */}
            <div className="relative h-px w-full bg-gradient-to-r from-transparent via-red-600/50 to-transparent my-20">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
            </div>
        </section>
    );
}

export default StorePreview;