import { Link } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";

const ledgerLines = [
  { label: "Rent", type: "Cash out", amount: "− ₹18,000", tone: "text-rose-600" },
  { label: "Freelance payout", type: "Cash in", amount: "+ ₹42,500", tone: "text-ledger-600" },
  { label: "Groceries", type: "Cash out", amount: "− ₹3,240", tone: "text-rose-600" },
  { label: "Dividend", type: "Cash in", amount: "+ ₹1,800", tone: "text-ledger-600" },
];

const principles = [
  {
    icon: "ri-book-2-line",
    title: "Books, not buckets",
    text: "Keep separate books for home, a side business, or a trip — each with its own running balance, the way a real ledger would.",
  },
  {
    icon: "ri-price-tag-3-line",
    title: "Categories you define",
    text: "Rent, groceries, freelance income — name your own categories instead of fitting your life into someone else's presets.",
  },
  {
    icon: "ri-bar-chart-2-line",
    title: "Reports when you need them",
    text: "Pull a monthly report or a per-book summary in a click, and export any book's transactions as a PDF for your records.",
  },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <h1 className="max-w-md font-display text-4xl leading-[1.15] text-ink-900 md:text-5xl">
              Keep your money in a ledger, not a headache.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-500">
              Spendora is a plain, book-by-book way to track what comes in and what goes out —
              built for people who want clarity, not another dashboard to manage.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/register">
                <Button size="lg">Start your ledger</Button>
              </Link>
              <Link to="/features" className="text-sm text-ink-500 hover:text-ink-800">
                See how it works
              </Link>
            </div>
          </div>

          {/* <div className="rounded-md border border-ink-100 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-ink-800">Personal Book</span>
              <span className="num text-sm text-ink-400">This month</span>
            </div>
            {ledgerLines.map((line, i) => (
              <div key={i} className="ledger-rule flex items-center justify-between py-3 first:border-t-0">
                <div>
                  <p className="text-sm text-ink-700">{line.label}</p>
                  <p className="text-xs text-ink-300">{line.type}</p>
                </div>
                <span className={`num text-sm ${line.tone}`}>{line.amount}</span>
              </div>
            ))}
            <div className="mt-3 flex items-center justify-between pt-1">
              <span className="text-sm text-ink-800">Balance</span>
              <span className="num text-base font-medium text-ink-900">₹23,060</span>
            </div>
          </div> */}

          <div className="overflow-hidden rounded-md border border-ink-100 bg-white shadow-sm">
            <img
              src="https://img.magnific.com/free-vector/success-startup-managers-working-near-growth-profit-chart-financial-achievement-work-progress-rocket-launch-tiny-corporate-people-flat-vector-illustration-finance-opportunity-concept_74855-22554.jpg?semt=ais_hybrid&w=740&q=80"
              alt="Minimalist financial planning workspace"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-t border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <h2 className="max-w-md font-display text-2xl text-ink-900">Three ideas, everything else follows</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title}>
                <i className={`${p.icon} text-2xl text-ledger-600`} />
                <h3 className="mt-4 text-base font-medium text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8">
        <h2 className="mx-auto max-w-md font-display text-3xl text-ink-900">
          Your first book takes about a minute to open.
        </h2>
        <div className="mt-8">
          <Link to="/register">
            <Button size="lg">Get started, it's free</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
