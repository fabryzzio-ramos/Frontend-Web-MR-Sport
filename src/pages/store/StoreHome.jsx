import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import useSEO from "../../hooks/useSEO";
import ProductGrid from "./ProductGrid";

function StoreHome(parms) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useSEO({
        title: "Tienda Oficial | MR Sport",
        description: "Compra camisetas oficiales, productos del club MR Sport y apoya al equipo."
    });

    useEffect(() => {
        async function load() {
            try {
                const data = await apiGet("/productos");
                setProductos(data);
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">Cargando productos...</div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-extrabold text-white mb-4">Tienda Oficial</h1>
            <p className="text-gray-400 mb-10">Apoya al club comprando productos oficiales</p>

            <ProductGrid productos={productos} />
        </section>
    );
}

export default StoreHome