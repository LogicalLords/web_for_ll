import Reveal from './Reveal';

export default function SectionHeader({ index, kicker, title, accent = 'text-gold', children }) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted">
        <span className={accent}>{index} //</span> {kicker}
      </p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">{title}</h2>
      <div className="mt-5 flex items-center gap-3" aria-hidden="true">
        <span className="h-px w-16 bg-avengers" />
        <span className="h-px w-24 bg-line" />
      </div>
      {children ? (
        <div className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{children}</div>
      ) : null}
    </Reveal>
  );
}