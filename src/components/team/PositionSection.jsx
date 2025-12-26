import PlayerCard from "./PlayerCard";

function PositionSection({ title, jugador }) {
    if (jugador.length === 0) return false;

    return (
        <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{title}</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cosl-4 gap-6">
                {jugador.map((j) => (
                    <PlayerCard key={j._id} jugador={j} />
                ))}
            </div>
        </section>
    );
}

export default PositionSection;