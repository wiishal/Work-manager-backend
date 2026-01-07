import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: url,
});

axiosInstance.interceptors.request.use((config) => {
  const isAuthReq = config.url.includes("/api/v1/auth/") ? true : false;

  if (!isAuthReq) {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
