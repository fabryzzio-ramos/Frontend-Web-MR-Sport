import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import MonthFilter from "../components/matches/MonthFilter";
import MatchesTable from "../components/matches/MatchesTable";

function Matches() {
    const [partidos, setPartidos] = useState([]);
    const [mesActual, setMesActual] = useState(new Date().getMonth());

    useEffect(() => {
        const cargarPartidos = async () => {
            try {
                const data = await apiGet("/partidos");
                setPartidos(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        cargarPartidos();
    }, []);

    const partidosFiltrados = partidos.filter(p => {
        return new Date(p.fecha).getMonth() === mesActual;
    });

    return (
        <main className="bg-black min-h-screen px-6 md:px-20 py-16">
            <h1 className="text-4xl font-extrabold text-white mb-8">Calendario</h1>

            <MonthFilter mesActual={mesActual} setMesActual={setMesActual} />
            <MatchesTable partidos={partidosFiltrados} />
        </main>
    );
}

export default Matches;