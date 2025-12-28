import { useEffect, useState, useRef } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

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
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState("");
    const fileInputLocalRef = useRef(null);
    const fileInputRivalRef = useRef(null);

    async function cargarPartidos() {
        try {
            const data = await apiGet("/partidos");
            setPartidos(data);
        } catch (err) {
            setError("Error al cargar partidos");
            console.error(err);
        }
    }

    useEffect(() => {
        cargarPartidos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.local || !form.rival || !form.fecha || !form.competicion) {
            setError("Los campos obligatorios son: Local, Rival, Fecha y Competencia");
            return;
        }

        const formData = new FormData();
        formData.append("local", form.local);
        formData.append("rival", form.rival);
        formData.append("fecha", form.fecha);
        formData.append("lugar", form.lugar);
        formData.append("competicion", form.competicion);
        formData.append("resultado", form.resultado);
        if (logoLocal) {
            formData.append("logoLocal", logoLocal);  // Nombre del campo debe coincidir con multer en backend
        }
        if (logoRival) {
            formData.append("logoRival", logoRival);
        }
        
        try {
            if (editando) {
                await apiPost(`/partidos/${editando}`, formData, true, "PUT");
            } else {
                await apiPost("/partidos", formData, true);
            }
            resetForm();
            cargarPartidos();
        } catch (error) {
            setError("Error al guardar el partido");
            console.error(error);
        }
    }

    function resetForm() {
        setForm({ local: "", rival: "", fecha: "", lugar: "", competicion: "", resultado: "" });
        setLogoLocal(null);
        setLogoRival(null);
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
            fecha: partido.fecha,
            lugar: partido.lugar,
            competicion: partido.competicion,
            resultado: partido.resultado || "",
        });
        setLogoLocal(null);  // No pre-cargar archivos existentes; el usuario puede subir nuevos
        setLogoRival(null);
    }

    async function eliminar(id) {
        if (!confirm("¿Eliminar partido?")) return;
        try {
            await apiDelete(`/partidos/${id}`);
            cargarPartidos();
        } catch (err) {
            setError("Error al eliminar el partido");
            console.error(err);
        }
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Gestionar Partidos</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-xl">
                <input placeholder="Local" value={form.local} onChange={e => setForm({...form, local: e.target.value})} className="bg-slate-900 p-3 rounded"  />
                <input placeholder="Rival" value={form.rival} onChange={e => setForm({...form, rival: e.target.value})} className="bg-slate-900 p-3 rounded"  />
                <input placeholder="Fecha" type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} className="bg-slate-900 p-3 rounded"  />
                <input placeholder="Lugar" value={form.lugar} onChange={e => setForm({...form, lugar: e.target.value})} className="bg-slate-900 p-3 rounded"  />
                <input placeholder="Competicion" value={form.competicion} onChange={e => setForm({...form, competicion: e.target.value})} className="bg-slate-900 p-3 rounded"  />
                <input placeholder="Resultado" value={form.resultado} onChange={e => setForm({...form, resultado: e.target.value})} className="bg-slate-900 p-3 rounded"  />
                <input ref={fileInputLocalRef} type="file" accept="image/*" placeholder="URL Logo Local" onChange={e => setLogoLocal(e.target.files[0])} className="bg-slate-900 p-3 rounded"  />
                <input ref={fileInputRivalRef} type="file" accept="image/*" placeholder="URL Logo Rival" onChange={e => setLogoRival(e.target.files[0])} className="bg-slate-900 p-3 rounded"  />

                <button className="col-span-full bg-red-600 hover:bg-red-700 transition py-3 rounded font-semibold">
                    {editando ? "Actualizar Partido" : "Crear Partido"}
                </button>

                {editando && (
                    <button type="button" onClick={resetForm} className="col-span-full text-gray-400 text-sm hover:text-white">
                        Cancelar
                    </button>
                )}
            </form>

            {/* LISTA */}
            <div className="space-y-4">
                {partidos.map(p => (
                    <div key={p._id} className="flex justify-between bg-gray-800 p-4 rounded">
                        <div className="flex items-center gap-4">
                            {p.logo?.local ? (
                                <img src={p.logo.local} alt={p.local} className="w-8 h-8 object-contain" />
                            ) : (
                                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                            )}
                            <span>{p.local} vs {p.rival}</span>
                            {p.logo?.rival ? (
                                <img src={p.logo.rival} alt={p.rival} className="w-8 h-8 object-contain" />
                            ) : (
                                <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                            )}
                            <span>{new Date(p.fecha).toLocaleDateString()}</span>  {/* Formatea fecha */}
                        </div>

                        <div className="flex gap-2">
                            <button onClick={() => editarPartido(p)} className="text-yellow-400 text-sm hover:text-yellow-300">
                                Editar
                            </button>
                            <button onClick={() => eliminar(p._id)} className="text-red-500">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPartidos;