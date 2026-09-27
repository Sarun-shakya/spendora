import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/app", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5 py-16">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-10 flex items-center justify-center gap-2">
          <i className="ri-quill-pen-line text-xl text-ledger-600" />
          <span className="font-display text-lg text-ink-900">Spendora</span>
        </Link>

        <h1 className="mb-1 text-center font-display text-2xl text-ink-900">Welcome back</h1>
        <p className="mb-8 text-center text-sm text-ink-400">Log in to see where your money stands.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
          <Input
            label="Password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
          />
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <Button type="submit" className="w-full" loading={loading}>
            Log in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-400">
          New to Spendora?{" "}
          <Link to="/register" className="text-ledger-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
