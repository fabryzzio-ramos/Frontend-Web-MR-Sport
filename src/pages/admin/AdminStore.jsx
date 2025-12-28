import { useEffect, useState, useRef } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

function AdminStore() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
    });
    const [imagen, setImagen] = useState(null);
    const [editando, setEditando] = useState(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef(null)

    async function cargarProductos() {
        try {
            const data = await apiGet("/productos");
            setProductos(data);
        } catch (err) {
            setError("Error al cargar productos");
            console.error(err);
        }
    }

    useEffect(() => {
        cargarProductos();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.nombre || !form.precio || !form.descripcion) {
            setError("Todos los campos son obligatorios");
            return;
        }

        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("precio", form.precio);
        formData.append("descripcion", form.descripcion);
        if (form.imagen) {
            formData.append("imagen", imagen);
        }
        
        try {
            if (editando) {
                await apiPost(`/productos/${editando}`, formData, true, "PUT");
            } else {
                await apiPost("/productos",formData, true)
            }

            resetForm();
            cargarProductos();
        } catch (error) {
            setError("Error al guardar el producto");
            console.error(error);
        }
    }

    function resetForm() {
        setForm({ nombre: "", precio: "", descripcion: "" });
        setImagen(null);
        setEditando(null);
        setError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Resetear el input de archivo
        }
    }

    function editarProducto(producto) {
        setEditando(producto._id);
        setForm({
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion
        });
        setImagen(null);
    }

    async function eliminar(id) {
        if (!confirm("¿Eliminar producto?")) return;
        try {
            await apiDelete(`/productos/${id}`);
            cargarProductos();
        } catch (err) {
            setError("Error al eliminar el producto");
            console.error(err);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Store</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4 mb-8">
                <input placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} className="bg-slate-900 p-3 rounded" />
                <input placeholder="Precio" type="number" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} className="bg-slate-900 p-3 rounded" />
                <input placeholder="Descripcion" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} className="bg-slate-900 p-3 rounded" />
                <input type="file" accept="image/*" placeholder="Imagen" onChange={e => setImagen(e.target.files[0])} className="bg-slate-900 p-3 rounded" />

                <button className="md:col-span-5 bg-red-600 hover:bg-red-700 transition py-3 rounded font-semibold">
                    {editando ? "Actualizar Producto" : "Agregar Producto"}
                </button>

                {editando && (
                    <button type="button" onClick={resetForm} className="md:col-span-5 text-gray-400 text-sm hover:text-white">Cancelar</button>
                )}
            </form>

            {/* LISTA */}
            <div className="grid gap-4">
                {productos.map(p => (
                    <div key={p._id} className="bg-slate-900 p-4 rounded flex justify-between">
                        <div>
                            <img src={p.imagen?.url} alt={p.nombre} className="w-20 h-20 object-cover rounded" />
                            <p className="font-semibold">{p.nombre}</p>
                            <p className="text-gray-400">S/. {p.precio}</p>
                            <p className="text-gray-400">{p.descripcion}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button onClick={() => editarProducto(p)} className="text-yellow-400 text-sm hover:text-yellow-300">Editar</button>
                            <button onClick={() => eliminar(p._id)} className="text-red-500">Eliminar</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminStore;