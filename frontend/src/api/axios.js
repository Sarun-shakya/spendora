import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true, // backend auth is a JWT httpOnly cookie, not a bearer token
});

// Normalize error messages so components can just read err.message
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "Something went wrong. Please try again.";
    return Promise.reject({ ...err, message, status: err.response?.status });
  }
);

export default api;
