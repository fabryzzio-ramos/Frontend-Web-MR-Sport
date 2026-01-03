import { useEffect, useState, useRef, useMemo } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

// Constantes para textos y campos
const TEXTOS = {
    title: "Gestionar Partidos",
    addMatch: "Crear Partido",
    updateMatch: "Actualizar Partido",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    loading: "Cargando...",
    saving: "Guardando...",
    deleting: "Eliminando...",
    errorLoad: "Error al cargar partidos",
    errorSave: "Error al guardar el partido",
    errorDelete: "Error al eliminar el partido",
    confirmDelete: "¿Estás seguro de que quieres eliminar este partido?",
    requiredFields: "Los campos obligatorios son: Local, Rival, Fecha y Competencia",
};

function FormularioPartido({
    form,
    setForm,
    logoLocal,
    setLogoLocal,
    logoRival,
    setLogoRival,
    previewLocal,
    setPreviewLocal,
    previewRival,
    setPreviewRival,
    editando,
    handleSubmit,
    resetForm,
    error,
    isSaving,
    fileInputLocalRef,
    fileInputRivalRef,
    }) {
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg mb-8">
        <div>
            <label className="block text-sm font-medium mb-2">Local</label>
            <input
            type="text"
            placeholder="Equipo local"
            value={form.local}
            onChange={(e) => setForm({ ...form, local: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.local ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Equipo local"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Rival</label>
            <input
            type="text"
            placeholder="Equipo rival"
            value={form.rival}
            onChange={(e) => setForm({ ...form, rival: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.rival ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Equipo rival"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Fecha</label>
            <input
            type="date"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.fecha ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Fecha del partido"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Lugar</label>
            <input
            type="text"
            placeholder="Lugar del partido"
            value={form.lugar}
            onChange={(e) => setForm({ ...form, lugar: e.target.value })}
            className="w-full bg-slate-900 p-3 rounded border border-gray-600 focus:border-red-500 focus:outline-none transition"
            aria-label="Lugar del partido"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Competición</label>
            <input
            type="text"
            placeholder="Nombre de la competición"
            value={form.competicion}
            onChange={(e) => setForm({ ...form, competicion: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.competicion ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Competición"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Resultado</label>
            <input
            type="text"
            placeholder="Resultado (ej. 2-1)"
            value={form.resultado}
            onChange={(e) => setForm({ ...form, resultado: e.target.value })}
            className="w-full bg-slate-900 p-3 rounded border border-gray-600 focus:border-red-500 focus:outline-none transition"
            aria-label="Resultado del partido"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Logo Local</label>
            <input
            ref={fileInputLocalRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0];
                setLogoLocal(file);
                if (file) setPreviewLocal(URL.createObjectURL(file));
            }}
            className="w-full bg-slate-900 p-3 rounded border border-gray-600 focus:border-red-500 focus:outline-none transition"
            aria-label="Logo del equipo local"
            />
            {previewLocal && (
            <div className="mt-2 w-20 h-20 bg-black rounded flex items-center justify-center border border-gray-600">
                <img src={previewLocal} alt="Preview Logo Local" className="max-w-full max-h-full object-contain" />
            </div>
            )}
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Logo Rival</label>
            <input
            ref={fileInputRivalRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0];
                setLogoRival(file);
                if (file) setPreviewRival(URL.createObjectURL(file));
            }}
            className="w-full bg-slate-900 p-3 rounded border border-gray-600 focus:border-red-500 focus:outline-none transition"
            aria-label="Logo del equipo rival"
            />
            {previewRival && (
            <div className="mt-2 w-20 h-20 bg-black rounded flex items-center justify-center border border-gray-600">
                <img src={previewRival} alt="Preview Logo Rival" className="max-w-full max-h-full object-contain" />
            </div>
            )}
        </div>
        {error && <p className="md:col-span-2 text-red-500 text-sm">{error}</p>}
        <button
            type="submit"
            disabled={isSaving}
            className="md:col-span-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 transition py-3 rounded font-semibold shadow-md"
            aria-label={editando ? TEXTOS.updateMatch : TEXTOS.addMatch}
        >
            {isSaving ? TEXTOS.saving : (editando ? TEXTOS.updateMatch : TEXTOS.addMatch)}
        </button>
        {editando && (
            <button
            type="button"
            onClick={resetForm}
            className="md:col-span-2 text-gray-400 hover:text-white text-sm transition"
            >
            {TEXTOS.cancel}
            </button>
        )}
        </form>
    );
}

function ListaPartidos({ partidos, editarPartido, eliminar, isDeleting }) {
    return (
        <div className="space-y-4">
        {partidos.map((p) => (
            <div
            key={p._id}
            className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
            <div className="flex items-center gap-4">
                {p.logo?.local?.url ? (
                <img src={p.logo.local.url} alt={p.local} className="w-10 h-10 object-contain rounded" />
                ) : (
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                )}
                <div>
                <span className="font-semibold">{p.local} vs {p.rival}</span>
                <p className="text-sm text-gray-400">{new Date(p.fecha).toLocaleDateString()} - {p.competicion}</p>
                </div>
                {p.logo?.rival?.url ? (
                <img src={p.logo.rival.url} alt={p.rival} className="w-10 h-10 object-contain rounded" />
                ) : (
                <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                )}
            </div>
            <div className="flex gap-2">
                <button
                onClick={() => editarPartido(p)}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition"
                aria-label={`Editar partido ${p.local} vs ${p.rival}`}
                >
                ✏️ {TEXTOS.edit}
                </button>
                <button
                onClick={() => eliminar(p._id)}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 disabled:text-gray-500 text-sm font-medium transition"
                aria-label={`Eliminar partido ${p.local} vs ${p.rival}`}
                >
                🗑️ {isDeleting ? TEXTOS.deleting : TEXTOS.delete}
                </button>
            </div>
            </div>
        ))}
        </div>
    );
}

function AdminPartidos() {
    const [partidos, setPartidos] = useState([]);
    const [form, setForm] = useState({
        local: "",
        rival: "",
        fecha: "",
        lugar: "",
        competicion: "",
        resultado: "",
    });
    const [logoLocal, setLogoLocal] = useState(null);
    const [logoRival, setLogoRival] = useState(null);
    const [previewLocal, setPreviewLocal] = useState(null);
    const [previewRival, setPreviewRival] = useState(null);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputLocalRef = useRef(null);
    const fileInputRivalRef = useRef(null);

    async function cargarPartidos() {
        setIsLoading(true);
        try {
        const data = await apiGet("/partidos");
        setPartidos(data);
        } catch (err) {
        setError(TEXTOS.errorLoad);
        console.error(err);
        } finally {
        setIsLoading(false);
        }
    }

    useEffect(() => {
        cargarPartidos();
    }, []);

    // Limpiar previews para evitar memory leaks
    useEffect(() => {
        return () => {
        if (previewLocal) URL.revokeObjectURL(previewLocal);
        if (previewRival) URL.revokeObjectURL(previewRival);
        };
    }, [previewLocal, previewRival]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.local || !form.rival || !form.fecha || !form.competicion) {
        setError(TEXTOS.requiredFields);
        return;
        }

        setIsSaving(true);
        const formData = new FormData();
        formData.append("local", form.local);
        formData.append("rival", form.rival);
        formData.append("fecha", form.fecha);
        formData.append("lugar", form.lugar);
        formData.append("competicion", form.competicion);
        formData.append("resultado", form.resultado);
        if (logoLocal) formData.append("logoLocal", logoLocal);
        if (logoRival) formData.append("logoRival", logoRival);

        try {
        if (editando) {
            await apiPost(`/partidos/${editando}`, formData, true, "PUT");
        } else {
            await apiPost("/partidos", formData, true);
        }
        resetForm();
        cargarPartidos();
        } catch (err) {
        setError(TEXTOS.errorSave);
        console.error(err);
        } finally {
        setIsSaving(false);
        }
    }

    function resetForm() {
        setForm({ local: "", rival: "", fecha: "", lugar: "", competicion: "", resultado: "" });
        setLogoLocal(null);
        setLogoRival(null);
        if (previewLocal) URL.revokeObjectURL(previewLocal);
        if (previewRival) URL.revokeObjectURL(previewRival);
        setPreviewLocal(null);
        setPreviewRival(null);
        setEditando(null);
        setError("");
        if (fileInputLocalRef.current) fileInputLocalRef.current.value = "";
        if (fileInputRivalRef.current) fileInputRivalRef.current.value = "";
    }

    function editarPartido(partido) {
        setEditando(partido._id);
        setForm({
        local: partido.local,
        rival: partido.rival,
        fecha: partido.fecha ? new Date(partido.fecha).toISOString().split('T')[0] : "",
        lugar: partido.lugar,
        competicion: partido.competicion,
        resultado: partido.resultado || "",
        });
        setPreviewLocal(partido.logo?.local?.url || null);
        setPreviewRival(partido.logo?.rival?.url || null);
        setLogoLocal(null);
        setLogoRival(null);
    }

    async function eliminar(id) {
        if (!window.confirm(TEXTOS.confirmDelete)) return;
        setIsDeleting(true);
        try {
        await apiDelete(`/partidos/${id}`);
        cargarPartidos();
        } catch (err) {
        setError(TEXTOS.errorDelete);
        console.error(err);
        } finally {
        setIsDeleting(false);
        }
    }

    // Memoizar la lista para optimización
    const listaPartidos = useMemo(() => (
        <ListaPartidos
        partidos={partidos}
        editarPartido={editarPartido}
        eliminar={eliminar}
        isDeleting={isDeleting}
        />
    ), [partidos, isDeleting]);

    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-[400px] text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mr-4"></div>
            <p>{TEXTOS.loading}</p>
        </div>
        );
    }

    return (
        <div className="space-y-8 p-6">
        <h2 className="text-2xl font-bold">{TEXTOS.title}</h2>
        {error && <p className="text-red-500 mb-4 bg-red-900 p-3 rounded">{error}</p>}

        <FormularioPartido
            form={form}
            setForm={setForm}
            logoLocal={logoLocal}
            setLogoLocal={setLogoLocal}
            logoRival={logoRival}
            setLogoRival={setLogoRival}
            previewLocal={previewLocal}
            setPreviewLocal={setPreviewLocal}
            previewRival={previewRival}
            setPreviewRival={setPreviewRival}
            editando={editando}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            error={error}
            isSaving={isSaving}
            fileInputLocalRef={fileInputLocalRef}
            fileInputRivalRef={fileInputRivalRef}
        />

        {listaPartidos}
        </div>
    );
}

export default AdminPartidos;