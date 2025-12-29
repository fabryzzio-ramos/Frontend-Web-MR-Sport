import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { apiPost } from "../../services/api";
import { useNavigate } from "react-router-dom";

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
            const payload = {
                productos: cart.map(item => ({
                    producto: item._id,
                    precio: item.precio,
                    cantidad: item.cantidad
                })),
                total
            };

            await apiPost("/ordenes", payload);

            clearCart();
            navigate("/tienda/orden-exitosa");
        } catch (error) {
            setError("Error al crear la orden");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>

                {/* RESUMEN */}
                <div className="bg-slate-900 rounded-xl p-6 mb-6">
                    {cart.map(item => (
                        <div key={item._id} className="flex justify-between mb-3">
                            <span>{item.nombre} x {item.cantidad}</span>
                            <span>S/ {item.precio * item.cantidad}</span>
                        </div>
                    ))}

                    <hr className="border-gray-700 my-4" />

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>S/ {total}</span>
                    </div>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* BOTON */}
                <button onClick={handleCheckout} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold transition disabled:opacity-50">
                    {loading ? "Procesando" : "Confirmar pedido"}
                </button>
            </div>
        </div>
    );
}

export default Checkout;