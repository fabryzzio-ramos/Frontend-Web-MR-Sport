import { createContext, useContext, useState } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        setCart(prev => {
            const existe = prev.find(p => p._id === product.id);
            if (existe) {
                return prev.map(p =>p._id === product._id ? {...p, cantidad: p.cantidad + 1} : p);
            };

            return [...prev, {...product, cantidad: 1}];
        });
    }

    function removeFromCart(id) {
        setCart(prev => prev.filter(p => p._id !== id));
    }

    function clearCart() {
        setCart([]);
    }

    const total = cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}

export default CartProvider;