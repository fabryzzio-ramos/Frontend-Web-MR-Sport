function AboutClub() {
    return (
        <section className="bg-[#020617] py-20 text-center">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* TEXTO */}
                <div>
                    <h4 className="text-red-500 font-semibold uppercase tracking-widest mb-2">Sobre el club</h4>
                    <h2 className="text-4xl font-extrabold text-white mb-6">Más que un equipo,<br /> una familia</h2>
                    <p className="text-gray-300 leading-relaxed mb-8">
                        MR Sport no es solo un club de fútbol. Es esfuerzo, disciplina y pasión por el juego.
                        Representamos compromiso dentro y fuera de la cancha, formando jugadores y personas con valores.
                    </p>

                    {/* VALORES */}
                    <div className="grid grid-col-2 gap-4">
                        <div className="border border-gray-700 p-4 rounded-lg">
                            <h5 className="text-white font-semibold">Pasión</h5>
                            <p className="text-gray-400 text-sm">Amor por el fútbol</p>
                        </div>

                        <div className="border border-gray-700 p-4 rounded-lg">
                            <h5 className="text-white font-semibold">Unión</h5>
                            <p className="text-gray-400 text-sm">Equipo y familia</p>
                        </div>

                        <div className="border border-gray-700 p-4 rounded-lg">
                            <h5 className="text-white font-semibold">Compromiso</h5>
                            <p className="text-gray-400 text-sm">Dentro y fuera del campo</p>
                        </div>
                    </div>
                </div>

                {/* BLOQUE VISUAL */}
                <div className="relative border border-red-500/30 rounded-2xl p-10 bg-gradient-to-br from-[#020617] via-[#020617] to-red-900/10">
                    {/* LINEA DECORATIVA */}
                    <span className="absolute -top-3 left-6 bg-[#020617] px-3 text-red-500 font-semibold">Identidad</span>
                    <h3 className="text-2xl font-bold text-white mb-4">Nuestra identidad</h3>
                    <p className="text-gray-300">Representamos orgullo, sacrificio y amor por el fútbol.
                    Cada partido es una historia que defendemos juntos, dentro y fuera de la cancha.</p>
                </div>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-600/30 to-transparent my-20"></div>

        </section>
    );
}

export default AboutClub;