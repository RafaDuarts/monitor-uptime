import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getSites = () => API.get("/sites");
export const addSite = (data) => API.post("/sites", data);
export const deleteSite = (id) => API.delete(`/sites/${id}`);
export const getLogs = (id) => API.get(`/sites/${id}/logs`);
