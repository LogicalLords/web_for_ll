import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/hooks';
import { useDeviceCapability } from '../lib/device';
import { PORTFOLIOS, PROJECTS } from '../data/missions';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

/**
 * 3D "file drawer" card — slides and rotates open toward the viewer on scroll
 * (ScrollTrigger), then tilts subtly toward the cursor on hover. Opens in a new tab.
 */
function MissionCard({ file, idx }) {
  const cap = useDeviceCapability();
  const ref = useRef(null);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const el = ref.current;
    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y: 80, rotationX: -28, transformOrigin: '50% 0%' },
      {
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        duration: 0.85,
        delay: (idx % 2) * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [idx, reduced]);

  const tiltOk = !cap.touch && !cap.reduced && !cap.lowEnd;

  const handlePointerMove = (e) => {
    if (!tiltOk || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, {
      rotationX: -ny * 5,
      rotationY: nx * 7,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handlePointerLeave = () => {
    if (!tiltOk || !ref.current) return;
    gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'power3.out', overwrite: 'auto' });
  };

  return (
    <article
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative overflow-hidden border border-line bg-panel transition-colors duration-300 hover:border-gold/60"
    >
      {/* drawer tab */}
      <div className="flex items-center justify-between border-b border-line bg-panel2 px-4 py-2.5">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.3em]"
          style={{ color: file.accent }}
        >
          {file.badge}
        </span>
        <span className="font-mono text-[10px] text-muted">{file.serial}</span>
      </div>

      <div className="relative p-6">
        <div className="scanlines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative">
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted">{file.owner}</p>
          <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-ink">{file.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{file.desc}</p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
              {file.serial.slice(0, 3)} // verified
            </span>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink transition-colors duration-200 hover:border-gold hover:text-gold"
            >
              Open File <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* drawer pull handle */}
      <div
        className="absolute -right-1 top-1/2 hidden h-10 w-5 -translate-y-1/2 rounded-l-sm bg-avengers/80 sm:block"
        aria-hidden="true"
      />

      {/* barcode strip */}
      <div
        className="h-3 w-full opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, currentcolor 0 2px, transparent 2px 5px)',
          color: file.accent,
        }}
      />
    </article>
  );
}

function FileGroup({ label, count, files, colorClass }) {
  return (
    <div>
      <Reveal>
        <div className="mb-5 flex items-center gap-4">
          <h3 className={`font-mono text-[11px] uppercase tracking-[0.4em] ${colorClass}`}>{label}</h3>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
            {count} files archived
          </span>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {files.map((file, i) => (
          <Reveal key={file.serial} delay={i * 0.08}>
            <MissionCard file={file} idx={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function MissionFiles() {
  return (
    <section id="mission-files" className="relative scroll-mt-14 border-t border-line">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader index="03" kicker="Mission Files" title="Deployed Assets" accent="text-thor">
          Portfolios and shipped projects pulled from the initiative’s post-op reports. Every
          link opens in a new tab — no files sealed here.
        </SectionHeader>

        <div className="space-y-16">
          <FileGroup label="Agent Portfolios" count={PORTFOLIOS.length} files={PORTFOLIOS} colorClass="text-gold" />
          <FileGroup label="Shipped Projects" count={PROJECTS.length} files={PROJECTS} colorClass="text-thor" />
        </div>
      </div>
    </section>
  );
}