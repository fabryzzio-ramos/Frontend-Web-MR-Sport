import { Link } from "react-router-dom";

function Contact() {
    return (
        <section className="relative py-24 px-6 bg-gradient-to-t from-black via-[#020617] to-[#020617] overflow-hidden">
            {/* DECORACION */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right.rgba(220,38,38,0.25),transparent_60%)]"></div>

            <div className="relative max-w-4xl mx-auto text-center text-white">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Más que un club
                    <br />
                    <span className="text-red-500">Una familia</span>
                </h2>

                <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
                    Sé parte del club. Vive cada partido, apoya al equipo y representa
                    nuestros colores dentro y fuera de la cancha.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/equipo" className="px-7 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition">Conoce al equipo</Link>
                    <Link to="/tienda" className="px-7 py-3 border-2 border-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition">Tienda oficial</Link>
                </div>
            </div>
        </section>
    )
}

export default Contact;