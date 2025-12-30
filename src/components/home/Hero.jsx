import { Link } from "react-router-dom";
import useScrollAnimation from "../../hooks/useScrollAnimation";

function Hero() {
    const { ref, visible } = useScrollAnimation();

    // Constantes para textos y enlaces (facilita mantenimiento)
    const heroTitle = "PASION";
    const heroSubtitle = "QUE NO SE RINDE";
    const heroDescription = "MR Sport no es solo un club. Es sacrificio, disciplina y orgullo, somos una familia.";
    const buttonPrimary = { to: "/equipo", label: "Ver equipo" };
    const buttonSecondary = { to: "/partidos", label: "Próximo partido" };

    return (
        <section 
            ref={ref} 
            className={`relative h-[90vh] flex items-center justify-center transition-all duration-1000 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } bg-gradient-to-b from-black via-neutral-900 to-black overflow-hidden`}
        >
            {/* FONDO - Mejorado con parallax sutil y overlay gradiente */}
            <div className="absolute inset-0 transform scale-105 transition-transform duration-700 ease-out">
                <img 
                    src="/hero-image.jpg" // Cambia a tu imagen real
                    alt="Estadio y equipo de MR Sport en acción, representando la pasión del club" 
                    className="w-full h-full object-cover opacity-40" 
                    loading="lazy" 
                    decoding="async" 
                />
                {/* Overlay gradiente para profundidad y legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-radial from-red-600/10 to-transparent"></div>
            </div>

            {/* CONTENIDO - Mejorado con animaciones, gradientes y responsive */}
            <div className={`relative z-10 max-w-7xl mx-auto px-6 text-center transition-all duration-1000 delay-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}>
                <div className="max-w-3xl mx-auto"> {/* Corregido: mx-w-3xl -> max-w-3xl */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {heroTitle}
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                            {heroSubtitle}
                        </span>
                    </h1>
                    <p className="mt-4 md:mt-6 text-base md:text-lg max-w-lg mx-auto text-gray-300 leading-relaxed drop-shadow-lg">
                        {heroDescription}
                    </p>
                </div>

                {/* BOTONES - Mejorados con hover effects y accesibilidad */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to={buttonPrimary.to} 
                        className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-semibold text-center text-white hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all duration-300 rounded-full shadow-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                        aria-label={`Ir a ${buttonPrimary.label}`}
                    >
                        {buttonPrimary.label}
                    </Link>
                    <Link 
                        to={buttonSecondary.to} 
                        className="border-2 border-white px-8 py-4 text-center text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 rounded-full shadow-lg focus:ring-2 focus:ring-white focus:outline-none"
                        aria-label={`Ir a ${buttonSecondary.label}`}
                    >
                        {buttonSecondary.label}
                    </Link>
                </div>

                {/* ÍCONO DE SCROLL DOWN - Agregado para UX */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}

export default Hero;