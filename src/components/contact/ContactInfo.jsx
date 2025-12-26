function ContactInfo() {
    return (
        <section className="bg-black border-t border-gray-800 py-16 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                <div>
                    <p className="text-gray-500 text-sm mb-1">Correo</p>
                    <p className="text-white font-medium">mrsport.academy@gmail.com</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm mb-1">Redes</p>
                    <p className="text-white font-medium">Instagram @mrsport.academy</p>
                </div>

                <div>
                    <p className="text-gray-500 text-sm mb-1">Ubicación</p>
                    <p className="text-white font-medium">Comas, Lima, Perú</p>
                </div>
            </div>
        </section>
    );
}

export default ContactInfo;