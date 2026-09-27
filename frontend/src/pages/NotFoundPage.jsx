import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-5 text-center">
      <span className="font-display text-6xl text-ink-200">404</span>
      <h1 className="font-display text-2xl text-ink-900">This page isn't in the ledger</h1>
      <p className="max-w-sm text-sm text-ink-500">
        The page you're looking for doesn't exist, or may have moved.
      </p>
      <Link to="/">
        <Button className="mt-2">Back to home</Button>
      </Link>
    </div>
  );
}
