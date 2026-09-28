import { useEffect, useState } from "react";
import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

export default function BookFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({ name: initialData?.name || "", description: initialData?.description || "" });
      setError("");
    }
  }, [open, initialData]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit book" : "New book"}>
      <form onSubmit={submit} className="space-y-4">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Personal, Freelance, Trip to Pokhara"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink-600">Description</label>
          <textarea
            required
            rows={3}
            className="w-full rounded border border-ink-200 px-3.5 py-2.5 text-sm text-ink-800 outline-none focus:border-ledger-500"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What this book is for"
          />
        </div>
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {initialData ? "Save changes" : "Create book"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
