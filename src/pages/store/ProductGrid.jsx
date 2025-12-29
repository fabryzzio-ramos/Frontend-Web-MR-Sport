import ProductCard from "./ProductCard";

function ProductGrid({ productos }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map(producto => (
                <ProductCard key={producto._id} producto={producto} />
            ))}
        </div>
    );
}

export default ProductGrid;