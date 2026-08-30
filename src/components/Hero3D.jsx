import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { useDeviceCapability } from '../lib/device';

const HeroScene = lazy(() => import('../scenes/HeroScene'));

const TITLE = 'LOGICAL LORDS';

function hexPoints(size) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 2;
    return `${(Math.cos(a) * size).toFixed(1)},${(Math.sin(a) * size).toFixed(1)}`;
  }).join(' ');
}

// Static styled fallback used only when WebGL is unavailable.
function StaticShield() {
  return (
    <svg
      viewBox="-108 -108 216 216"
      className="h-56 w-56 sm:h-80 sm:w-80"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 34px rgba(224,32,44,0.28))' }}
    >
      <polygon points={hexPoints(96)} fill="#191d27" stroke="#2a2e3a" strokeWidth="3" transform="rotate(15)" />
      <polygon points={hexPoints(82)} fill="#14171f" stroke="#2a2e3a" strokeWidth="3" transform="rotate(-15)" />
      <polygon points={hexPoints(66)} fill="#10131a" stroke="#c9a24b" strokeWidth="2" transform="rotate(15)" />
      <circle cx="0" cy="0" r="26" fill="#c9a24b" opacity="0.15" />
      <circle cx="0" cy="0" r="14" fill="#c9a24b" />
      <circle cx="0" cy="0" r="92" fill="none" stroke="#e0202c" strokeWidth="3" />
    </svg>
  );
}

/**
 * Full-viewport hero: booting scanline, declassify stamp, 3D shield + particles,
 * then a letter-by-letter headline reveal — all driven by one GSAP timeline.
 */
export default function Hero3D() {
  const cap = useDeviceCapability();
  const deferred = !cap.webgl || cap.reduced;

  const bootRef = useRef({ shield: 0 });
  const scanRef = useRef(null);
  const stampRef = useRef(null);
  const canvasWrap = useRef(null);
  const sectionRef = useRef(null);
  const [phase, setPhase] = useState('scan');

  useLayoutEffect(() => {
    if (deferred) {
      bootRef.current.shield = 1;
      setPhase('full');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set('.hero-letter', { autoAlpha: 0, y: 26 });
      gsap.set('.hero-fade', { autoAlpha: 0, y: 18 });
      gsap.set(scanRef.current, { yPercent: -120 });
      gsap.set(stampRef.current, {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: -50,
        scale: 0.6,
        rotation: -8,
      });

      const tl = gsap.timeline({ onComplete: () => setPhase('full') });

      tl.to(scanRef.current, { yPercent: 100, duration: 1.0, ease: 'power2.inOut' })
        .call(() => setPhase('stamp'))
        .to(stampRef.current, {
          autoAlpha: 1,
          scale: 1,
          rotation: -4,
          duration: 0.3,
          ease: 'back.out(2.2)',
        })
        .to(stampRef.current, {
          autoAlpha: 0,
          scale: 1.45,
          rotation: 3,
          duration: 0.4,
          ease: 'power2.in',
          delay: 1.15,
        })
        .call(() => setPhase('shield'))
        .to(canvasWrap.current, { autoAlpha: 1, duration: 0.45 }, '<')
        .to(bootRef.current, { shield: 1, duration: 1.5, ease: 'power2.inOut' }, '<')
        .call(() => setPhase('title'))
        .to('.hero-letter', {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: { each: 0.05 },
          ease: 'power2.out',
        })
        .to(
          '.hero-fade',
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' },
          '+=0.1',
        )
        .to(scanRef.current, { autoAlpha: 0, duration: 0.3 }, '<');
    }, sectionRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const letterCls = deferred ? 'hero-letter' : 'hero-letter opacity-0';
  const fadeCls = (extra = '') => `hero-fade ${deferred ? '' : 'opacity-0'} ${extra}`;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void"
    >
      {/* 3D layer (shield + embers) / static fallback */}
      <div ref={canvasWrap} className="absolute inset-0" style={deferred ? undefined : { opacity: 0 }}>
        {!cap.webgl ? (
          <div className="absolute inset-0 flex items-center justify-center pb-28">
            <StaticShield />
          </div>
        ) : (
          <Suspense fallback={null}>
            <HeroScene
              bootRef={bootRef}
              motion={!cap.reduced}
              dpr={cap.lowEnd ? 1 : 1.75}
              particleCount={cap.touch || cap.lowEnd ? 220 : 420}
            />
          </Suspense>
        )}
      </div>

      {/* vignette to keep the headline readable over the shield */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 42%, transparent 38%, rgba(10,12,17,0.9) 100%)',
        }}
      />

      {/* boot scanline sweep */}
      {!deferred ? (
        <div
          ref={scanRef}
          className="pointer-events-none absolute inset-0 z-30"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(236,238,243,0.08) 46%, rgba(201,162,75,0.35) 50%, rgba(236,238,243,0.08) 54%, transparent 100%)',
          }}
        />
      ) : null}

      {/* declassify stamp */}
      {!deferred ? (
        <div ref={stampRef} className="absolute left-1/2 top-[32%] z-40 font-mono" aria-hidden="true">
          <div className="corner-box relative border border-avengers/70 bg-panel px-8 py-3 text-xs uppercase tracking-[0.4em] text-avengers shadow-[0_0_34px_rgba(224,32,44,0.25)]">
            FILE // UNSEALED
          </div>
        </div>
      ) : null}

      {/* headline + CTAs */}
      <div
        data-phase={phase}
        className="pointer-events-none relative z-40 flex w-full flex-col items-center px-6 pb-28 pt-24 text-center"
      >
        <p
          className={`font-mono text-[9px] uppercase tracking-[0.5em] text-gold sm:text-[11px] ${deferred ? '' : 'opacity-0'}`}
        >
          initiative record // personnel file // 2026
        </p>

        <h1
          className="mt-5 font-display text-[clamp(2.6rem,15vw,8.5rem)] uppercase leading-[0.95] text-ink"
          aria-label={TITLE}
          style={{
            textShadow:
              '0 4px 24px rgba(10,12,17,0.85), 0 0 90px rgba(10,12,17,0.65), 0 6px 40px rgba(10,12,17,0.9)',
          }}
        >
          {TITLE.split('').map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={letterCls}
              style={!deferred ? { transform: 'translateY(26px)' } : undefined}
            >
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </h1>

        <p
          className={`mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base ${deferred ? '' : 'opacity-0'}`}
        >
          Six developers. One directive: <span className="font-medium text-ink">ship the impossible.</span>
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#initiative"
            className={`pointer-events-auto inline-flex items-center gap-3 border border-avengers bg-avengers px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-avengers ${deferred ? '' : 'opacity-0'}`}
          >
            <span className="text-[9px] text-gold">01 //</span> Meet The Initiative
          </a>
          <a
            href="#mission-files"
            className={`pointer-events-auto inline-flex items-center gap-3 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors duration-300 hover:border-gold hover:text-gold ${deferred ? '' : 'opacity-0'}`}
          >
            <span className="text-[9px] text-gold">02 //</span> View Mission Files
          </a>
        </div>
      </div>

      {/* bottom HUD */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-5 z-30 flex items-end justify-between px-6 font-mono text-[9px] uppercase tracking-[0.3em] text-muted sm:px-10"
        aria-hidden="true"
      >
        <span>grid 07.41 // Record 2026</span>
        <span className="hidden items-center gap-3 sm:flex">
          scroll // initiate
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            <span className="scroll-pip absolute inset-x-0 top-0 h-3 bg-gold" />
          </span>
        </span>
        <span>
          status: <span className="text-hulk">active</span>
        </span>
      </div>
    </section>
  );
}