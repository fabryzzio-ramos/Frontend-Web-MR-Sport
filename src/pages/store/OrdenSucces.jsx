import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrdenSuccess() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="max-w-md w-full bg-[#020617] border border-white/10 rounded-3xl p-8 text-center">
                <CheckCircle size={72} className="text-green-500 mx-auto mb-6" />

                <h1 className="text-3xl font-extrabold text-white mb-3">¡Compra realizada!</h1>

                <p className="text-gray-400 mb-8">Tu pedido fue registrado correctamente.
                    Te contactaremos cuando sea enviado.
                </p>

                <div className="flex flex-col gap-4">
                    <Link to="/tienda" className="bg-red-600 hover:bg-red-700 transition py-3 rounded-full font-semibold">Seguir comprando</Link>
                    <Link to="/tienda/mis-ordenes" className="border border-white/20 hover:border-white/40 transition py-3 rounded-full text-sm">Ver mis ordenes</Link>
                </div>
            </div>
        </main>
    );
}

export default OrdenSuccess;