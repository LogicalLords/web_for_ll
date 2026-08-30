export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-panel/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="font-display text-3xl uppercase tracking-wide">
              Logical <span className="text-gold">Lords</span>
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
              Six developers // one directive
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
            <span className="pulse-dot h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            <span className="text-gold">File Status: Active</span>
            <span className="text-muted">// Last Updated 2026</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 font-mono text-[9px] uppercase tracking-[0.25em] text-muted md:flex-row">
          <span>© 2026 Logical Lords. All files sealed unless declassified.</span>
          <span>Built with React + Three.js // original geometry only</span>
        </div>
      </div>
    </footer>
  );
}