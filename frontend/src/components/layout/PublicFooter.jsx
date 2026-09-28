import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="border-t border-ink-100">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="ledger-rule mb-8" />
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <i className="ri-quill-pen-line text-lg text-ledger-600" />
              <span className="font-display text-base text-ink-900">Spendora</span>
            </div>
            <p className="max-w-xs text-sm text-ink-400">
              A calm way to keep your books — every rupee in, every rupee out, in one plain ledger.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="mb-3 text-sm text-ink-800">Product</p>
              <ul className="space-y-2 text-sm text-ink-400">
                <li><Link to="/features" className="hover:text-ink-700">Features</Link></li>
                <li><Link to="/register" className="hover:text-ink-700">Get started</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm text-ink-800">Company</p>
              <ul className="space-y-2 text-sm text-ink-400">
                <li><Link to="/about" className="hover:text-ink-700">About</Link></li>
                <li><Link to="/contact" className="hover:text-ink-700">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 text-xs text-ink-300">© {new Date().getFullYear()} Spendora. All entries reserved.</p>
      </div>
    </footer>
  );
}
