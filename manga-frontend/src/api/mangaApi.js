const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request(path, options) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request gagal (${res.status})`);
  }
  return res.json();
}

export const getAllManga = () => request("/manga");
export const createManga = (data) => request("/manga", { method: "POST", body: JSON.stringify(data) });
export const updateMangaApi = (id, data) => request(`/manga/${id}`, { method: "PATCH", body: JSON.stringify(data) });
export const deleteMangaApi = (id) => request(`/manga/${id}`, { method: "DELETE" });
