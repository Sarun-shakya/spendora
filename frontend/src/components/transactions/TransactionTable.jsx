import Badge from "../ui/Badge.jsx";
import { formatCurrency, formatDate } from "../../utils/format.js";

export default function TransactionTable({ transactions, onEdit, onDelete, showBook = false, readOnly = false }) {
  return (
    <div className="overflow-x-auto rounded-md border border-ink-100 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="ledger-rule border-b border-ink-100 text-left text-ink-400">
            <th className="px-4 py-3 font-normal">Date</th>
            <th className="px-4 py-3 font-normal">Category</th>
            {showBook && <th className="px-4 py-3 font-normal">Book</th>}
            <th className="px-4 py-3 font-normal">Payment</th>
            <th className="px-4 py-3 font-normal">Remarks</th>
            <th className="px-4 py-3 text-right font-normal">Amount</th>
            <th className="px-4 py-3 font-normal">Receipt</th>
            {!readOnly && <th className="px-4 py-3" />}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="ledger-rule text-ink-700">
              <td className="whitespace-nowrap px-4 py-3">{formatDate(t.date)}</td>
              <td className="px-4 py-3">{t.category?.name || "—"}</td>
              {showBook && <td className="px-4 py-3">{t.book?.name || "—"}</td>}
              <td className="px-4 py-3 capitalize">{t.paymentMethod}</td>
              <td className="max-w-[200px] truncate px-4 py-3 text-ink-400">{t.remarks || "—"}</td>
              <td className="px-4 py-3 text-right">
                <span className={`num ${t.transactionType === "cashIn" ? "text-ledger-600" : "text-rose-600"}`}>
                  {t.transactionType === "cashIn" ? "+" : "−"} {formatCurrency(t.amount)}
                </span>
              </td>
              <td className="px-4 py-3">
                {t.receipt?.url ? (
                  <a
                    href={t.receipt.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-ink-400 hover:text-ledger-600"
                    title="Download receipt"
                  >
                    <i className="ri-download-line" />
                  </a>
                ) : (
                  <span className="text-ink-300">—</span>
                )}
              </td>
              {!readOnly && (
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onEdit(t)} className="p-1 text-ink-300 hover:text-ledger-600" aria-label="Edit">
                      <i className="ri-pencil-line" />
                    </button>
                    <button onClick={() => onDelete(t)} className="p-1 text-ink-300 hover:text-rose-600" aria-label="Delete">
                      <i className="ri-delete-bin-line" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
