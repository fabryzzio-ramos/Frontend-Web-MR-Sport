import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-black border-t border-red-600 mt-24">
            <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col items-center text-center gap-10">
                {/* REDES SOCIALES */}
                <div className="flex gap-6">
                    <SocialLink href="https://facebook.com" label="Facebook"><Facebook size={28} /></SocialLink>
                    <SocialLink href="https://instagram.com" label="Instagram"><Instagram size={28} /></SocialLink>
                </div>

                {/* DIVIDER */}
                <div className="w-full max-w-md h-px bg-white gap-3">
                    <img src="/logo.png" alt="Logo MR Sport" className="w-16 h-16 object-contain" />
                    <h2 className="text-white font-extrabold text-lg tracking-wide">MR SPORT</h2>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
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
                <p>&copy; {new Date().getFullYear()} MR SPORT. Todos los derechos reservados.</p>

                <div className="flex gap-4 justify-center text-xs">
                    <Link to="/privacidad" className="hover:text-white transition" >Política e Privacidad</Link>
                    <span>.</span>
                    <Link to="/terminos" className="hover:text-white transition">Términos y Condiciones</Link>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, children, label }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={label} 
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:border-red-500 hover:text-red-500 transition">
            {children}
        </a>
    )
}

export default Footer;