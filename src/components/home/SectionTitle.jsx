import React from "react";

function SectionTitle({ title, subtitle, titleClass = "", subtitleClass = "" }) {
    return (
        <div className="mb-10 text-center">
            <h2 className={`text-3xl md:text-4xl font-extrabold uppercase tracking-wide mb-4 ${
                titleClass || "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            }`}>
                {title}
            </h2>
            {subtitle && (
                <p className={`text-base md:text-lg mt-2 ${
                    subtitleClass || "text-gray-400"
                }`}>
                    {subtitle}
                </p>
            )}
            {/* Línea decorativa sutil */}
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-4 rounded-full"></div>
        </div>
    );
}

export default SectionTitle;