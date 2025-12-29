import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
    const { cart, removeFromCart, updateCantidad, total } = useCart();
    
    if (cart.length === 0) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-center text-gray-400">Tu carrito esta vacio.</h2>
                <Link to="/tienda" className="text-red-500">Volver a la tienda</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-extrabold">Carrito</h1>

            {cart.map(p => (
                <div key={p._id} className="flex justify-between items-center bg-slate-900 p-4 rounded">
                    <img src={p.imagen?.url} alt={p.nombre} className="w-20 h-20 object-cover" />
                    <div>
                        <h3 className="font-semibold">{p.nombre}</h3>
                        <p className="text-gray-400 text-sm">S/ {p.precio}</p>
                        <input type="number" min="1" value={p.cantidad} onChange={e => updateCantidad(p._id, Number(e.target.value))} className="w-16 mt-2 bg-black" />
                    </div>

                    <div>
                        <button onClick={() => updateCantidad(p._id, p.cantidad - 1)}>-</button>
                        <span>{p.cantidad}</span>
                        <button onClick={() => updateCantidad(p._id, p.cantidad + 1)}>+</button>
                        <button onClick={() => removeFromCart(p._id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                    </div>
                </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <p className="text-xl font-bold">Total: S/ {total}</p>
                <Link to="/tienda/checkout" className="block text-center bg-red-600 hover:bg-red-700 py-3 rounded font-semibold mt-6">Finalizar compra</Link>
            </div>
        </div>
    );
}

export default Cart;