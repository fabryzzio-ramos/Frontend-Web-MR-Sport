import { useState } from "react"; 
import { Outlet, NavLink } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";  

function StoreLayout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen h-full bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
            {/* NAVBAR SHOP */}
            <header className="border-b border-white/10 shadow-lg">
                <div className="w-full px-6 py-4 flex justify-between items-center">
                    <NavLink to="/tienda" className="text-xl font-extrabold text-red-500 hover:text-red-600 transition-colors">
                        MR SPORT SHOP
                    </NavLink>

                    {/* Menú Desktop */}
                    <nav className="hidden md:flex gap-6 text-sm uppercase">
                        <NavLink to="/tienda" className="hover:text-red-500 transition-colors">Productos</NavLink>
                        <NavLink to="/tienda/carrito" className="hover:text-red-500 transition-colors">Carrito</NavLink>
                        <NavLink to="/tienda/mis-ordenes" className="hover:text-red-500 transition-colors">Mis Órdenes</NavLink>
                        <NavLink to="/" className="hover:text-red-500 transition-colors">Volver al club</NavLink>
                    </nav>

                    {/* Botón Hamburguesa Móvil */}
                    <button 
                        className="md:hidden text-white" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                    </button>
                </div>

                {/* Menú Móvil (desplegable) */}
                {isMenuOpen && (
                    <nav className="md:hidden bg-gray-800 border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm uppercase">
                        <NavLink to="/tienda" className="hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Productos</NavLink>
                        <NavLink to="/tienda/carrito" className="hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Carrito</NavLink>
                        <NavLink to="/tienda/mis-ordenes" className="hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Mis Órdenes</NavLink>
                        <NavLink to="/" className="hover:text-red-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Volver al club</NavLink>
                    </nav>
                )}
            </header>

            {/* CONTENIDO - Ahora ocupa todo el ancho y alto */}
            <main className="flex-1 w-full px-6 py-10">
                <Outlet />
            </main>

            {/* FOOTER MEJORADO */}
            <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-400 shadow-lg bg-gray-900/50">
                <div className="w-full px-6">
                    <p className="mb-4">&copy; {new Date().getFullYear()} MR SPORT - Todos los derechos reservados.</p>
                    <p className="text-xs">Tienda oficial del club - Equipo MR Sport</p>
                    {/* Opcional: Agrega enlaces sociales o más info aquí */}
                </div>
            </footer>
        </div>
    );
}

export default StoreLayout;