import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-black border-t-2 border-red-600 mt-24">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* BRAND */}
                <div>
                    <h3 className="text-white font-extrabold text-xl">MR <span className="text-red-600">Sport</span></h3>
                    <p className="text-gray-400 text-sm mt-3 max-w-xs">Más que un club, Pasión, esfuerzo y comunidad.</p>
                </div>

                {/* LINKS */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Navegación</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><Link to="/" className="hover:text-red-500">Inicio</Link></li>
                        <li><Link to="/equipo" className="hover:text-red-500">Plantel</Link></li>
                        <li><Link to="/partidos" className="hover:text-red-500">Partidos</Link></li>
                        <li><Link to="/tienda" className="hover:text-red-500">Tienda</Link></li>
                    </ul>
                </div>

                {/* SOCIAL */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Siguenos</h4>
                    <div className="flex gap-4 text-gray-400 text-sm">
                        <a href="#" className="hover:text-red-500">Instagram</a>
                        <a href="#" className="hover:text-red-500">Facebook</a>
                        <a href="#" className="hover:text-red-500">Tik Tok</a>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="border-t border-white/10 text-center py-6 text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} MR Sport. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;