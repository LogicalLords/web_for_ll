function ShieldMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <polygon
        points="12,2.5 20,6.5 20,17.5 12,21.5 4,17.5 4,6.5"
        fill="#14171f"
        stroke="#c9a24b"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2.6" fill="#e0202c" />
    </svg>
  );
}

const LINKS = [
  { href: '#directive', label: 'Directive' },
  { href: '#initiative', label: 'The Initiative' },
  { href: '#mission-files', label: 'Mission Files' },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-void/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6"
      >
        <a
          href="#top"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink transition-colors hover:text-gold"
        >
          <ShieldMark />
          <span>Logical Lords</span>
        </a>
        <ul className="flex items-center gap-4 sm:gap-7">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}