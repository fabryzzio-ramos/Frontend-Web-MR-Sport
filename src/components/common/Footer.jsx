import { Facebook, Instagram, Youtube, Twitter } from "lucide-react"; // Agregué más íconos para variedad, pero puedes quitarlos si no los usas
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-red-600 mt-24 relative overflow-hidden">
            {/* Elemento decorativo sutil para profesionalismo */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-6 py-14 flex flex-col items-center text-center gap-10">
                {/* REDES SOCIALES - Mejoradas con más íconos y hover effects */}
                <div className="flex gap-6">
                    <SocialLink href="https://facebook.com" label="Facebook">
                        <Facebook size={28} />
                    </SocialLink>
                    <SocialLink href="https://instagram.com" label="Instagram">
                        <Instagram size={28} />
                    </SocialLink>
                    <SocialLink href="https://twitter.com" label="Twitter">
                        <Twitter size={28} />
                    </SocialLink>
                    <SocialLink href="https://youtube.com" label="YouTube">
                        <Youtube size={28} />
                    </SocialLink>
                </div>

                {/* DIVIDER - Corregido y mejorado con logo centrado y gradiente */}
                <div className="relative w-full max-w-md flex items-center justify-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-red-600"></div>
                    <div className="flex flex-col items-center gap-2">
                        <img src="/favicon.ico" alt="Logo MR Sport" className="w-16 h-16 object-contain drop-shadow-lg" />
                        <h2 className="text-white font-extrabold text-lg tracking-wide bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            MR SPORT
                        </h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-red-600"></div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* BRAND - Mejorado con gradiente y descripción expandida */}
                <div className="text-center md:text-left">
                    <h3 className="text-white font-extrabold text-xl">
                        MR <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">Sport</span>
                    </h3>
                    <p className="text-gray-400 text-sm mt-3 max-w-xs leading-relaxed">
                        Más que un club, una pasión por el deporte. Esfuerzo, comunidad y victorias que nos unen.
                    </p>
                </div>

                {/* LINKS - Mejorados con hover y consistencia */}
                <div className="text-center md:text-left">
                    <h4 className="text-white font-semibold mb-4 text-lg">Navegación</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li>
                            <Link to="/" className="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/equipo" className="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                Plantel
                            </Link>
                        </li>
                        <li>
                            <Link to="/partidos" className="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                Partidos
                            </Link>
                        </li>
                        <li>
                            <Link to="/tienda" className="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                Tienda
                            </Link>
                        </li>
                        <li>
                            <Link to="/contacto" className="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* SOCIAL - Mejorado con íconos en lugar de texto, y enlaces funcionales */}
                <div className="text-center md:text-left">
                    <h4 className="text-white font-semibold mb-4 text-lg">Síguenos</h4>
                    <div className="flex gap-4 justify-center md:justify-start">
                        <SocialLink href="https://instagram.com" label="Instagram">
                            <Instagram size={24} />
                        </SocialLink>
                        <SocialLink href="https://facebook.com" label="Facebook">
                            <Facebook size={24} />
                        </SocialLink>
                        <SocialLink href="https://twitter.com" label="Twitter">
                            <Twitter size={24} />
                        </SocialLink>
                        <SocialLink href="https://youtube.com" label="YouTube">
                            <Youtube size={24} />
                        </SocialLink>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT - Mejorado con mejor espaciado y corrección de texto */}
            <div className="relative border-t border-white/10 text-center py-6 text-gray-500 text-xs bg-black/50">
                <p className="mb-2">&copy; {new Date().getFullYear()} MR SPORT. Todos los derechos reservados.</p>
                <div className="flex gap-4 justify-center text-xs">
                    <Link to="/privacidad" className="hover:text-red-500 transition-all duration-300">
                        Política de Privacidad
                    </Link>
                    <span className="text-gray-600">•</span>
                    <Link to="/terminos" className="hover:text-red-500 transition-all duration-300">
                        Términos y Condiciones
                    </Link>
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
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:border-red-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 hover:scale-110 group"
        >
            <span className="group-hover:scale-110 transition-transform duration-300">
                {children}
            </span>
        </a>
    );
}

export default Footer;