import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function RegisterPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [profileFile, setProfileFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("fullName", form.fullName);
      fd.append("email", form.email);
      fd.append("password", form.password);
      if (profileFile) fd.append("profile", profileFile);

      await register(fd);
      await login({ email: form.email, password: form.password });
      navigate("/app", { replace: true });
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

        <h1 className="mb-1 text-center font-display text-2xl text-ink-900">Open your ledger</h1>
        <p className="mb-8 text-center text-sm text-ink-400">Takes less than a minute.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex justify-center">
            <label htmlFor="profile" className="cursor-pointer">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-dashed border-ink-200 bg-white text-ink-300">
                {preview ? (
                  <img src={preview} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  <i className="ri-camera-line text-xl" />
                )}
              </div>
              <input id="profile" type="file" accept="image/*" className="hidden" onChange={onFile} />
            </label>
          </div>

          <Input
            label="Full name"
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            placeholder="Asha Rai"
          />
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
            placeholder="At least 8 characters"
          />
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <Button type="submit" className="w-full" loading={loading}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-400">
          Already have an account?{" "}
          <Link to="/login" className="text-ledger-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
