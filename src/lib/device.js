import { useMemo } from 'react';

function detectWebGL() {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'),
    );
  } catch {
    return false;
  }
}

function detectReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * One-time device capability probe used to gracefully degrade the 3D scenes:
 * no WebGL -> static styled fallbacks, low-end hardware -> fewer/cheaper canvases,
 * reduced motion -> no motion, touch -> tap-to-flip instead of cursor tilt.
 */
export function useDeviceCapability() {
  return useMemo(() => {
    if (typeof window === 'undefined') {
      return { webgl: false, reduced: false, lowEnd: false, touch: false };
    }
    const webgl = detectWebGL();
    const reduced = detectReducedMotion();
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    const lowEnd = webgl && (cores <= 4 || memory <= 4);
    const touch = 'ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0;
    return { webgl, reduced, lowEnd, touch };
  }, []);
}