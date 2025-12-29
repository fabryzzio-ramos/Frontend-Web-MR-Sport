import { useEffect } from "react";

export default function useSEO({ title, description }) {
    useEffect(() => {
        // TITLE
        document.title = title;

        // DESCRIPTION
        let meta = document.querySelector("meta[name=\"description\"]");  // Cambié ` por "
        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute("name", "description");
            document.head.appendChild(meta);
        }

        meta.setAttribute("content", description);

    }, [title, description]);
}