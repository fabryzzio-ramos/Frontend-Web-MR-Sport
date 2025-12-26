import { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

function AdminJugadores() {
    const [jugadores, setJugadores] = useState([]);
    const [form, setForm] = useState({
        nombre: "", numero: "", posicion: "", foto: ""
    });

    const token = localStorage.getItem("token");

    async function cargarJugadores() {
        try {
            const data = await apiGet("/jugadores");
            setJugadores(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        cargarJugadores();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await apiPost("/jugadores", form, true);
            setForm({ nombre: "", numero: "", posicion: "", foto:"" });
            cargarJugadores();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDelete(id) {
        if (!confirm("¿Eliminar jugador?")) return;

        try {
            await apiDelete(`/jugadores/${id}`, true);
            cargarJugadores();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="min-h-screen bg-[#020617] text-white pt-32 px-6">
            <div className="max-x-7xl mx-auto">
                {/* TITLE */}
                <h1 className="text-3xl font-extrabold mb-10">Panel Admin - Jugadores</h1>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="bg-[#020617] border border-gray-800 rounded-xl p-6 grid md:grid-cols-5 gap:4 mb-14">
                    <input type="text" placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({...form, nombre: e.target.value})} className="bg-black border border-gray-700 px-4 py-2 rounded" required />
                    <input type="number" placeholder="Número" value={form.numero} onChange={(e) => setForm({...form, numero: e.target.value})} className="bg-black border border-gray-700 px-4 py-2 rounded" required />
                    <select value={form.posicion} onChange={(e) => setForm({...form, posicion: e.target.value})} className="bg-black border border-gray-700 px-4 py-2 rounded">
                        <option>Portero</option>
                        <option>Defensa</option>
                        <option>Mediocampista</option>
                        <option>Delantero</option>
                    </select>
                    <input type="text" placeholder="URL Foto" value={form.foto} onChange={(e) => setForm({...form, foto: e.target.value})} className="bg-black border border-gray-700 px-4 py-2 rounded" required />

                    <button className="md:col-span-5 bg-red-600 hover:bg-red-700 transition py-3 rounded font-semibold">Agregar Jugador</button>
                </form>

                {/* LISTA */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jugadores.map((jugador) => (
                        <div key={jugador._id} className="bg-black border border-gray-800 rounded-xl p-5 flex gap-4 items-center">
                            <img src={jugador.foto || "https://via.placeholder.com/80"} alt={jugador.nombre} className="w-20 h-20 rounded-full object-cover border" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">#{jugador.numero} {jugador.nombre}</h3>
                                <p className="text-gray-400 text-sm">{jugador.posicion}</p>
                            </div>

                            <button onClick={() => handleDelete(jugador._id)} className="text-red-500 hover:text-red-700 text-sm">Eliminar</button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default AdminJugadores;