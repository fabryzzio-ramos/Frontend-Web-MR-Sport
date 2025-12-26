import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black">

            {/* FONDO */}
            <img className="absolute inset-0 w-full h-full object-cover opacity-30 bg-black/40" />

            {/* CONTENIDO */}
            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mx-w-3xl">
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                        PASION <br />
                        <span className="text-red-600">QUE NO SE RINDE</span>
                    </h2>
                    <p className="mt-6 max-w-xl text-gray-300">
                        MR Sport no es solo un club.
                        Es sacrificio, disciplina y orgullo, somos una familia.
                    </p>
                </div>

                <div className="mt-10 flex felx-col sm:flex-row gap-4">
                    <Link to="/equipo" className="bg-red-600 px-8 py-3 font-semibold text-center hover:bg-red-700 transition rounded-full">Ver equipo</Link>
                    <Link to="/partidos" className="border border-white px-8 py-3 text-center hover:bg-white hover:text-black transition rounded-full">Próximo partido</Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;