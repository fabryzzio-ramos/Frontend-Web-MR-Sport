function ContactForm() {
    return (
        <section className="bg-black py-24 px-6">
            <form className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-2xl space-y-6">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                    <input type="text" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600" />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Correo</label>
                    <input type="email" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600" />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Mensaje</label>
                    <textarea rows="5" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600" />
                </div>

                <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition">Enviar mensaje</button>
            </form>
        </section>
    );
}

export default ContactForm;