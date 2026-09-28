import { Link } from "react-router-dom";

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="group rounded-md border border-ink-100 bg-white p-5 transition-colors hover:border-ledger-300">
      <div className="flex items-start justify-between">
        <Link to={`/app/books/${book._id}`} className="flex-1">
          <h3 className="font-display text-lg text-ink-900">{book.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-400">{book.description}</p>
        </Link>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button onClick={() => onEdit(book)} className="p-1.5 text-ink-400 hover:text-ledger-600" aria-label="Edit book">
            <i className="ri-pencil-line" />
          </button>
          <button onClick={() => onDelete(book)} className="p-1.5 text-ink-400 hover:text-rose-600" aria-label="Delete book">
            <i className="ri-delete-bin-line" />
          </button>
        </div>
      </div>
      <div className="ledger-rule mt-4 pt-3">
        <Link to={`/app/books/${book._id}`} className="text-sm text-ledger-600 hover:underline">
          Open book
        </Link>
      </div>
    </div>
  );
}
