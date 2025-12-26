import StoreCard from "../store/StoreCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

function StorePreview() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await apiGet("/productos");
                setProductos(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        cargarProductos();
    }, []);

    const preview = productos.splice(0, 4);

    return (
        <section className="bg-gradient-to-b from-[#020617] via-black to-black py-24">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                {/* TEXTO */}
                <div>
                    <p className="text-red-500 font-semibold tracking-wide mb-3">TIENDA OFICIAL</p>
                    <h2 className="text-4xl font-extrabold text-white mb-6">Viste los colores <br />del club</h2>
                    <p className="text-gray-400 mb-8 max-w-md">Lleva contigo la pasión el esfuerzo y la identidad de MR Sport.
                        Productos oficiales diseñados para hinchas de verdad.
                    </p>
                    <Link to="/tienda" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition">Ir a la tienda </Link>
                </div>

                {preview.length === 0 ? (
                    <p className="text-center text-gray-400">Aún no hay productos</p>
                ) : (
                    <div className="grid grid-cols-2 gap-6">
                        {productos.map((producto) => (
                            <StoreCard key={producto._id} producto={producto} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default StorePreview;