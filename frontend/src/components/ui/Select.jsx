export default function Select({ label, error, options, placeholder, className = "", id, ...props }) {
  const selectId = id || props.name;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm text-ink-600">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded border bg-white px-3.5 py-2.5 text-sm text-ink-800 focus:border-ledger-500 outline-none transition-colors ${
          error ? "border-rose-400" : "border-ink-200"
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </div>
  );
}
