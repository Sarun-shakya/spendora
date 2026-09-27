import api from "./axios.js";

export const getTransactions = () => api.get("/transaction");
export const getTransactionById = (id) => api.get(`/transaction/${id}`);
export const getTransactionsByBook = (bookId) => api.get(`/transaction/book/${bookId}`);

export const createTransaction = (formData) =>
  api.post("/transaction", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateTransaction = (id, formData) =>
  api.put(`/transaction/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// NOTE: relies on the backend route being fixed to DELETE /transaction/:id
export const deleteTransaction = (id) => api.delete(`/transaction/${id}`);

export const downloadBookTransactionPDF = (bookId) =>
  api.get(`/transaction/${bookId}/download-pdf`, { responseType: "blob" });
