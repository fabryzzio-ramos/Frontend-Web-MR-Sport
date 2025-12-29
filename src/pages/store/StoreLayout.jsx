import { Outlet, NavLink } from "react-router-dom";

function StoreLayout() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* NAVBAR SHOP */}
            <header className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex-justify-between items-center">
                    <NavLink to="/tienda" className="text-xl font-extrabold text-red-500">MR SPORT SHOP</NavLink>

                    <nav className="flex gap-6 text-sm uppercase">
                        <NavLink to="/tienda" className="hover:text-red-500">Productos</NavLink>
                        <NavLink to="/tienda/carrito" className="hover:text-red-500">Carrito</NavLink>
                        <NavLink to="/mis-ordenes" className="hover:text-red-500">Mis Ordenes</NavLink>
                        <NavLink to="/" className="hover:text-red-500">Volver al club</NavLink>
                    </nav>
                </div>
            </header>

            {/* CONTENIDO */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
                <Outlet />
            </main>

            {/* FOOTER SIMPLE */}
            <footer className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
                &copy; {new Date().getFullYear()} MR SPORT
            </footer>
        </div>
    );
}

export default StoreLayout;