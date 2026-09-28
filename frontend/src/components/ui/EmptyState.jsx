export default function EmptyState({ icon = "ri-inbox-line", title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded border border-dashed border-ink-200 bg-white/60 px-6 py-16 text-center">
      <i className={`${icon} text-3xl text-ink-300`} />
      <h3 className="text-base font-medium text-ink-700">{title}</h3>
      {description && <p className="max-w-sm text-sm text-ink-400">{description}</p>}
      {action}
    </div>
  );
}
