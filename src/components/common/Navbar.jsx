import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    
    function handleLogout() {
        logout();
        navigate("/login")
    }

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#020617]/90 backdrop-blur shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* LOGO */}
                <Link to="/" className="text-lg mb:text-xl font-extrabold text-red-500">MR SPORT</Link>

                {/* NAV DESKTOP */}
                <nav className="hidden md:flex items-center gap-8 text-sm uppercase font-medium text-gray-200">
                    {/* LIINKS PRINCIPALES */}
                    <ul className="flex items-center gap-6 text-sm">
                        <DesktopLink to="/" label="Inicio" />
                        <DesktopLink to="/historia" label="Historia" />
                        <DesktopLink to="/equipo" label="Equipo" />
                        <DesktopLink to="/partidos" label="Partidos" />
                        <DesktopLink to="/tienda" label="Tienda" />
                        <DesktopLink to="/contacto" label="Contacto" />
                    </ul>

                    {/* SOLO ADMIN */}
                    {user?.rol === "admin" && <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition">Admin</Link>}

                    {/* BOTON */}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="border border-red-600 px-4 py-2 text-sm hover:bg-red-600 transition">Cerrar Sesión</button>
                    ) : (
                        <Link to="/login" className="border border-red-600 px-4 py-2 text-sm hover:bg-red-600 transition">Iniciar Sesión</Link>
                    )}
                </nav>

                {/* BOTON HAMBURGUESA */}
                <button onClick={() => setOpen(!open)} aria-label="Abrir menú" aria-expanded={open} className="md:hidden text-white focus:outline-none">
                    <div className="space-y-1">
                        <span className={`block h-0.5 w-6 bg-white transition ${open && "rotate-45 translate-y-1.5"}`} />
                        <span className={`block h-0.5 w-6 bg-white transition ${open && "opacity-0"}`} />
                        <span className={`block h-0.5 w-6 bg-white transition ${open && "-rotate-45 -translate-y-1.5"}`} />
                    </div>
                </button>

                {/* MENU MOVIL */}
                {open && (
                    <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur flex flex-col items-center justify-center gap-8 text-xl" role="dialog" aria-modal="true" >
                        <MovileLink to="/" label="Inicio" close={setOpen} />
                        <MovileLink to="/historia" label="Historia" close={setOpen} />
                        <MovileLink to="/equipo" label="Equipo" close={setOpen} />
                        <MovileLink to="/partidos" label="Partidos" close={setOpen} />
                        <MovileLink to="/tienda" label="Tienda" close={setOpen} />
                        <MovileLink to="/contacto" label="Contacto" close={setOpen} />

                        {user?.rol === "admin" && (
                            <MovileLink to="/admin" label="Admin" close={setOpen} />
                        )}

                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="border border-red-500 px-6 py-2 text-red-500 hover:bg-red-500 hover:text-white transition">Cerrar Sesión</button>
                        ) : (
                            <MovileLink to="/login" label="Iniciar Sesión" close={setOpen} />
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

function MovileLink({ to, label, close }) {
    return (
        <NavLink to={to} onClick={() => close(false)} className={({ isActive }) => `relative font-semibold transition ${isActive ? "text-red-500 after:w-full" : "text-gray-300 hover:text-white"} after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-red-500 after:w-0 after:transition-all`}>
            {label}
        </NavLink>
    );
}

function DesktopLink({ to, label }) {
    return (
        <NavLink to={to} className={({ isActive }) => isActive ? "text-red-500" : "hover:text-red-500 transition"}>{label}</NavLink>
    );
}

export default NavBar;