export default function Badge({ children, tone = "neutral" }) {
  const tones = {
    income: "bg-ledger-50 text-ledger-700",
    expense: "bg-rose-100 text-rose-600",
    neutral: "bg-ink-50 text-ink-500",
  };
  return (
    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
