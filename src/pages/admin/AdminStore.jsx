import { useEffect, useState, useRef, useMemo } from "react";
import { apiGet, apiPost, apiDelete } from "../../services/api";

const TEXTOS = {
    title: "Admin Store",
    addProduct: "Agregar Producto",
    updateProduct: "Actualizar Producto",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Eliminar",
    loading: "Cargando...",
    saving: "Guardando...",
    deleting: "Eliminando...",
    errorLoad: "Error al cargar productos",
    errorSave: "Error al guardar el producto",
    errorDelete: "Error al eliminar el producto",
    confirmDelete: "¿Estás seguro de que quieres eliminar este producto?",
    requiredFields: "Todos los campos son obligatorios",
};

function FormularioProducto({
    form,
    setForm,
    imagen,
    setImagen,
    preview,
    setPreview,
    editando,
    handleSubmit,
    resetForm,
    error,
    isSaving,
    fileInputRef,
    }) {
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg mb-8">
        <div>
            <label className="block text-sm font-medium mb-2">Nombre</label>
            <input
            type="text"
            placeholder="Nombre del producto"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.nombre ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Nombre del producto"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Precio</label>
            <input
            type="number"
            placeholder="Precio en soles"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.precio ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Precio del producto"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Descripción</label>
            <input
            type="text"
            placeholder="Descripción breve"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.descripcion ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Descripción del producto"
            />
        </div>
        <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <input
            type="number"
            placeholder="Cantidad en stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className={`w-full bg-slate-900 p-3 rounded border ${error && !form.stock ? 'border-red-500' : 'border-gray-600'} focus:border-red-500 focus:outline-none transition`}
            required
            aria-label="Stock del producto"
            />
        </div>
        <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Imagen</label>
            <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
                const file = e.target.files[0];
                setImagen(file);
                if (file) setPreview(URL.createObjectURL(file));
            }}
            className="w-full bg-slate-900 p-3 rounded border border-gray-600 focus:border-red-500 focus:outline-none transition"
            required={!editando}
            aria-label="Imagen del producto"
            />
        </div>
        {preview && (
            <div className="md:col-span-3 flex justify-center">
            <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-full border-2 border-red-500 shadow-lg" />
            </div>
        )}
        {error && <p className="md:col-span-3 text-red-500 text-sm">{error}</p>}
        <button
            type="submit"
            disabled={isSaving}
            className="md:col-span-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 transition py-3 rounded font-semibold shadow-md"
            aria-label={editando ? TEXTOS.updateProduct : TEXTOS.addProduct}
        >
            {isSaving ? TEXTOS.saving : (editando ? TEXTOS.updateProduct : TEXTOS.addProduct)}
        </button>
        {editando && (
            <button
            type="button"
            onClick={resetForm}
            className="md:col-span-3 text-gray-400 hover:text-white text-sm transition"
            >
            {TEXTOS.cancel}
            </button>
        )}
        </form>
    );
}

function ListaProductos({ productos, editarProducto, eliminar, isDeleting }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {productos.map((p) => (
            <div
            key={p._id}
            className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex justify-between items-start"
            >
            <div className="flex gap-4">
                <img
                src={p.imagen?.url}
                alt={p.nombre}
                className="w-20 h-20 object-cover rounded border border-gray-600"
                />
                <div>
                <p className="font-semibold text-lg">{p.nombre}</p>
                <p className="text-gray-400">S/. {p.precio}</p>
                <p className="text-gray-400 text-sm">{p.descripcion}</p>
                <p className="text-gray-400 text-sm">Stock: {p.stock}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <button
                onClick={() => editarProducto(p)}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition"
                aria-label={`Editar ${p.nombre}`}
                >
                ✏️ {TEXTOS.edit}
                </button>
                <button
                onClick={() => eliminar(p._id)}
                disabled={isDeleting}
                className="text-red-500 hover:text-red-700 disabled:text-gray-500 text-sm font-medium transition"
                aria-label={`Eliminar ${p.nombre}`}
                >
                🗑️ {isDeleting ? TEXTOS.deleting : TEXTOS.delete}
                </button>
            </div>
            </div>
        ))}
        </div>
    );
}

function AdminStore() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
    });
    const [imagen, setImagen] = useState(null);
    const [editando, setEditando] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputRef = useRef(null);

    async function cargarProductos() {
        setIsLoading(true);
        try {
        const data = await apiGet("/productos");
        setProductos(data);
        } catch (err) {
        setError(TEXTOS.errorLoad);
        console.error(err);
        } finally {
        setIsLoading(false);
        }
    }

    useEffect(() => {
        cargarProductos();
    }, []);

    // Limpiar preview para evitar memory leaks
    useEffect(() => {
        return () => {
        if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.nombre || !form.precio || !form.descripcion || !form.stock) {
        setError(TEXTOS.requiredFields);
        return;
        }

        setIsSaving(true);
        const formData = new FormData();
        formData.append("nombre", form.nombre);
        formData.append("precio", form.precio);
        formData.append("descripcion", form.descripcion);
        formData.append("stock", form.stock);
        if (imagen) formData.append("imagen", imagen);

        try {
        if (editando) {
            await apiPost(`/productos/${editando}`, formData, true, "PUT");
        } else {
            await apiPost("/productos", formData, true);
        }
        resetForm();
        cargarProductos();
        } catch (err) {
        setError(TEXTOS.errorSave);
        console.error(err);
        } finally {
        setIsSaving(false);
        }
    }

    function resetForm() {
        setForm({ nombre: "", precio: "", descripcion: "", stock: "" });
        setImagen(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        setEditando(null);
        setError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    function editarProducto(producto) {
        setEditando(producto._id);
        setForm({
        nombre: producto.nombre,
        precio: producto.precio,
        descripcion: producto.descripcion,
        stock: producto.stock,
        });
        setPreview(producto.imagen?.url || null);
        setImagen(null);
    }

    async function eliminar(id) {
        if (!window.confirm(TEXTOS.confirmDelete)) return;
        setIsDeleting(true);
        try {
        await apiDelete(`/productos/${id}`);
        cargarProductos();
        } catch (err) {
        setError(TEXTOS.errorDelete);
        console.error(err);
        } finally {
        setIsDeleting(false);
        }
    }

    // Memoizar la lista para optimización
    const listaProductos = useMemo(() => (
        <ListaProductos
        productos={productos}
        editarProducto={editarProducto}
        eliminar={eliminar}
        isDeleting={isDeleting}
        />
    ), [productos, isDeleting]);

    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-[400px] text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mr-4"></div>
            <p>{TEXTOS.loading}</p>
        </div>
        );
    }

    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">{TEXTOS.title}</h1>
        {error && <p className="text-red-500 mb-4 bg-red-900 p-3 rounded">{error}</p>}

        <FormularioProducto
            form={form}
            setForm={setForm}
            imagen={imagen}
            setImagen={setImagen}
            preview={preview}
            setPreview={setPreview}
            editando={editando}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            error={error}
            isSaving={isSaving}
            fileInputRef={fileInputRef}
        />

        {listaProductos}
        </div>
    );
}

export default AdminStore;