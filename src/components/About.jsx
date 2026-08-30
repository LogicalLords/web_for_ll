import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/hooks';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

// Animated counter — counts up when scrolled into view, padded to two digits.
function Stat({ value, label }) {
  const ref = useRef(null);
  const numRef = useRef(null);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) {
      numRef.current.textContent = String(value).padStart(2, '0');
      return;
    }
    const obj = { v: 0 };
    const tween = gsap.to(obj, {
      v: value,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      onUpdate: () => {
        numRef.current.textContent = String(Math.round(obj.v)).padStart(2, '0');
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, reduced]);

  return (
    <div ref={ref} className="flex flex-col items-center py-8 text-center">
      <span className="font-display text-5xl text-gold sm:text-6xl" aria-hidden="true">
        <span ref={numRef}>00</span>
      </span>
      <p className="mt-3 max-w-[16ch] font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        {label}
      </p>
    </div>
  );
}

const STATS = [
  { value: 6, label: 'Active Agents' },
  { value: 4, label: 'Mission Files Deployed' },
  { value: 1, label: 'Shared Directive' },
];

export default function About() {
  return (
    <section id="directive" className="relative scroll-mt-14 border-t border-line">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeader index="01" kicker="The Directive" title="Why We Assemble">
          Logical Lords assembles specialists the way an Avengers-style initiative would —
          hand-picked, each with a real GitHub and a record of shipping real code. No rocket
          emojis, no hubris. Six engineers, one shared directive: build the impossible, then ship it.
        </SectionHeader>

        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="space-y-5 text-sm leading-relaxed text-muted">
              <p>
                This isn’t a code club. It’s a personnel file. Every agent on this roster works
                under their own handle, ships their own commits, and is held to the same standard:
                production-grade code, clean review, real deployments.
              </p>
              <p>
                Like an initiative, we don’t operate alone. Each member brings a distinct strength,
                and the mission only ships when those strengths line up — architecture, discipline,
                energy, heavy lifting, precision, and focus.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <figure className="relative border border-line bg-panel p-7">
              <div className="corner-box absolute inset-0" aria-hidden="true" />
              <span className="font-display text-6xl leading-none text-avengers/30" aria-hidden="true">
                “
              </span>
              <blockquote className="mt-2 text-base font-medium leading-relaxed text-ink/90">
                We didn’t set out to build an organization — we set out to build things worth
                shipping. The team came after the code, and the code came because good work is
                never solo.
              </blockquote>
              {/* TODO: replace the placeholder founder quote above with Sudharsan C's actual words. */}
              <figcaption className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                Sudharsan C
                <span className="mt-1 block text-[10px] normal-case tracking-normal text-muted">
                  Founder, Logical Lords
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 border-t border-line pt-4 sm:grid-cols-3 sm:divide-x sm:divide-line">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}