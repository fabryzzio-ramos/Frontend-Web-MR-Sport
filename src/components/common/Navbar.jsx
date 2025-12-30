import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";

// Función simple para throttling (limita la frecuencia de ejecución)
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        }
    };
}

function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    
    // Manejo del scroll con throttling para mejor rendimiento
    useEffect(() => {
        const handleScroll = throttle(() => {
            setScrolled(window.scrollY > 50);
        }, 100); // Ejecuta máximo cada 100ms

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Manejo de teclado para cerrar menú móvil con Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && open) {
                setOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    
    const handleLogout = useCallback(() => {
        logout();
        navigate("/"); // Cambié a "/" para redirigir al inicio después del logout, evitando confusiones
    }, [logout, navigate]);

    // Array de enlaces para evitar repetición y facilitar mantenimiento
    const navLinks = [
        { to: "/", label: "Inicio" },
        { to: "/historia", label: "Historia" },
        { to: "/equipo", label: "Equipo" },
        { to: "/partidos", label: "Partidos" },
        { to: "/tienda", label: "Tienda" },
        { to: "/contacto", label: "Contacto" },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
            scrolled 
                ? "bg-gradient-to-r from-[#020617]/95 via-[#0f172a]/95 to-[#020617]/95 backdrop-blur-lg shadow-2xl border-b-2 border-red-500/30" 
                : "bg-transparent"
        }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* LOGO - Mejorado con ícono sutil, gradiente y tamaño responsive */}
                <Link to="/" className="flex items-center gap-2 text-lg md:text-xl font-extrabold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:to-red-500 transition-all duration-300 hover:scale-105">
                    <img 
                        src="/favicon.ico"  // Cambia a "/favicon.ico" si quieres, pero usa una imagen mejor
                        alt="Logo de MR Sport" 
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"  // Tamaño responsive, ajusta según necesites
                    />
                    MR SPORT
                </Link>

                {/* NAV DESKTOP - Mejorado con estilos profesionales y efectos hover */}
                <nav className="hidden md:flex items-center gap-8 text-sm uppercase font-medium text-gray-200">
                    {/* ENLACES PRINCIPALES */}
                    <ul className="flex items-center gap-6 text-sm">
                        {navLinks.map(link => (
                            <DesktopLink key={link.to} to={link.to} label={link.label} />
                        ))}
                    </ul>

                    {/* SOLO ADMIN - Mejorado con ícono sutil y hover con glow */}
                    {user?.rol === "admin" && (
                        <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 flex items-center gap-1 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50">
                            <span className="text-xs">⚙️</span> Admin
                        </Link>
                    )}

                    {/* BOTÓN DE AUTENTICACIÓN - Mejorado con gradiente, glow y consistencia */}
                    {isAuthenticated ? (
                        <button 
                            onClick={handleLogout} 
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 text-sm font-semibold rounded-lg shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                </nav>

                {/* BOTÓN HAMBURGUESA - Mejorado con animaciones, glow y accesibilidad */}
                <button 
                    onClick={() => setOpen(!open)} 
                    aria-label="Abrir menú" 
                    aria-expanded={open} 
                    aria-controls="mobile-menu"
                    className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-red-500 rounded-md p-2 transition-all duration-300 hover:bg-red-500/20 hover:shadow-lg hover:shadow-red-500/50"
                >
                    <div className="space-y-1">
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`} />
                    </div>
                </button>

                {/* MENÚ MÓVIL - Mejorado con slide-in desde la derecha, overlay clickeable, gradiente y accesibilidad */}
                {open && (
                    <div 
                        id="mobile-menu"
                        className="fixed inset-0 z-40 bg-gradient-to-b from-black/95 to-gray-900/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-xl animate-slide-in-right" 
                        role="dialog" 
                        aria-modal="true"
                        onClick={() => setOpen(false)} // Cierra al hacer clic fuera
                    >
                        {/* Contenedor interno para evitar cierre accidental en enlaces */}
                        <div className="flex flex-col items-center gap-8" onClick={(e) => e.stopPropagation()}>
                            {navLinks.map(link => (
                                <MovileLink key={link.to} to={link.to} label={link.label} close={setOpen} />
                            ))}

                            {user?.rol === "admin" && (
                                <MovileLink to="/admin" label="Admin" close={setOpen} />
                            )}

                            {isAuthenticated ? (
                                <button 
                                    onClick={() => { handleLogout(); setOpen(false); }} 
                                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 font-semibold rounded-lg shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
                                >
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <MovileLink to="/login" label="Iniciar Sesión" close={setOpen} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

function MovileLink({ to, label, close }) {
    return (
        <NavLink 
            to={to} 
            onClick={() => close(false)} 
            className={({ isActive }) => `relative font-semibold transition-all duration-300 hover:scale-105 hover:text-red-400 ${
                isActive 
                    ? "text-red-500 after:w-full after:scale-100" 
                    : "text-gray-300 hover:text-white"
            } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-red-500 after:w-0 after:transition-all after:duration-300 hover:after:w-full`}
        >
            {label}
        </NavLink>
    );
}

function DesktopLink({ to, label }) {
    return (
        <NavLink 
            to={to} 
            className={({ isActive }) => `relative transition-all duration-300 hover:scale-105 hover:text-red-400 ${
                isActive 
                    ? "text-red-500 after:w-full after:scale-100" 
                    : "hover:text-white"
            } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-red-500 after:w-0 after:transition-all after:duration-300 hover:after:w-full`}
        >
            {label}
        </NavLink>
    );
}

export default NavBar;