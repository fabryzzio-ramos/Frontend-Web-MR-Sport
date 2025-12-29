import { useCart } from "../../context/CartContext";

function Cart() {
    const { cart, removeFromCart, total } = useCart();
    
    if (cart.length === 0) {
        return <p className="text-center text-gray-400">Tu carrito esta vacio.</p>
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-extrabold">Carrito</h1>

            {cart.map(p => (
                <div key={p._id} className="flex justify-between items-center bg-slate-900 p-4 rounded">
                    <div>
                        <p className="font-semibold">{p.nombre}</p>
                        <p className="text-gray-400 text-sm">{p.cantidad} x S/ {p.precio}</p>
                    </div>

                    <button onClick={() => removeFromCart(p._id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <p className="text-xl font-bold">Total: S/ {total}</p>
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-semibold">Finalizar compra</button>
            </div>
        </div>
    );
}

export default Cart;