export default function Spinner({ full = false }) {
  const spinner = <i className="ri-loader-4-line animate-spin text-2xl text-ledger-500" />;
  if (full) {
    return <div className="flex min-h-[40vh] w-full items-center justify-center">{spinner}</div>;
  }
  return spinner;
}
