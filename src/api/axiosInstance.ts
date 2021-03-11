import axios from "axios";

const api = axios.create({
  baseURL: "https://atlashouse.dev.vshleifman.co.uk/api",
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
