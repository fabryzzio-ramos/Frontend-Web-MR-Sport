import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useParams, useNavigate } from "react-router-dom";
import { apiPost } from "../../services/api";

function Pago() {
    const { ordenId } = useParams();
    const navigate = useNavigate();

    const [metodo, setMetodo] = useState(null);
    const [comprobante, setComprobante] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function confirmarPago() {
        if (!metodo || !comprobante) {
            setError("Selecciona método y sube comprobante");
            return;
        }

        const formData = new FormData();
        formData.append("metodoPago", metodo);
        formData.append("comprobante", comprobante);

        try {
            setLoading(true);
            await apiPost(`/ordenes/${ordenId}/pago`, formData, true);
            navigate("/orden-exitosa");
        } catch (error) {
            setError("Error al confirmar pago");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-slate-900 p-6 rounded-xl space-y-6">
                <h1 className="text-2xl font-bold text-center">Pagar pedido</h1>

                {/* METODO */}
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setMetodo("yape")} className={`p-4 rounded border
                        ${metodo === "yape" ? "border-purple-500" : "border-gray-700"}`}>Yape</button>
                    <button onClick={() => setMetodo("plin")} className={`p-4 rounded border
                        ${metodo === "plin" ? "border-blue-500" : "border-gray-700"}`}>Plin</button>
                </div>

                {/* QR */}
                {metodo && (
                    <div className="text-center">
                        <img src={metodo === "yape" ? "/yape-qr.png" : "/plin-qr.png"} alt="QR" className="mx-auto w-40" />
                        <p className="text-sm text-gray-400 mt-2">Escanea y paga</p>
                    </div>
                )}

                {/* COMPROBANTE */}
                <input 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setComprobante(e.target.files[0])}
                    className="w-full bg-black p-3 rounded" />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    onClick={confirmarPago}
                    disabled={loading}
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold">
                        {loading ? "Confirmando..." : "Confirmar pago"}
                    </button>
            </div>
        </main>
    )
}

export default Pago;