import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black">

            {/* FONDO */}
            <img className="absolute inset-0 w-full h-full object-cover opacity-30" />

            {/* CONTENIDO */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <h2 className="text-5xl md:text-7xl font-extrabold leading-tight">
                    PASION <br />
                    <span className="text-red-600">QUE NO SE RINDE</span>
                </h2>
                <p className="mt-6 max-w-xl text-gray-300">
                    MR Sport no es solo un club.
                    Es sacrificio, disciplina y orgullo, somos una familia.
                </p>

                <div className="mt-8 flex gap-4">
                    <Link to="/equipo" className="bg-red-600 px-6 py-3 font-semibold hover:bg-red-700 transition">Ver equipo</Link>
                    <Link to="/partidos" className="border border-white px-6 py-3 hover:bg-white hover:text-black transition">Próximo partido</Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;