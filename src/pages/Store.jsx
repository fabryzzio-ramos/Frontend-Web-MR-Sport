import useSEO from "../hooks/useSEO";

function Store() {
    useSEO({
        title: "Tienda Oficial | MR Sport",
        description: "Compra camisetas y productos oficiales de MR Sport."
    });
    return <h1>Tienda</h1>
}

export default Store;