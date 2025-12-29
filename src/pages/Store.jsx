import useSEO from "../hooks/useSEO";

function Store() {
    useSEO({
        title: "Tienda | MR Sport",
        description: "Compra camisetas oficiales y productos del club MR Sport.",
        keywords: "MR Sport, camisetas de fútbol, tienda deportiva, club MR Sport"
    });
    return <h1>Tienda</h1>
}

export default Store;