export const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card" },
  { value: "online", label: "Online" },
  { value: "check", label: "Check" },
];

export const TRANSACTION_TYPES = [
  { value: "cashIn", label: "Income" },
  { value: "cashOut", label: "Expense" },
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Consistent semantic colors used across badges, stat cards and charts
export const COLORS = {
  income: "#2F6F5E",
  expense: "#B4483A",
  neutral: "#C99A3B",
  palette: ["#2F6F5E", "#C99A3B", "#B4483A", "#4F947C", "#DE9184", "#7FB39D", "#E0BD73", "#255A4C"],
};
