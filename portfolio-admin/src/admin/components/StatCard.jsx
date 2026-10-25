export default function StatCard({ label, value, hint }) {
  return (
    <div className="panel p-5 sm:p-6">
      <p className="label">{label}</p>
      <p className="mt-5 text-4xl font-semibold tracking-tight text-ink">{value}</p>
      {hint && <p className="mt-2 text-xs text-faint">{hint}</p>}
    </div>
  );
}
