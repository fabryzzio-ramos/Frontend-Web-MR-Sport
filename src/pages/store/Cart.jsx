import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { MinusIcon, PlusIcon, TrashIcon, TagIcon, AlertTriangleIcon, ShoppingBagIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Para animaciones

function Cart() {
    const { cart, removeFromCart, updateCantidad, total } = useCart();
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Aplicar cupón (simulado - reemplaza con lógica real de backend si tienes)
    const applyCoupon = () => {
        if (coupon.toUpperCase() === "MRSPORT10") {
            setDiscount(0.1); // 10% descuento
            alert("¡Cupón aplicado! 10% de descuento en tu compra.");
        } else if (coupon.trim()) {
            alert("Cupón inválido. Intenta con 'MRSPORT10' para un descuento especial.");
            setDiscount(0);
        }
    };

    const finalTotal = total * (1 - discount);

    // Confirmación para eliminar
    const confirmDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (itemToDelete) removeFromCart(itemToDelete._id);
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header con identidad */}
                    <motion.div 
                        className="mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ShoppingBagIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            Carrito Vacío
                        </h1>
                        <p className="text-gray-400 text-lg">Tu carrito está vacío - MR SPORT SHOP</p>
                    </motion.div>

                    <motion.div 
                        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-gray-400 text-xl mb-6">No tienes productos en tu carrito. ¡Empieza a apoyar al equipo con productos oficiales!</p>
                        <Link 
                            to="/tienda" 
                            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-block"
                        >
                            Explorar Productos
                        </Link>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen text-white px-6 py-20 relative">
            <div className="max-w-6xl mx-auto">
                {/* Header con identidad del equipo */}
                <motion.div 
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <ShoppingBagIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                        Tu Carrito
                    </h1>
                    <p className="text-gray-400 text-lg">Revisa tus productos y finaliza tu compra - MR SPORT SHOP</p>
                </motion.div>

                {/* Lista de productos */}
                <div className="space-y-6 mb-8">
                    {cart.map((p, index) => (
                        <motion.div 
                            key={p._id} 
                            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Imagen con lazy loading */}
                            <motion.img 
                                src={p.imagen?.url || "/placeholder.png"} 
                                alt={p.nombre} 
                                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-md" 
                                loading="lazy"
                                whileHover={{ scale: 1.1 }}
                            />

                            {/* Detalles */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-xl font-bold mb-2 text-white">{p.nombre}</h3>
                                <p className="text-gray-400 text-lg">S/ {p.precio.toFixed(2)} c/u</p>
                                <p className="text-sm text-gray-500">Disponible en stock</p> {/* Simulado - reemplaza con data real */}
                            </div>

                            {/* Controles de cantidad */}
                            <div className="flex items-center gap-4">
                                <motion.button 
                                    onClick={() => updateCantidad(p._id, Math.max(1, p.cantidad - 1))} 
                                    className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors disabled:opacity-50"
                                    disabled={p.cantidad <= 1}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Disminuir cantidad"
                                >
                                    <MinusIcon className="h-5 w-5" />
                                </motion.button>
                                <span className="text-xl font-semibold w-12 text-center text-white">{p.cantidad}</span>
                                <motion.button 
                                    onClick={() => updateCantidad(p._id, p.cantidad + 1)} 
                                    className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Aumentar cantidad"
                                >
                                    <PlusIcon className="h-5 w-5" />
                                </motion.button>
                            </div>

                            {/* Subtotal y eliminar */}
                            <div className="text-center md:text-right">
                                <p className="text-blue-400 font-bold text-lg mb-2">Subtotal: S/ {(p.precio * p.cantidad).toFixed(2)}</p>
                                <motion.button 
                                    onClick={() => confirmDelete(p)} 
                                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 font-medium"
                                    whileHover={{ scale: 1.05 }}
                                    aria-label="Eliminar producto"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                    Eliminar
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Resumen flotante en desktop */}
                <motion.div 
                    className="hidden lg:block fixed top-1/2 right-6 transform -translate-y-1/2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl w-80"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                        <ShoppingBagIcon className="h-5 w-5 mr-2 text-red-500" />
                        Resumen de Compra
                    </h3>
                    
                    {/* Cupón */}
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2 flex items-center">
                            <TagIcon className="h-4 w-4 mr-2" />
                            Código de Descuento
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Ingresa cupón"
                                className="flex-1 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label="Código de descuento"
                            />
                            <motion.button 
                                onClick={applyCoupon} 
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                whileHover={{ scale: 1.05 }}
                            >
                                Aplicar
                            </motion.button>
                        </div>
                        {discount > 0 && <p className="text-green-400 text-sm mt-1">Descuento aplicado: {discount * 100}%</p>}
                    </div>

                    {/* Totales */}
                    <div className="border-t border-gray-600 pt-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white">S/ {total.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Descuento</span>
                                <span className="text-green-400">-S/ {(total * discount).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span className="text-red-500">S/ {finalTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link 
                        to="/tienda/checkout" 
                        className="block text-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
                    >
                        Finalizar Compra
                    </Link>
                </motion.div>

                {/* Resumen en móvil/tablet */}
                <motion.div 
                    className="lg:hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* Cupón */}
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2 flex items-center">
                            <TagIcon className="h-4 w-4 mr-2" />
                            Código de Descuento
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Ingresa cupón"
                                className="flex-1 bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label="Código de descuento"
                            />
                            <motion.button 
                                onClick={applyCoupon} 
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors"
                                whileHover={{ scale: 1.05 }}
                            >
                                Aplicar
                            </motion.button>
                        </div>
                        {discount > 0 && <p className="text-green-400 text-sm mt-1">Descuento aplicado: {discount * 100}%</p>}
                    </div>

                    {/* Totales */}
                    <div className="border-t border-gray-600 pt-4 mb-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="text-white">S/ {total.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-400">Descuento</span>
                                <span className="text-green-400">-S/ {(total * discount).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-xl">
                            <span>Total</span>
                            <span className="text-red-500">S/ {finalTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link 
                        to="/tienda/checkout" 
                        className="block text-center bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Finalizar Compra
                    </Link>
                </motion.div>
            </div>

            {/* Modal de confirmación para eliminar */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div 
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full mx-4 text-center"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <AlertTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                            <h3 className="text-white font-bold text-lg mb-2">¿Eliminar producto?</h3>
                            <p className="text-gray-400 mb-6">¿Estás seguro de que quieres quitar "{itemToDelete?.nombre}" del carrito?</p>
                            <div className="flex gap-4">
                                <motion.button 
                                    onClick={handleDelete} 
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Eliminar
                                </motion.button>
                                <motion.button 
                                    onClick={() => setShowDeleteModal(false)} 
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Cancelar
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

export default Cart;