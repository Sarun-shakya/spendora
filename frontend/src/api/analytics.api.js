import api from "./axios.js";

export const getDashboardStats = () => api.get("/analytics/dashboard");
export const getMonthlyReport = (month, year) =>
  api.get("/analytics/monthly-report", { params: { month, year } });
export const getBookSummary = (bookId) => api.get(`/analytics/book-summary/${bookId}`);
