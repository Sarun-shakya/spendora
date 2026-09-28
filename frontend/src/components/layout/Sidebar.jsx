import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const links = [
  {
    to: "/app",
    label: "Dashboard",
    icon: "ri-dashboard-2-line",
    end: true,
  },
  {
    to: "/app/transactions",
    label: "Transactions",
    icon: "ri-exchange-line",
  },
  {
    to: "/app/books",
    label: "Books",
    icon: "ri-book-2-line",
  },
  {
    to: "/app/categories",
    label: "Categories",
    icon: "ri-price-tag-3-line",
  },
  {
    to: "/app/monthly-report",
    label: "Monthly Report",
    icon: "ri-calendar-check-line",
  },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed z-40 flex min-h-screen w-64 flex-col border-r border-ink-100 bg-white transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-7">
          <i className="ri-quill-pen-line text-2xl text-ledger-600" />

          <span className="font-display text-xl font-bold text-ink-900">
            Spendora
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                  ? "bg-ledger-50 font-semibold text-ledger-700"
                  : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                }`
              }
            >
              <i className={`${link.icon} text-xl`} />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto px-3 pb-6">
          <div className="ledger-rule mb-4" />

          {/* Profile */}
          <NavLink
            to="/app/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive
                ? "bg-ledger-50 font-semibold text-ledger-700"
                : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
              }`
            }
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-ink-100 text-sm font-bold text-ink-700">
              <img
                src={user?.profile?.url}
                alt="profile"
                className="h-full w-full rounded-full object-cover"
              />
            </span>

            <span className="truncate">
              {user?.fullName || "Profile"}
            </span>
          </NavLink>

          {/* Logout */}
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-ink-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <i className="ri-logout-box-r-line text-xl" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}