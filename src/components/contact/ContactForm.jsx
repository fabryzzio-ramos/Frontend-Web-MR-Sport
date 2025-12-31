import { useState } from 'react';

function ContactForm() {
    // Estado para los valores del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    // Estado para errores de validación
    const [errors, setErrors] = useState({});

    // Estado para mostrar mensaje de éxito
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Función para manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Limpiar errores al cambiar
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Función para validar el formulario
    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
        if (!formData.correo.trim()) {
            newErrors.correo = 'El correo es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
            newErrors.correo = 'Ingresa un correo válido.';
        }
        if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es obligatorio.';
        return newErrors;
    };

    // Función para manejar el envío
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Simular envío (aquí podrías integrar una API real)
            console.log('Formulario enviado:', formData);
            setIsSubmitted(true);
            // Resetear formulario después de envío
            setFormData({ nombre: '', correo: '', mensaje: '' });
            setErrors({});
            // Ocultar mensaje de éxito después de 5 segundos
            setTimeout(() => setIsSubmitted(false), 5000);
        }
    };

    return (
        <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24 px-6 relative overflow-hidden">
            {/* Patrón de líneas deportivas para continuidad y cierre visual */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxsaW5lIHgxPSIwIiB5MT0iMTAwIiB4Mj0iMTAwIiB5Mj0iMCIgc3Ryb2tlPSJyZWQiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] opacity-10 bg-repeat"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Contáctanos</h2>
                {isSubmitted && (
                    <div className="bg-green-600 text-white p-4 rounded-lg mb-6 text-center">
                        ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.
                    </div>
                )}
                <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl space-y-6 shadow-lg border border-gray-700/50">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ingresa tu nombre"
                            className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ${errors.nombre ? 'border-red-500' : 'border-gray-700'}`}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-medium">Correo</label>
                        <input
                            type="email"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            placeholder="Ingresa tu correo electrónico"
                            className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 ${errors.correo ? 'border-red-500' : 'border-gray-700'}`}
                        />
                        {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-2 font-medium">Mensaje</label>
                        <textarea
                            rows="5"
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            placeholder="Escribe tu mensaje aquí..."
                            className={`w-full bg-black border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 resize-none ${errors.mensaje ? 'border-red-500' : 'border-gray-700'}`}
                        />
                        {errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200 flex items-center justify-center space-x-2"
                    >
                        <span>Enviar mensaje</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ContactForm;