const API_URL = import.meta.env.VITE_API_URL;

export const apiGet = async (endpoint) => {
    const token = localStorage.getItem("token");
    
    const res = await fetch(API_URL + endpoint, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error("Error en la API");

    return await res.json();
};

export async function apiPost(endpoint, data, auth = false) {
    const headers = {
        "Content-Type": "application/json"
    };

    if (auth) {
        const token = localStorage.getItem("token");
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(API_URL + endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Error en la API");
    return result;
}

export async function apiDelete(endpoint, auth = false) {
    const headers = {};

    if (auth) {
        const token = localStorage.getItem("token");
        headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(API_URL + endpoint, {
        method: "DELETE",
        headers,
    });

    if (!res.ok) throw new Error("Error al eliminar");

    return res.json();
}