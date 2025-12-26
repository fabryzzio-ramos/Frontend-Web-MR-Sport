function SectionTitle({ title, subtitle}) {
    return (
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold uppercase">{title}</h2>
            {subtitle && (
                <p className="text-gray-400 mt-2">{subtitle}</p>
            )}
        </div>
    )
}

export default SectionTitle;