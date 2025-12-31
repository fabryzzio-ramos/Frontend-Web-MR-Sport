import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { apiPost } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "lucide-react";

function Checkout() {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleCheckout() {
        if (cart.length === 0) return;

        setLoading(true);
        setError("");

        try {
            navigate("/tienda/pago", {state: { cart, total }});
        } catch (error) {
            setError("Error al crear la orden");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen text-white px-6 py-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Checkout
                    </h1>
                    <p className="text-gray-400 text-lg">Finaliza tu compra - MR SPORT SHOP</p>
                </div>

                {/* RESUMEN */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl mb-8">
                    <h2 className="text-2xl font-bold mb-6">Resumen de tu pedido</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center">Tu carrito está vacío.</p>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item._id} className="flex justify-between items-center mb-4 p-4 bg-gray-700/50 rounded-lg">
                                    <span className="font-medium">{item.nombre} x {item.cantidad}</span>
                                    <span className="text-blue-400 font-semibold">S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                                </div>
                            ))}

                            <hr className="border-gray-600 my-6" />

                            <div className="flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span className="text-red-500">S/ {total.toFixed(2)}</span>
                            </div>
                        </>
                    )}
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6 text-center">
                        <p className="text-red-400 font-semibold">{error}</p>
                    </div>
                )}

                {/* BOTON */}
                <button 
                    onClick={handleCheckout} 
                    disabled={loading || cart.length === 0} 
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Procesando...
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className="h-5 w-5" />
                            Confirmar pedido
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default Checkout;