import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";

const TITLES = {
  "/app": "Dashboard",
  "/app/transactions": "Transactions",
  "/app/books": "Books",
  "/app/categories": "Categories",
  "/app/monthly-report": "Monthly report",
  "/app/profile": "Profile",
};

function resolveTitle(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/app/books/")) return "Book";
  return "Spendora";
}

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = resolveTitle(pathname);
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink-100 bg-paper/90 px-5 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-ink-500 md:hidden" aria-label="Open menu">
          <i className="ri-menu-line text-xl" />
        </button>
        <h1 className="text-lg font-display text-ink-900">{title}</h1>
      </div>
      <Button size="sm" icon="ri-add-line" onClick={() => navigate("/app/transactions?new=1")}>
        Add transaction
      </Button>
    </header>
  );
}
