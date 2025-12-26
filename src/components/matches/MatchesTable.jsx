import MatchRow from "./MatchRow";

function MatchesTable({ partidos }) {
    return (
        <div className="bg-black rounded-xl">
            {partidos.map(p => (
                <MatchRow key={p._id} partido={p} />
            ))}
        </div>
    );
}

export default MatchesTable;