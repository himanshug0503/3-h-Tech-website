export const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const fetchJson = async (path) => {
  const response = await fetch(`${apiBase}${path}`);
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json();
};
