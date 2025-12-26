import { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

function AdminPartidos() {
    const [partidos, setPartidos] = useState([]);
    const [form, setForm] = useState({
        local: "",
        rival: "",
        fecha: "",
        lugar: "",
        competicion: "",
        logoLocal: "",
        logoRival: "",
    });

    async function cargarPartidos() {
        const data = await apiGet("/partidos");
        setPartidos(data);
    }

    useEffect(() => {
        cargarPartidos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            local: form.local,
            rival: form.rival,
            fecha: form.fecha,
            lugar: form.lugar,
            competicion: form.competicion,
            logo: {
                local: form.logoLocal,
                rival: form.logoRival
            }
        };

        await apiPost("/partidos", data, true);
        setForm({ local: "", rival: "", fecha: "", lugar: "", competicion: "", logoLocal: "", logoRival: "" });
        cargarPartidos();
    }

    async function eliminar(id) {
        await apiDelete(`/partidos/${id}`, true);
        cargarPartidos();
    }

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Gestionar Partidos</h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 rounded-xl">
                <input placeholder="Local" value={form.local} onChange={e => setForm({...form, local: e.target.value})} />
                <input placeholder="Rival" value={form.rival} onChange={e => setForm({...form, rival: e.target.value})} />
                <input placeholder="Fecha" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} />
                <input placeholder="Lugar" value={form.lugar} onChange={e => setForm({...form, lugar: e.target.value})} />
                <input placeholder="Competicion" value={form.competicion} onChange={e => setForm({...form, competicion: e.target.value})} />
                <input placeholder="URL Logo Local" value={form.logoLocal} onChange={e => setForm({...form, logoLocal: e.target.value})} />
                <input placeholder="URL Logo Rival" value={form.logoRival} onChange={e => setForm({...form, logoRival: e.target.value})} />

                <button className="col-span-full bg-red-600 py-2 rounded">Crear Partido</button>
            </form>

            {/* LISTA */}
            <div className="space-y-4">
                {partidos.map(p => (
                    <div key={p._id} className="flex justify-between bg-gray-800 p-4 rounded">
                        <div className="flex items-center gap-4">
                            <img src={p.logo?.local} className="w-8 h-8 object-contain" />
                            <span>{p.local} vs {p.rival}</span>
                            <img src={p.logo?.rival} className="w-8 h-8 object-contain" />
                            <span>{p.fecha}</span>
                        </div>

                        <button onClick={() => eliminar(p._id)} className="text-red-500">Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminPartidos;