import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../ui/Button.jsx";

const links = [
  { to: "/features", label: "Features" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-paper/90 shadow-md backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <i className="ri-quill-pen-line text-xl text-ledger-600" />
          <span className="font-display text-lg text-ink-900">Spendora</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-base font-medium transition-colors ${isActive ? "text-ink-900" : "text-ink-700 hover:text-ink-900"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Button size="sm" onClick={() => navigate("/app")}>
              Go to dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
                Get started
              </Button>
            </>
          )}
        </div>

        <button className="text-ink-600 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          <i className={open ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"} />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm text-ink-600">
                {l.label}
              </NavLink>
            ))}
            <div className="ledger-rule my-2" />
            {isAuthenticated ? (
              <Button size="sm" onClick={() => navigate("/app")}>Go to dashboard</Button>
            ) : (
              <>
                <Button variant="secondary" size="sm" onClick={() => navigate("/login")}>Log in</Button>
                <Button size="sm" onClick={() => navigate("/register")}>Get started</Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
