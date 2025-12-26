import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../../utils/auth";
import { useEffect, useState } from "react";

function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigate = useNavigate();
    const logged = isAuthenticated();
    const user = localStorage.getItem("usuario") ? JSON.parse(localStorage.getItem("usuario")) : null
    
    function handleLogout() {
        logout();
        navigate("/login")
    }

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#020617]/90 backdrop-blur shadow-lg" : "bg-transparent"}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* LOGO */}
                <Link to="/" className="text-lg mb:text-xl font-extrabold text-red-500">MR SPORT</Link>

                {/* NAV */}
                <nav className="hidden md:flex items-center gap-8 text-sm uppercase font-medium text-gray-200">
                    {/* LIINKS PRINCIPALES */}
                    <ul className="flex items-center gap-6 text-sm">
                        <li className="hover:text-red-500 transition"><Link to="/">Inicio</Link></li>
                        <li className="hover:text-red-500 transition"><Link to="/historia">Historia</Link></li>
                        <li className="hover:text-red-500 transition"><Link to="/equipo">Equipo</Link></li>
                        <li className="hover:text-red-500 transition"><Link to="/partidos">Partidos</Link></li>
                        <li className="hover:text-red-500 transition"><Link to="/tienda">Tienda</Link></li>
                        <li className="hover:text-red-500 transition"><Link to="/contacto">Contacto</Link></li>
                    </ul>

                    {/* SOLO ADMIN */}
                    {user && user.rol === "admin" && <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition">Admin</Link>}

                    {/* BOTON */}
                    {logged ? (
                        <button onClick={handleLogout} className="border border-red-600 px-4 py-2 text-sm hover:bg-red-600 transition">Cerrar Sesión</button>
                    ) : (
                        <Link to="/login" className="border border-red-600 px-4 py-2 text-sm hover:bg-red-600 transition">Iniciar Sesión</Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default NavBar;