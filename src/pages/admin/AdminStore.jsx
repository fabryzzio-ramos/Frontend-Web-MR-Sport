import { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

function AdminStore() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: null
    });

    async function cargarProductos() {
        const data = await apiGet("/productos");
        setProductos(data);
    }

    useEffect(() => {
        cargarProductos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("precio", form.precio);
        formData.append("descripcion", form.descripcion);
        if (form.imagen) {
            formData.append("imagen", form.imagen);
        }

        await apiPost("/productos", {
            method: "POST",
            credentials: "include",
            body: formData
        });

        setForm({ nombre: "", precio: "", descripcion: "", imagen: null });
        cargarProductos();
    }

    async function eliminar(id) {
        if (!confirm("¿Eliminar producto?")) return;

        await apiDelete(`/productos/${id}`);
        cargarProductos();
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Store</h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 mb-8">
                <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} className="bg-slate-900 p-3 rounded" />
                <input placeholder="Precio" type="number" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} className="bg-slate-900 p-3 rounded" />
                <input placeholder="Descripcion" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} className="bg-slate-900 p-3 rounded" />
                <input type="file" accept="image/*" placeholder="Imagen" onChange={e => setForm({...form, imagen: e.target.files[0]})} className="bg-slate-900 p-3 rounded" />

                <button className="bg-red-600 py-3 rounded col-span-full">Agregar producto</button>
            </form>

            {/* LISTA */}
            <div className="grid gap-4">
                {productos.map(p => (
                    <div key={p._id} className="bg-slate-900 p-4 rounded flex justify-between">
                        <div>
                            <img src={p.imagen?.url || "https://via.placeholder.com/80"} alt={p.nombre} className="w-20 h-20 object-cover rounded" />
                            <p className="font-semibold">{p.nombre}</p>
                            <p className="text-gray-400">S/. {p.precio}</p>
                            <p className="text-gray-400">{p.descripcion}</p>
                        </div>

                        <button onClick={() => eliminar(p._id)} className="text-red-500">Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminStore;