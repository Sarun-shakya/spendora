import { Link } from "react-router-dom";
import { useDashboardStats } from "../../hooks/useAnalytics.js";
import { useTransactions } from "../../hooks/useTransactions.js";
import StatCard from "../../components/ui/StatCard.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import Badge from "../../components/ui/Badge.jsx";
import IncomeExpenseChart from "../../components/charts/IncomeExpenseChart.jsx";
import CategoryBreakdownChart from "../../components/charts/CategoryBreakdownChart.jsx";
import { formatCurrency, formatDate } from "../../utils/format.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function DashboardPage() {
  const { user } = useAuth();
  const { stats, loading, error } = useDashboardStats();
  const { transactions, loading: txLoading } = useTransactions();

  if (loading) return <Spinner full />;
  if (error) return <p className="text-sm text-rose-500">{error}</p>;

  return (
    <div className="space-y-8">
      <p className="text-sm text-ink-400">Welcome back, {user?.fullName?.split(" ")[0]}. Here's where things stand.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total income" value={formatCurrency(stats.totalIncome)} tone="income" icon="ri-arrow-down-circle-line" />
        <StatCard label="Total expense" value={formatCurrency(stats.totalExpense)} tone="expense" icon="ri-arrow-up-circle-line" />
        <StatCard label="Balance" value={formatCurrency(stats.balance)} icon="ri-scales-3-line" />
        <StatCard label="Transactions" value={stats.totalTransactions} icon="ri-list-check-3" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-ink-100 bg-white p-5">
          <h3 className="mb-4 text-sm text-ink-500">Income vs expense, last 6 months</h3>
          {!txLoading && <IncomeExpenseChart transactions={transactions} />}
        </div>
        <div className="rounded-md border border-ink-100 bg-white p-5">
          <h3 className="mb-4 text-sm text-ink-500">Where expenses go</h3>
          {!txLoading && <CategoryBreakdownChart transactions={transactions} />}
        </div>
      </div>

      <div className="rounded-md border border-ink-100 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm text-ink-500">Recent transactions</h3>
          <Link to="/app/transactions" className="text-sm text-ledger-600 hover:underline">
            View all
          </Link>
        </div>
        {stats.recentTransactions?.length ? (
          <div>
            {stats.recentTransactions.map((t) => (
              <div key={t._id} className="ledger-rule flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Badge tone={t.transactionType === "cashIn" ? "income" : "expense"}>
                    {t.transactionType === "cashIn" ? "Income" : "Expense"}
                  </Badge>
                  <div>
                    <p className="text-sm text-ink-700">{t.category?.name || "Uncategorized"}</p>
                    <p className="text-xs text-ink-300">{formatDate(t.date)}</p>
                  </div>
                </div>
                <span className={`num text-sm ${t.transactionType === "cashIn" ? "text-ledger-600" : "text-rose-600"}`}>
                  {t.transactionType === "cashIn" ? "+" : "−"} {formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-ink-400">No transactions yet.</p>
        )}
      </div>
    </div>
  );
}
