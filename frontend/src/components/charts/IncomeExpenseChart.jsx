import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { COLORS } from "../../constants/index.js";
import { formatCurrency } from "../../utils/format.js";

// Groups the user's full transaction list by month, client-side, using only real data
export default function IncomeExpenseChart({ transactions }) {
  const byMonth = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    if (!byMonth[key]) byMonth[key] = { key, income: 0, expense: 0 };
    if (t.transactionType === "cashIn") byMonth[key].income += t.amount;
    else byMonth[key].expense += t.amount;
  });

  const data = Object.values(byMonth)
    .sort((a, b) => a.key.localeCompare(b.key))
    .slice(-6)
    .map((row) => ({
      ...row,
      label: new Date(`${row.key}-01`).toLocaleDateString("en-IN", { month: "short" }),
    }));

  if (data.length === 0) {
    return <p className="flex h-64 items-center justify-center text-sm text-ink-400">No transactions yet to chart.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} stroke="#E4E6E9" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} stroke="#9AA1AB" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="#9AA1AB" width={40} />
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Bar dataKey="income" fill={COLORS.income} radius={[3, 3, 0, 0]} name="Income" />
        <Bar dataKey="expense" fill={COLORS.expense} radius={[3, 3, 0, 0]} name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}
