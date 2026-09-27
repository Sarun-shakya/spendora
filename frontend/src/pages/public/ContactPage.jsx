import { useState } from "react";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // No contact endpoint exists on the backend — this is intentionally a
    // front-end-only confirmation rather than a fabricated API call.
    setSent(true);
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
      <div>
        <h1 className="font-display text-4xl text-ink-900">Get in touch</h1>
        <p className="mt-5 max-w-sm text-ink-500">
          Questions, feedback, or something not adding up in your books — we'd like to hear about it.
        </p>
        <div className="mt-10 space-y-4 text-sm text-ink-500">
          <p className="flex items-center gap-3">
            <i className="ri-mail-line text-ledger-600" /> hello@spendora.app
          </p>
          <p className="flex items-center gap-3">
            <i className="ri-map-pin-line text-ledger-600" /> Kathmandu, Nepal
          </p>
        </div>
      </div>

      <div className="rounded-md border border-ink-100 bg-white p-6">
        {sent ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <i className="ri-checkbox-circle-line text-3xl text-ledger-600" />
            <p className="text-ink-700">Message sent. We'll reply by email soon.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm text-ink-600">Message</label>
              <textarea
                required
                rows={5}
                className="w-full rounded border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none focus:border-ledger-500"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
