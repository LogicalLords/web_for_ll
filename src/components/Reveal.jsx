import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/hooks';

/**
 * ScrollTrigger reveal — fades + lifts content into view once.
 * Respects prefers-reduced-motion (content is simply visible).
 */
export default function Reveal({ children, className = '', y = 30, delay = 0 }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const el = ref.current;
    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        delay,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, y, delay]);

  return (
    <div ref={ref} className={className} style={reduced ? undefined : { opacity: 0 }}>
      {children}
    </div>
  );
}