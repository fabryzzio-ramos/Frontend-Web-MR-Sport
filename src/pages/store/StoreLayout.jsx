import { useState } from "react"; 
import { Outlet, NavLink } from "react-router-dom";
import { MenuIcon, XIcon, ShoppingCartIcon, SearchIcon } from "lucide-react";  // Agregué íconos para carrito y búsqueda
import { useCart } from "../../context/CartContext"; 

function StoreLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");  // Estado para búsqueda global
    const { cart } = useCart();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Navegar a la tienda con query de búsqueda, o abrir un modal
            // Por ahora, solo un console.log; puedes reemplazar con lógica real
            console.log("Buscar:", searchTerm);
            // Ejemplo: navigate(`/tienda?search=${searchTerm}`);
        }
    };

    return (
        <div className="min-h-screen h-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
            {/* NAVBAR MEJORADA */}
            <header className="border-b border-white/10 shadow-lg bg-gradient-to-r from-gray-900 to-black sticky top-0 z-50">
                <div className="w-full px-6 py-4 flex justify-between items-center">
                    {/* Logo e identidad */}
                    <NavLink to="/tienda" className="flex items-center space-x-3 text-xl font-extrabold text-red-500 hover:text-red-600 transition-colors">
                        <img src="/favicon.ico" alt="MR SPORT Logo" className="h-10 w-10 rounded-full border-2 border-red-500" /> {/* Placeholder para logo */}
                        <span className="hidden sm:block">MR SPORT SHOP</span>
                    </NavLink>

                    {/* Barra de búsqueda (solo desktop) */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-800 border border-gray-600 rounded-full px-4 py-2 flex-1 max-w-md mx-6">
                        <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent text-white placeholder-gray-400 focus:outline-none flex-1"
                        />
                        <button type="submit" className="text-red-500 hover:text-red-600 ml-2">Buscar</button>
                    </form>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:flex gap-6 text-sm uppercase items-center">
                        <NavLink to="/tienda" className="hover:text-red-500 transition-colors">Productos</NavLink>
                        <NavLink to="/tienda/carrito" className="hover:text-red-500 transition-colors relative">
                            <ShoppingCartIcon className="h-5 w-5" />
                            {cart.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </NavLink>
                        <NavLink to="/tienda/mis-ordenes" className="hover:text-red-500 transition-colors">Mis Órdenes</NavLink>
                        <NavLink to="/" className="hover:text-red-500 transition-colors">Volver al club</NavLink>
                    </nav>

                    {/* Botón Hamburguesa Móvil */}
                    <button 
                        className="md:hidden text-white hover:text-red-500 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>

                {/* Menú Móvil Mejorado */}
                {isMenuOpen && (
                    <nav className="md:hidden bg-gray-800 border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm uppercase animate-slide-down">
                        {/* Búsqueda móvil */}
                        <form onSubmit={handleSearch} className="flex items-center bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mb-4">
                            <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent text-white placeholder-gray-400 focus:outline-none flex-1"
                            />
                        </form>
                        <NavLink to="/tienda" className="hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Productos</NavLink>
                        <NavLink to="/tienda/carrito" className="hover:text-red-500 transition-colors flex items-center" onClick={() => setIsMenuOpen(false)}>
                            Carrito
                            {cart.length > 0 && (
                                <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </NavLink>
                        <NavLink to="/tienda/mis-ordenes" className="hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Mis Órdenes</NavLink>
                        <NavLink to="/" className="hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Volver al club</NavLink>
                    </nav>
                )}
            </header>

            {/* CONTENIDO */}
            <main className="flex-1 w-full px-6 py-10">
                <Outlet />
            </main>

            {/* FOOTER */}
            <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-400 shadow-lg bg-gray-900/50">
                <div className="w-full px-6">
                    <p className="mb-4">&copy; {new Date().getFullYear()} MR SPORT - Todos los derechos reservados.</p>
                    <p className="text-xs">Tienda oficial del club - Equipo MR Sport</p>
                </div>
            </footer>
        </div>
    );
}

export default StoreLayout;