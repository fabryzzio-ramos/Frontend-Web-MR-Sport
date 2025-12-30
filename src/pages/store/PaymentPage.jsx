import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";

function Payment() {
    const { cart, total, clearCart } = useCart();
    const navigate = useNavigate();

    const [metodo, setMetodo] = useState("");
    const [comprobante, setComprobante] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function confirmarPago() {
        if (!metodo) return alert("Selecciona un metodo de pago");
        if (!comprobante || !comprobante.type.startsWith('image/')) return alert("Sube un comprobante de pago");

        setLoading(true);
        setError("");

        try {
            const ordenResponse = await apiPost("/ordenes", {
                productos: cart.map(p => ({
                    producto: p._id,
                    cantidad: p.cantidad
                })),
                metodoPago: metodo
            });

            const ordenId = ordenResponse._id;

            const formData = new FormData();
            formData.append("comprobante", comprobante);

            await apiPost(`/ordenes/${ordenId}/pago`, formData, true);

            clearCart();
            navigate("/orden-exitosa");
        } catch (error) {
            setError("Error al confirmar pago"+ (err.message || "Intenta de nuevo"));
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-w-2xl mx-auto p-6 text-white">
            <h1 className="text-3xl font-bold mb-6">Pagar pedido</h1>

            {/* TOTAL */}
            <div className="bg-slate-900 p-4 rounded mb-6">
                <p className="text-gray-400">Total a pagar</p>
                <p className="text-2xl font-bold text-red-500">S/ {total}</p>
            </div>

            {/* METODO */}
            <div className="space-y-4 mb-6">
                <button onClick={() => setMetodo("yape")} className={`w-full p-4 rounded border
                    ${metodo === "yape" ? "border-purple-500" : "border-gray-700"}`}>Pagar con Yape</button>
                <button onClick={() => setMetodo("plin")} className={`w-full p-4 rounded border
                    ${metodo === "plin" ? "border-blue-500" : "border-gray-700"}`}>Pagar con Plin</button>
            </div>
            
            {/* QR */}
            {metodo && (
                <div className="bg-slate-800 p-4 rounded mb-6 text-center">
                    <p className="mb-2 font-semibold">
                        {metodo === "yape" ? "Yape" : "Plin"}
                    </p>

                    <img 
                        src={metodo === "yape" ? "/yape-qr.png" : "/plin-qr.png"} 
                        alt="QR"
                        className="w-40 mx-auto mb-3" />

                    <p className="text-gray-400 text-sm">
                        Número: <strong>999 999 999</strong>
                    </p>
                </div>
            )}

            {/* COMPROBANTE */}
            <div className="mb-6">
                <label className="block text-gray-400 mb-2">Sube tu comprobante</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setComprobante(e.target.files[0])}
                    className="w-full bg-slate-800 p-3 rounded text-white" />
            </div>

            {/* ERROR */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* CONFIRMAR */}
            <button
                onClick={confirmarPago}
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold">
                    {loading ? "Procesando..." : "Confirmar pago"}
                </button>
        </main>
    );
}

export default Payment;