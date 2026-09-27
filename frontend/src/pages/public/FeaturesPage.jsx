import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";

const features = [
  {
    icon: "ri-book-2-line",
    title: "Books",
    text: "Group transactions into separate books — one for home, one for a project, one for savings. Each book keeps its own totals.",
  },
  {
    icon: "ri-price-tag-3-line",
    title: "Categories",
    text: "Create categories that match how you actually spend and earn, and attach one to every transaction.",
  },
  {
    icon: "ri-exchange-line",
    title: "Transactions",
    text: "Log income and expenses with an amount, date, payment method, and an optional receipt photo.",
  },
  {
    icon: "ri-dashboard-2-line",
    title: "Dashboard",
    text: "See total income, total expense, and balance across every book the moment you log in.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Monthly reports",
    text: "Pick any month and year to see totals and every transaction that happened in that window.",
  },
  {
    icon: "ri-file-download-line",
    title: "PDF export",
    text: "Download a clean PDF statement of any book's transactions for your records or to share.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="max-w-lg font-display text-4xl text-ink-900">Everything a ledger needs, nothing it doesn't</h1>
      <p className="mt-5 max-w-md text-ink-500">
        Spendora doesn't try to be a budgeting coach or an investment app. It's a straightforward record
        of what moved, when, and why.
      </p>

      <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
        {features.map((f) => (
          <div key={f.title} className="flex gap-4">
            <i className={`${f.icon} mt-1 text-2xl text-ledger-600`} />
            <div>
              <h3 className="text-base font-medium text-ink-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-ink-100 pt-10 text-center">
        <Link to="/register">
          <Button size="lg">Open your first book</Button>
        </Link>
      </div>
    </div>
  );
}
