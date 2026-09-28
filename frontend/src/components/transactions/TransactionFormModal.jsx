import { useEffect, useState } from "react";
import Modal from "../ui/Modal.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";
import { PAYMENT_METHODS, TRANSACTION_TYPES } from "../../constants/index.js";
import { formatDateInput } from "../../utils/format.js";

const emptyForm = {
  book: "",
  category: "",
  paymentMethod: "cash",
  transactionType: "cashOut",
  date: formatDateInput(),
  amount: "",
  remarks: "",
};

export default function TransactionFormModal({ open, onClose, onSubmit, books, categories, initialData, lockedBookId }) {
  const [form, setForm] = useState(emptyForm);
  const [receiptFile, setReceiptFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError("");
    setReceiptFile(null);
    if (initialData) {
      setForm({
        book: initialData.book?._id || initialData.book || "",
        category: initialData.category?._id || initialData.category || "",
        paymentMethod: initialData.paymentMethod || "cash",
        transactionType: initialData.transactionType || "cashOut",
        date: formatDateInput(initialData.date),
        amount: initialData.amount ?? "",
        remarks: initialData.remarks || "",
      });
    } else {
      setForm({ ...emptyForm, book: lockedBookId || "" });
    }
  }, [open, initialData, lockedBookId]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.book || !form.category || !form.amount || !form.date) {
      setError("Book, category, amount and date are required.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        // book is not editable on update (backend ignores it anyway on PUT)
        if (initialData && key === "book") return;
        fd.append(key, value);
      });
      if (receiptFile) fd.append("receipt", receiptFile);

      await onSubmit(fd);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit transaction" : "Add transaction"} size="lg">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Book"
            required
            options={books.map((b) => ({ value: b._id, label: b.name }))}
            placeholder="Select a book"
            value={form.book}
            disabled={!!initialData || !!lockedBookId}
            onChange={(e) => setForm({ ...form, book: e.target.value })}
          />
          <Select
            label="Category"
            required
            options={categories.map((c) => ({ value: c._id, label: c.name }))}
            placeholder="Select a category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Type"
            options={TRANSACTION_TYPES}
            value={form.transactionType}
            onChange={(e) => setForm({ ...form, transactionType: e.target.value })}
          />
          <Select
            label="Payment method"
            options={PAYMENT_METHODS}
            value={form.paymentMethod}
            onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Amount"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <Input
            label="Date"
            type="date"
            required
            max={formatDateInput()}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <Input
          label="Remarks (optional)"
          value={form.remarks}
          onChange={(e) => setForm({ ...form, remarks: e.target.value })}
          placeholder="What was this for?"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-ink-600">Receipt (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
            className="text-sm text-ink-500 file:mr-3 file:rounded file:border-0 file:bg-ink-50 file:px-3 file:py-1.5 file:text-ink-600"
          />
          {initialData?.receipt?.url && !receiptFile && (
            <p className="text-xs text-ink-400">A receipt is already attached. Choosing a file replaces it.</p>
          )}
        </div>

        {error && <p className="text-sm text-rose-500">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {initialData ? "Save changes" : "Add transaction"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
