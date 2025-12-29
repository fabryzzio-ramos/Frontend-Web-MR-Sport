import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // CARGAR CARRITO
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) setCart(JSON.parse(saved));
    }, []);

    // GUARDAR CARRITO
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(product) {
        setCart(prev => {
            const existe = prev.find(p => p._id === product.id);
            if (existe) {
                return prev.map(p =>p._id === product._id ? {...p, cantidad: p.cantidad + 1} : p);
            };

            return [...prev, {...product, cantidad: 1}];
        });
    }

    function updateCantidad(id, cantidad) {
        if (cantidad <= 0) return removeFromCart(id);
        setCart(prev => prev.map(p => p._id === id ? {...p, cantidad} : p));
    }

    function removeFromCart(id) {
        setCart(prev => prev.filter(p => p._id !== id));
    }

    function clearCart() {
        setCart([]);
    }

    const total = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCantidad, clearCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}

export default CartProvider;