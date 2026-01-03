import { useEffect, useState, useMemo } from "react";
import { apiGet, apiPost } from "../../services/api";

const ESTADOS = {
    PENDIENTE: "pendiente",
    PAGADO: "pagado",
    ENVIADO: "enviado",
};

const TEXTOS = {
    title: "Órdenes",
    noOrders: "No hay órdenes aún",
    loading: "Cargando órdenes...",
    updating: "Actualizando...",
    errorLoad: "Error al cargar órdenes",
    errorUpdate: "Error al cambiar estado",
    confirmPaid: "¿Marcar esta orden como pagada?",
    confirmSent: "¿Marcar esta orden como enviada?",
    markPaid: "Marcar pagado",
    markSent: "Marcar enviado",
    total: "Total",
    date: "Fecha",
    customer: "Cliente",
    products: "Productos",
};

const getEstadoClase = (estado) => {
    switch (estado) {
        case ESTADOS.PENDIENTE:
        return { clase: "bg-yellow-500/20 text-yellow-400", icono: "⏳" };
        case ESTADOS.PAGADO:
        return { clase: "bg-green-500/20 text-green-400", icono: "✅" };
        case ESTADOS.ENVIADO:
        return { clase: "bg-blue-500/20 text-blue-400", icono: "📦" };
        default:
        return { clase: "bg-gray-500/20 text-gray-400", icono: "❓" };
    }
};

function ListaOrdenes({ ordenes, cambiarEstado, isUpdating }) {
    return (
        <div className="space-y-4">
        {ordenes.map((orden) => {
            const { clase, icono } = getEstadoClase(orden.estado);
            return (
            <div
                key={orden._id}
                className="bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow duration-300"
                role="article"
                aria-label={`Orden de ${orden.usuario?.nombre}`}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-sm text-gray-400">{TEXTOS.customer}</p>
                    <p className="font-semibold">{orden.usuario?.nombre} - {orden.usuario?.correo}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${clase}`}>
                    {icono} {orden.estado}
                </span>
                </div>

                {/* PRODUCTOS */}
                <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-300">{TEXTOS.products}</p>
                {orden.productos.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-300">
                    <span>{item.producto?.nombre} x {item.cantidad}</span>
                    <span>S/ {item.precio * item.cantidad}</span>
                    </div>
                ))}
                </div>

                {/* BOTONES */}
                <div className="flex gap-2 mb-4">
                {orden.estado !== ESTADOS.PAGADO && (
                    <button
                    onClick={() => cambiarEstado(orden._id, ESTADOS.PAGADO)}
                    disabled={isUpdating}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-sm transition"
                    aria-label={`Marcar orden como pagada`}
                    >
                    {isUpdating ? TEXTOS.updating : TEXTOS.markPaid}
                    </button>
                )}
                {orden.estado !== ESTADOS.ENVIADO && (
                    <button
                    onClick={() => cambiarEstado(orden._id, ESTADOS.ENVIADO)}
                    disabled={isUpdating}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-sm transition"
                    aria-label={`Marcar orden como enviada`}
                    >
                    {isUpdating ? TEXTOS.updating : TEXTOS.markSent}
                    </button>
                )}
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                <p className="text-gray-400 text-sm">{TEXTOS.date}: {new Date(orden.createdAt).toLocaleDateString()}</p>
                <p className="text-lg font-bold text-red-500">{TEXTOS.total}: S/ {orden.total}</p>
                </div>
            </div>
            );
        })}
        </div>
    );
}

function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    async function cargarOrdenes() {
        setLoading(true);
        try {
        const data = await apiGet("/ordenes");
        setOrdenes(data);
        } catch (err) {
        setError(TEXTOS.errorLoad);
        console.error(err);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        cargarOrdenes();
    }, []);

    async function cambiarEstado(id, estado) {
        const confirmMessage = estado === ESTADOS.PAGADO ? TEXTOS.confirmPaid : TEXTOS.confirmSent;
        if (!window.confirm(confirmMessage)) return;

        setIsUpdating(true);
        try {
        await apiPost(`/ordenes/${id}/estado`, { estado });
        cargarOrdenes();
        } catch (err) {
        setError(TEXTOS.errorUpdate);
        console.error(err);
        } finally {
        setIsUpdating(false);
        }
    }

    // Memoizar la lista para optimización
    const listaOrdenes = useMemo(() => (
        <ListaOrdenes
        ordenes={ordenes}
        cambiarEstado={cambiarEstado}
        isUpdating={isUpdating}
        />
    ), [ordenes, isUpdating]);

    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-[400px] text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mr-4"></div>
            <p>{TEXTOS.loading}</p>
        </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-white">{TEXTOS.title}</h1>

        {error && <p className="text-red-500 mb-4 bg-red-900 p-3 rounded">{error}</p>}

        {ordenes.length === 0 ? (
            <p className="text-gray-400">{TEXTOS.noOrders}</p>
        ) : (
            listaOrdenes
        )}
        </div>
    );
}

export default AdminOrdenes;