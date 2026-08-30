import { lazy, Suspense, useCallback, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useElementInView } from '../lib/hooks';
import FlatIcon from './FlatIcon';

const DossierScene = lazy(() => import('../scenes/DossierScene'));

/**
 * Agent dossier card.
 * - Front: hologram panel rendered in a tiny Canvas (lazy-mounted near viewport)
 *   with a spinning low-poly icon that tilts toward the cursor. DOM text overlays
 *   the canvas so names stay crisp and accessible.
 * - Click / tap / Enter / Space flips the card (GSAP rotateY 180) to reveal the
 *   declassified info panel.
 * - Graceful degradation: no WebGL / low-end devices render a static panel + SVG
 *   icon; small screens & reduced motion get tap-to-flip with no cursor tilt.
 */
export default function DossierCard({ member, cap }) {
  const cardRef = useRef(null);
  const flipperRef = useRef(null);
  const githubRef = useRef(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(false);
  const [viewRef, inView] = useElementInView({ rootMargin: '300px 0px' });

  const motion = !cap.reduced;
  const tiltOk = motion && !cap.touch && !cap.lowEnd;
  const canvasOn = cap.webgl && !cap.lowEnd && inView;

  const flipTo = useCallback(
    (next) => {
      setFlipped(next);
      const el = flipperRef.current;
      if (!el) return;
      if (!motion) {
        el.style.transform = next ? 'rotateY(180deg)' : 'rotateY(0deg)';
        return;
      }
      gsap.killTweensOf(el);
      gsap.to(el, {
        rotationY: next ? 180 : 0,
        transformPerspective: 1000,
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete: () => {
          if (next) githubRef.current?.focus({ preventScroll: true });
        },
      });
    },
    [motion],
  );

  const handlePointerMove = (e) => {
    if (!tiltOk || flipped) return;
    const r = cardRef.current.getBoundingClientRect();
    tiltRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    tiltRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
  };

  const handlePointerLeave = () => {
    if (!motion) return;
    gsap.to(tiltRef.current, { x: 0, y: 0, duration: 0.5 });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipTo(!flipped);
    } else if (e.key === 'Escape' && flipped) {
      flipTo(false);
    }
  };

  return (
    <article
      ref={viewRef}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${member.codename} — ${member.name}. Activates to open or close the declassified dossier.`}
      onClick={() => flipTo(!flipped)}
      onKeyDown={handleKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="group relative aspect-[3/4] w-full cursor-pointer outline-none"
    >
      <div
        ref={flipperRef}
        className="absolute inset-0 h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ---------- FRONT: hologram ---------- */}
        <div className="backface-hidden absolute inset-0 h-full w-full">
          <div className="hologram-panel h-full w-full overflow-hidden">
            {canvasOn ? (
              <Suspense fallback={null}>
                <DossierScene member={member} tiltRef={tiltRef} motion={motion} />
              </Suspense>
            ) : (
              <FlatIcon
                kind={member.icon}
                color={member.color}
                accent={member.accent}
                className="absolute left-1/2 top-[6%] h-24 w-24 -translate-x-1/2 opacity-85"
              />
            )}

            <div className="corner-box pointer-events-none absolute inset-0" aria-hidden="true" />
            {!cap.touch ? (
              <div className="scanlines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            ) : null}

            {/* overlay text */}
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-5">
              <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                <span>Clearance: LV-7</span>
                <span className="text-gold">{member.code}</span>
              </div>
              <div>
                <h3
                  className="font-display text-[26px] uppercase leading-none"
                  style={{ color: member.color, textShadow: `0 0 20px ${member.color}55` }}
                >
                  {member.codename}
                </h3>
                <p className="mt-2 font-mono text-sm" style={{ color: member.accent }}>
                  {member.name}
                </p>
                <p className="mt-1 text-xs text-muted">{member.role}</p>
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
                  <span className="h-px w-5 bg-line" aria-hidden="true" />
                  {cap.touch ? 'Tap to declassify' : '[ Enter ] to declassify'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- BACK: declassified info ---------- */}
        <div
          className="backface-hidden absolute inset-0 h-full w-full"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden border border-line bg-panel2 p-5">
            <div className="corner-box pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
              <span className="text-gold">Directive: Declassified</span>
              <span className="text-muted">Opened // 2026</span>
            </div>

            <div className="mt-6 flex-1">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
                Agent {member.code}
              </p>
              <h3 className="mt-2 font-display text-[25px] uppercase leading-tight text-ink">
                {member.name}
              </h3>
              <p className="mt-1 font-mono text-sm text-gold">{member.handle}</p>
              {/* TODO(bios): blurbs with `bioConfirmed: false` in roster.js are placeholder
                  flavor text — swap in the real GitHub bio when available. */}
              <p className="mt-2 text-sm font-semibold" style={{ color: member.color }}>
                {member.role}
              </p>
              <div className="mt-4 border-t border-line pt-4">
                <p className="text-sm leading-relaxed text-muted">{member.blurb}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-hulk" aria-hidden="true" />
                GitHub identity verified
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                ref={githubRef}
                tabIndex={flipped ? 0 : -1}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-transform duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: member.color }}
              >
                View GitHub <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  flipTo(false);
                }}
                className="inline-flex items-center justify-center border border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition-colors hover:border-gold hover:text-gold"
              >
                [ Close File ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}