const variants = {
  primary: "bg-ledger-500 text-white hover:bg-ledger-600 disabled:bg-ink-200",
  secondary: "bg-white text-ink-700 border border-ink-200 hover:border-ink-300 disabled:opacity-50",
  ghost: "text-ink-500 hover:text-ink-800 hover:bg-ink-50",
  danger: "bg-rose-500 text-white hover:bg-rose-600 disabled:bg-ink-200",
};

const sizes = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-5 py-3",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  loading = false,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded font-medium transition-colors disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <i className="ri-loader-4-line animate-spin text-base" />
      ) : (
        icon && <i className={`${icon} text-base`} />
      )}
      {children}
    </button>
  );
}
