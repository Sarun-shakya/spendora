import { useState } from "react";
import { useMonthlyReport } from "../../hooks/useAnalytics.js";
import StatCard from "../../components/ui/StatCard.jsx";
import TransactionTable from "../../components/transactions/TransactionTable.jsx";
import Select from "../../components/ui/Select.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { MONTHS } from "../../constants/index.js";
import { formatCurrency, monthYearLabel } from "../../utils/format.js";

const now = new Date();
const years = Array.from({ length: 6 }, (_, i) => now.getFullYear() - i);

export default function MonthlyReportPage() {
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));
  const { report, loading, error } = useMonthlyReport(month, year);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3">
        <Select
          label="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          options={MONTHS.map((m, i) => ({ value: String(i + 1), label: m }))}
        />
        <Select
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          options={years.map((y) => ({ value: String(y), label: String(y) }))}
        />
      </div>

      {loading && <Spinner full />}
      {error && <p className="text-sm text-rose-500">{error}</p>}

      {report && !loading && (
        <>
          <h2 className="font-display text-xl text-ink-900">{monthYearLabel(report.month, report.year)}</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Income" value={formatCurrency(report.totalIncome)} tone="income" />
            <StatCard label="Expense" value={formatCurrency(report.totalExpense)} tone="expense" />
            <StatCard label="Balance" value={formatCurrency(report.balance)} />
            <StatCard label="Transactions" value={report.totalTransactions} />
          </div>

          {report.transactions?.length === 0 ? (
            <EmptyState icon="ri-calendar-line" title="No transactions this month" />
          ) : (
            <TransactionTable transactions={report.transactions} showBook readOnly />
          )}
        </>
      )}
    </div>
  );
}
