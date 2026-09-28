export default function Input({ label, error, className = "", id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm text-ink-600">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded border px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:border-ledger-500 outline-none transition-colors ${
          error ? "border-rose-400" : "border-ink-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
}
