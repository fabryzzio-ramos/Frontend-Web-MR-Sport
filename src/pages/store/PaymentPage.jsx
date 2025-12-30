import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { apiPost } from "../../services/api";

import { FaQrcode, FaCreditCard, FaUpload } from "react-icons/fa";

function Payment() {
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const { ordenId, total } = location.state || {};

    const [metodo, setMetodo] = useState("");
    const [comprobante, setComprobante] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function confirmarPago() {
        if (!ordenId) {
            setError("No se encontro la orden. Regresa al chekout");
            return;
        }
        if (!metodo) {
            setError("Selecciona un metodo de pago");
            return;
        };
        if (!comprobante || !comprobante.type.startsWith('image/')) {
            setError("Sube un comprobante de pago valido");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("metodoPago", metodo);
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
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-6">
            <div className="max-w-lg w-full bg-slate-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
                {/* Header con logo o identidad de la tienda */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">
                        Pagar Pedido
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Completa tu pago de forma segura y rápida
                    </p>
                    {/* Agrega un logo aquí si tienes uno, e.g., <img src="/logo.png" alt="Logo" className="w-16 mx-auto mb-4" /> */}
                </div>

                {/* TOTAL */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 rounded-xl mb-8 shadow-lg">
                    <p className="text-gray-200 text-sm font-medium">Total a pagar</p>
                    <p className="text-3xl font-bold text-white">
                        S/ {total ? total.toFixed(2) : "0.00"}
                    </p>
                </div>

                {/* METODO DE PAGO */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                        <FaCreditCard className="mr-2 text-red-500" />
                        Selecciona Método de Pago
                    </h2>
                    <div className="space-y-3">
                        <button
                            onClick={() => setMetodo("yape")}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                                metodo === "yape"
                                    ? "border-purple-500 bg-purple-500/20 text-purple-300 shadow-lg"
                                    : "border-gray-600 bg-gray-800 text-gray-300 hover:border-purple-400 hover:bg-purple-500/10"
                            }`}
                        >
                            <img src="/yape-icon.png" alt="Yape" className="w-6 h-6 mr-3" /> {/* Usa ícono real si tienes */}
                            Pagar con Yape
                        </button>
                        <button
                            onClick={() => setMetodo("plin")}
                            className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                                metodo === "plin"
                                    ? "border-blue-500 bg-blue-500/20 text-blue-300 shadow-lg"
                                    : "border-gray-600 bg-gray-800 text-gray-300 hover:border-blue-400 hover:bg-blue-500/10"
                            }`}
                        >
                            <img src="/plin-icon.png" alt="Plin" className="w-6 h-6 mr-3" /> {/* Usa ícono real si tienes */}
                            Pagar con Plin
                        </button>
                    </div>
                </div>

                {/* QR CODE */}
                {metodo && (
                    <div className="bg-slate-800 p-6 rounded-xl mb-8 shadow-inner border border-gray-600">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
                                <FaQrcode className="mr-2 text-red-500" />
                                Escanea el QR de {metodo === "yape" ? "Yape" : "Plin"}
                            </h3>
                            <img
                                src={metodo === "yape" ? "/yape-qr.png" : "/plin-qr.png"}
                                alt="QR Code"
                                className="w-48 mx-auto mb-4 rounded-lg shadow-md"
                            />
                            <p className="text-gray-400 text-sm">
                                Número: <strong className="text-white">999 999 999</strong>
                            </p>
                        </div>
                    </div>
                )}

                {/* COMPROBANTE */}
                <div className="mb-8">
                    <label className="block text-gray-300 mb-3 font-medium flex items-center">
                        <FaUpload className="mr-2 text-red-500" />
                        Sube tu Comprobante de Pago
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setComprobante(e.target.files[0])}
                        className="w-full bg-slate-800 border border-gray-600 p-4 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 transition-colors"
                    />
                    {comprobante && (
                        <p className="text-green-400 text-sm mt-2">
                            Archivo seleccionado: {comprobante.name}
                        </p>
                    )}
                </div>

                {/* ERROR */}
                {error && (
                    <div className="bg-red-900/50 border border-red-500 p-4 rounded-xl mb-6">
                        <p className="text-red-300 text-sm">{error}</p>
                    </div>
                )}

                {/* CONFIRMAR */}
                <button
                    onClick={confirmarPago}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Procesando...
                        </div>
                    ) : (
                        "Confirmar Pago"
                    )}
                </button>

                {/* Footer opcional con identidad */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-xs">
                        Pagos seguros con [Nombre de tu Tienda/Equipo]
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Payment;