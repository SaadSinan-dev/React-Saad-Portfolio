/**
 * Column rules for the whole page.
 *
 * Not a decorative "grid background" — these hairlines sit on the same shell
 * and gutters that every section aligns to, so the underlying structure of the
 * layout is simply made visible. Column count steps up with the breakpoint, so
 * the rhythm matches the content grid rather than fighting it.
 *
 * Fixed and painted once; nothing here repaints on scroll.
 */
export default function GridRules() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="shell relative grid h-full grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className={`h-full border-s border-line/60 ${
              i >= 4 ? 'hidden xl:block' : i >= 2 ? 'hidden md:block' : ''
            }`}
          />
        ))}
        {/* Closes the last column so the rules read as a frame, not a fade-out. */}
        <div className="absolute inset-y-0 end-gutter w-px bg-line/60" />
      </div>
    </div>
  );
}
