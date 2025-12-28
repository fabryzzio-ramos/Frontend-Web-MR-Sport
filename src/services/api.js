const API_URL = import.meta.env.VITE_API_URL;

export const apiGet = async (endpoint) => {

    const res = await fetch(API_URL + endpoint, {
        credentials: "include"
    });

    if (!res.ok) throw new Error("Error en la API");

    return await res.json();
};

export async function apiPost(endpoint, data, isFormData = false, method = "POST") {
    const options = {
        method,
        credentials: "include"
    };

    if (isFormData) {
        options.body = data;
    } else {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(data);
    }

    const res = await fetch(API_URL + endpoint, options);

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Error en la API");
    return result;
}

export async function apiDelete(endpoint) {

    const res = await fetch(API_URL + endpoint, {
        method: "DELETE",
        credentials: "include"
    });

    if (!res.ok) throw new Error("Error al eliminar");

    return res.json();
}