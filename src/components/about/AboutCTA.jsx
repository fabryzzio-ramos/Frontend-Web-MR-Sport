import { Link } from "react-router-dom";

function AboutCTA() {
    return (
        <section className="bg-black border-t border-gray-800 py-20 px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold font-white mb-4">Más que un club</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">MR Sport es comunidad, esfuerzo y pasión por el fútbol.
                Sé parte de nuestra historia.
            </p>
            
            <Link to="/contacto" className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition font-semibold">Únete al club</Link>
        </section>
    );
}

export default AboutCTA;