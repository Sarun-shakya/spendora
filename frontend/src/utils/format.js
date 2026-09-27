export const formatCurrency = (amount = 0) =>
  `रु ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0)}`;

export const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("ne-NP", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateInput = (date) => {
  const d = date ? new Date(date) : new Date();
  return d.toISOString().split("T")[0];
};

export const monthYearLabel = (month, year) => {
  const d = new Date(Number(year), Number(month) - 1, 1);

  return d.toLocaleDateString("ne-NP", {
    month: "long",
    year: "numeric",
  });
};