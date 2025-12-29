import { useCart } from "../../context/CartContext";

function ProductCard({ producto}) {
    const { addToCart } = useCart();

    return (
        <div className="bg-[#020617] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/40 transition group">
            <img src={producto.imagen?.url} alt={producto.nombre} className="w-full h-full object-cover group-hover:scale-105 transition" />

            <div className="p-4 text-center">
                <h3 className="text-white font-semibold text-sm">{producto.nombre}</h3>
                <p className="text-red-500 font-bold mt-1">S/ {producto.precio}</p>

                <button onClick={() => addToCart(producto)} className="mt-3 w-full border border-red-600 text-red-500 py-2 rounded-lg hover:bg-red-600 hover:text-white transition">Agregar al carrito</button>
            </div>
        </div>
    );
}

export default ProductCard;