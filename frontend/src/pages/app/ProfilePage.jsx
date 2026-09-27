import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName || "", email: user?.email || "", password: "" });
  const [profileFile, setProfileFile] = useState(null);
  const [preview, setPreview] = useState(user?.profile?.url || null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    if (form.password && form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      if (form.fullName) fd.append("fullName", form.fullName);
      if (form.email) fd.append("email", form.email);
      if (form.password) fd.append("password", form.password);
      if (profileFile) fd.append("profile", profileFile);

      await updateProfile(fd);
      setForm({ ...form, password: "" });
      setSuccess("Profile updated.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <p className="mb-6 text-sm text-ink-400">Update your account details.</p>

      <form onSubmit={onSubmit} className="space-y-5 rounded-md border border-ink-100 bg-white p-6">
        <div className="flex items-center gap-4">
          <label htmlFor="profile" className="cursor-pointer">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-ink-200 bg-ink-50 text-ink-300">
              {preview ? (
                <img src={preview} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <span className="text-lg font-medium text-ink-500">{user?.fullName?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <input id="profile" type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
          <div>
            <p className="text-sm text-ink-700">Profile photo</p>
            <p className="text-xs text-ink-400">Click the circle to change it</p>
          </div>
        </div>

        <Input
          label="Full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="New password (optional)"
          type="password"
          placeholder="Leave blank to keep current password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-sm text-rose-500">{error}</p>}
        {success && <p className="text-sm text-ledger-600">{success}</p>}

        <Button type="submit" loading={loading}>
          Save changes
        </Button>
      </form>
    </div>
  );
}
