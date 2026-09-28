export default function StatCard({ label, value, tone = "neutral", icon }) {
  const toneClasses = {
    income: "text-ledger-600",
    expense: "text-rose-600",
    neutral: "text-ink-900",
  };
  return (
    <div className="rounded-md border border-ink-100 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-ink-400">{label}</span>
        {icon && <i className={`${icon} text-lg text-ink-300`} />}
      </div>
      <p className={`num text-2xl font-display ${toneClasses[tone]}`}>{value}</p>
    </div>
  );
}
