import { useEffect, useState, useRef } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

function AdminJugadores() {
    const [jugadores, setJugadores] = useState([]);
    const [form, setForm] = useState({
        nombre: "", numero: "", posicion: ""
    });
    const [foto, setFoto] = useState(null);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState(""); // Para mostrar errores en la UI
    const fileInputRef = useRef(null); // Ref para resetear el input de archivo

    async function cargarJugadores() {
        try {
            const data = await apiGet("/jugadores");
            setJugadores(data);
        } catch (error) {
            setError("Error al cargar jugadores");
            console.error(error)
        }
    }

    useEffect(() => {
        cargarJugadores();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("numero", form.numero),
        formData.append("posicion", form.posicion);
        if (foto) formData.append("foto", foto);

        try {
            if (editando) {
                await apiPost(`/jugadores/${editando}`, formData, true, "PUT");
            } else {
                await apiPost("/jugadores",formData, true)
            }

            resetForm();
            cargarJugadores();
        } catch (error) {
            setError("Error al guardar el jugador");
            console.error(error);
        }
    }

    function resetForm() {
        setForm({ nombre: "", numero: "", posicion: "" });
        setFoto(null);
        setEditando(null);
        setError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Resetear el input de archivo
        }
    }

    function editarJugador(jugador) {
        setEditando(jugador._id);
        setForm({
            nombre: jugador.nombre,
            numero: jugador.numero,
            posicion: jugador.posicion
        });
        setFoto(null);
    }

    async function handleDelete(id) {
        if (!confirm("¿Eliminar jugador?")) return;

        try {
            await apiDelete(`/jugadores/${id}`);
            cargarJugadores();
        } catch (error) {
            setError("Error al eliminar el jugador");
            console.error(error);
        }
    }

    return (
        <main className="min-h-screen bg-[#020617] text-white pt-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* TITLE */}
                <h1 className="text-3xl font-extrabold mb-10">Panel Admin - Jugadores</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-xl mb-2">
                    <input type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} className="bg-slate-900 p-3 rounded" required />
                    <input type="number" placeholder="Número" value={form.numero} onChange={(e) => setForm({...form, numero: e.target.value})} className="bg-slate-900 p-3 rounded" required />
                    <select value={form.posicion} onChange={(e) => setForm({...form, posicion: e.target.value})} className="bg-slate-900 p-3 rounded">
                        <option value="">Seleccionar posición</option> {/* Agregado para placeholder */}
                        <option value="Portero">Portero</option>
                        <option value="Defensa">Defensa</option>
                        <option value="Mediocampista">Mediocampista</option>
                        <option value="Delantero">Delantero</option>
                    </select>
                    <input ref={fileInputRef} type="file" accept="image/*" placeholder="URL Foto" onChange={(e) => setFoto(e.target.files[0])} className="bg-slate-900 p-3 rounded" required />

                    <button className="md:col-span-5 bg-red-600 hover:bg-red-700 transition py-3 rounded font-semibold">
                        {editando ? "Actualizar Jugador" : "Agregar Jugador"}
                    </button>

                    {editando && (
                        <button type="button" onClick={resetForm} className="md:col-span-5 text-gray-400 text-sm hover:text-white">Cancelar</button>
                    )}
                </form>

                {/* LISTA */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jugadores.map((jugador) => (
                        <div key={jugador._id} className="bg-black border border-gray-800 rounded-xl p-5 flex gap-4 items-center">
                            <img src={jugador.foto?.url} alt={jugador.nombre} className="w-20 h-20 rounded-full object-cover border" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">#{jugador.numero} {jugador.nombre}</h3>
                                <p className="text-gray-400 text-sm">{jugador.posicion}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button onClick={() => editarJugador(jugador)} className="text-yellow-400 text-sm hover:text-yellow-300">Editar</button>
                                <button onClick={() => handleDelete(jugador._id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default AdminJugadores;