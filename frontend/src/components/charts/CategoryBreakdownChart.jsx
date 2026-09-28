import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { COLORS } from "../../constants/index.js";
import { formatCurrency } from "../../utils/format.js";

// Built from the real transaction list (grouped client-side) — no invented endpoint
export default function CategoryBreakdownChart({ transactions }) {
  const totals = {};
  transactions
    .filter((t) => t.transactionType === "cashOut")
    .forEach((t) => {
      const name = t.category?.name || "Uncategorized";
      totals[name] = (totals[name] || 0) + t.amount;
    });

  const data = Object.entries(totals).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return <p className="flex h-64 items-center justify-center text-sm text-ink-400">No expenses to break down yet.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS.palette[i % COLORS.palette.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => formatCurrency(v)} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
