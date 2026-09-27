import api from "./axios.js";

export const registerUser = (formData) =>
  api.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const loginUser = (payload) => api.post("/users/login", payload);

export const logoutUser = () => api.post("/users/logout");

export const fetchProfile = () => api.get("/users/profile");

export const updateProfile = (formData) =>
  api.put("/users/update-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
