import { useEffect, useState, useRef, useMemo } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

// Constantes para posiciones y textos
const POSICIONES = [
    { value: "Portero", label: "Portero" },
    { value: "Defensa", label: "Defensa" },
    { value: "Mediocampista", label: "Mediocampista" },
    { value: "Delantero", label: "Delantero" },
];

const TEXTOS = {
    title: "Panel Admin - Jugadores",
    addPlayer: "Agregar Jugador",
    updatePlayer: "Actualizar Jugador",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    loading: "Cargando...",
    saving: "Guardando...",
    deleting: "Eliminando...",
    errorLoad: "Error al cargar jugadores",
    errorSave: "Error al guardar el jugador",
    errorDelete: "Error al eliminar el jugador",
    confirmDelete: "¿Estás seguro de que quieres eliminar este jugador?",
};

function FormularioJugador({ form, setForm, foto, setFoto, preview, setPreview, editando, handleSubmit, resetForm, error, isSaving, fileInputRef }) {
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg mb-8">
        <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
            type="text"
            placeholder="Nombre del jugador"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.nombre ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Nombre del jugador"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Número</label>
            <input
            type="number"
            placeholder="Número"
            value={form.numero}
            onChange={(e) => setForm({ ...form, numero: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.numero ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Número del jugador"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Posición</label>
            <select
            value={form.posicion}
            onChange={(e) => setForm({ ...form, posicion: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.posicion ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Posición del jugador"
            >
            <option value="">Seleccionar posición</option>
            {POSICIONES.map((pos) => (
                <option key={pos.value} value={pos.value}>{pos.label}</option>
            ))}
            </select>
        </div>
        <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Foto</label>
            <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0];
                setFoto(file);
                if (file) setPreview(URL.createObjectURL(file));
            }}
            className="w-full bg-slate-900 p-3 rounded border border-gray-600 focus:border-red-500 focus:outline-none transition"
            required={!editando}
            aria-label="Foto del jugador"
            />
        </div>
        {preview && (
            <div className="md:col-span-2 flex justify-center">
            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full border-2 border-red-500 shadow-lg" />
            </div>
        )}
        {error && <p className="md:col-span-2 text-red-500 text-sm">{error}</p>}
        <button
            type="submit"
            disabled={isSaving}
            className="md:col-span-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 transition py-3 rounded font-semibold shadow-md"
            aria-label={editando ? TEXTOS.updatePlayer : TEXTOS.addPlayer}
        >
            {isSaving ? TEXTOS.saving : (editando ? TEXTOS.updatePlayer : TEXTOS.addPlayer)}
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

function ListaJugadores({ jugadores, editarJugador, handleDelete, isDeleting }) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jugadores.map((jugador) => (
            <div
            key={jugador._id}
            className="bg-gradient-to-br from-black to-gray-900 border border-gray-800 rounded-xl p-5 flex gap-4 items-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
            <img
                src={jugador.foto?.url}
                alt={jugador.nombre}
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500"
            />
            <div className="flex-1">
                <h3 className="font-bold text-lg">#{jugador.numero} {jugador.nombre}</h3>
                <p className="text-gray-400 text-sm">{jugador.posicion}</p>
            </div>
            <div className="flex flex-col gap-2">
                <button
                onClick={() => editarJugador(jugador)}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition"
                aria-label={`Editar ${jugador.nombre}`}
                >
                ✏️ {TEXTOS.edit}
                </button>
                <button
                onClick={() => handleDelete(jugador._id)}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 disabled:text-gray-500 text-sm font-medium transition"
                aria-label={`Eliminar ${jugador.nombre}`}
                >
                🗑️ {isDeleting ? TEXTOS.deleting : TEXTOS.delete}
                </button>
            </div>
            </div>
        ))}
        </div>
    );
}

function AdminJugadores() {
    const [jugadores, setJugadores] = useState([]);
    const [form, setForm] = useState({ nombre: "", numero: "", posicion: "" });
    const [foto, setFoto] = useState(null);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputRef = useRef(null);

    async function cargarJugadores() {
        setIsLoading(true);
        try {
        const data = await apiGet("/jugadores");
        setJugadores(data);
        } catch (err) {
        setError(TEXTOS.errorLoad);
        console.error(err);
        } finally {
        setIsLoading(false);
        }
    }

    useEffect(() => {
        cargarJugadores();
    }, []);

    useEffect(() => {
        return () => {
        if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setIsSaving(true);

        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("numero", form.numero);
        formData.append("posicion", form.posicion);
        if (foto) formData.append("foto", foto);

        try {
        if (editando) {
            await apiPost(`/jugadores/${editando}`, formData, true, "PUT");
        } else {
            await apiPost("/jugadores", formData, true);
        }
        resetForm();
        cargarJugadores();
        } catch (err) {
        setError(TEXTOS.errorSave);
        console.error(err);
        } finally {
        setIsSaving(false);
        }
    }

    function resetForm() {
        setForm({ nombre: "", numero: "", posicion: "" });
        setFoto(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setEditando(null);
        setError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function editarJugador(jugador) {
        setEditando(jugador._id);
        setForm({
        nombre: jugador.nombre,
        numero: jugador.numero,
        posicion: jugador.posicion,
        });
        setPreview(jugador.foto?.url || null);
        setFoto(null);
    }

    async function handleDelete(id) {
        if (!window.confirm(TEXTOS.confirmDelete)) return;
        setIsDeleting(true);
        try {
        await apiDelete(`/jugadores/${id}`);
        cargarJugadores();
        } catch (err) {
        setError(TEXTOS.errorDelete);
        console.error(err);
        } finally {
        setIsDeleting(false);
        }
    }

    const listaJugadores = useMemo(() => (
        <ListaJugadores
        jugadores={jugadores}
        editarJugador={editarJugador}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
        />
    ), [jugadores, isDeleting]);

    if (isLoading) {
        return (
        <main className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mr-4"></div>
            <p>{TEXTOS.loading}</p>
        </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#020617] text-white pt-32 px-6">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-extrabold mb-10">{TEXTOS.title}</h1>
            {error && <p className="text-red-500 mb-4 bg-red-900 p-3 rounded">{error}</p>}

            <FormularioJugador
            form={form}
            setForm={setForm}
            foto={foto}
            setFoto={setFoto}
            preview={preview}
            setPreview={setPreview}
            editando={editando}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            error={error}
            isSaving={isSaving}
            fileInputRef={fileInputRef}
            />

            {listaJugadores}
        </div>
        </main>
    );
}

export default AdminJugadores;