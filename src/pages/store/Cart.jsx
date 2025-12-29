import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"; 

function Cart() {
    const { cart, removeFromCart, updateCantidad, total } = useCart();
    
    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header con identidad */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            Carrito
                        </h1>
                        <p className="text-gray-400 text-lg">Tu carrito está vacío - MR SPORT SHOP</p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
                        <p className="text-gray-400 text-xl mb-6">No tienes productos en tu carrito.</p>
                        <Link to="/tienda" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
                            Volver a la tienda
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen text-white px-6 py-20">
            <div className="max-w-4xl mx-auto">
                {/* Header con identidad del equipo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Carrito
                    </h1>
                    <p className="text-gray-400 text-lg">Revisa tus productos - MR SPORT SHOP</p>
                </div>

                <div className="space-y-6 mb-8">
                    {cart.map(p => (
                        <div key={p._id} className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6">
                            {/* Imagen */}
                            <img src={p.imagen?.url} alt={p.nombre} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg" />

                            {/* Detalles */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2">{p.nombre}</h3>
                                <p className="text-gray-400 text-lg">S/ {p.precio.toFixed(2)} c/u</p>
                            </div>

                            {/* Controles de cantidad */}
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => updateCantidad(p._id, Math.max(1, p.cantidad - 1))} 
                                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
                                    disabled={p.cantidad <= 1}
                                >
                                    <MinusIcon className="h-5 w-5" />
                                </button>
                                <span className="text-xl font-semibold w-12 text-center">{p.cantidad}</span>
                                <button 
                                    onClick={() => updateCantidad(p._id, p.cantidad + 1)} 
                                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Subtotal y eliminar */}
                            <div className="text-center md:text-right">
                                <p className="text-blue-400 font-bold text-lg mb-2">Subtotal: S/ {(p.precio * p.cantidad).toFixed(2)}</p>
                                <button 
                                    onClick={() => removeFromCart(p._id)} 
                                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-2xl font-bold">Total</span>
                        <span className="text-red-500 text-3xl font-extrabold">S/ {total.toFixed(2)}</span>
                    </div>
                    <Link 
                        to="/tienda/checkout" 
                        className="block text-center bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Finalizar compra
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Cart;