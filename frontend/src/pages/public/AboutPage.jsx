export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-display text-4xl text-ink-900">About Spendora</h1>
      <div className="mt-8 space-y-5 text-ink-600 leading-relaxed">
        <p>
          Spendora started from a simple frustration: most personal finance apps try to do too much at once —
          budgeting advice, investment tracking, bank syncing — before they've gotten the basics right.
        </p>
        <p>
          We wanted something closer to a paper ledger. A place to open a book, write down what came in and
          what went out, tag it with a category, and see the balance settle. No noise, no upsells, no
          guesswork about where your money went this month.
        </p>
        <p>
          That's what Spendora is: books, categories, and transactions, laid out plainly, with just enough
          reporting to answer the question "how am I doing?" without needing a finance degree to read it.
        </p>
      </div>

      <div className="ledger-rule my-12" />

      <h2 className="font-display text-2xl text-ink-900">What we believe</h2>
      <ul className="mt-6 space-y-4 text-ink-600">
        <li className="flex gap-3">
          <i className="ri-checkbox-circle-line mt-0.5 text-ledger-600" />
          <span>Your records should be readable by you, not just by software.</span>
        </li>
        <li className="flex gap-3">
          <i className="ri-checkbox-circle-line mt-0.5 text-ledger-600" />
          <span>Tracking money shouldn't take longer than spending it.</span>
        </li>
        <li className="flex gap-3">
          <i className="ri-checkbox-circle-line mt-0.5 text-ledger-600" />
          <span>A good default beats a hundred configurable options.</span>
        </li>
      </ul>
    </div>
  );
}
