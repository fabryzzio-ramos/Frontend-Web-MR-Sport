function FullLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Cargando...</p>
            </div>
        </div>
    );
}

export default FullLoader;