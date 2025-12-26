function ClubValues() {
    const valores = [
        { titulo: "Pasión", desc: "Vivimos el fútbol con el corazón." },
        { titulo: "Disciplina", desc: "El trabajo constante nos define." },
        { titulo: "Respeto", desc: "Dentro y fuera del campo." },
        { titulo: "Familia", desc: "Somos más que un equipo." },
    ];

    return (
        <section className="bg-gray-900 text-white py-20 px-6 md:px-20">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestros valores</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {valores.map(v => (
                    <div key={v.titulo} className="bg-black p-6 rounded-xl text-center hover:-translate-y-2 transition">
                        <h3 className="text-xl font-semibold mb-2">{v.titulo}</h3>
                        <p className="text-gray-400 text-sm">{v.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ClubValues;