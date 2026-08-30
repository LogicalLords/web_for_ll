// Original SVG glyphs used as the static (no-WebGL / low-end / loading) fallback
// for each agent's hologram icon. No copyrighted character art — abstract shapes
// that echo each codename.
function hex(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3 - Math.PI / 2;
    return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');
}

const GLYPHS = {
  core: (color, accent) => (
    <g>
      <polygon points={hex(32, 32, 14)} fill="none" stroke={accent} strokeWidth="3" transform="rotate(15 32 32)" />
      <circle cx="32" cy="32" r="6" fill={color} />
      <circle cx="32" cy="32" r="6" fill={color} opacity="0.15" />
    </g>
  ),
  shield: (color, accent) => (
    <g>
      <polygon points={hex(32, 32, 16)} fill={color} stroke={accent} strokeWidth="2" />
      <polygon points={hex(32, 32, 8)} fill={accent} />
    </g>
  ),
  bolt: (color) => (
    <path
      d="M38 3 L14 40 H25 L18 62 L48 26 H34 L44 3 Z"
      fill={color}
      stroke="#ffffff"
      strokeOpacity="0.18"
      strokeWidth="2"
    />
  ),
  fist: (color) => (
    <g>
      <rect x="21" y="10" width="22" height="26" rx="5" fill={color} />
      <rect x="17" y="32" width="30" height="16" rx="5" fill={color} />
      <rect x="21" y="44" width="8" height="12" rx="3" fill={color} opacity="0.9" />
      <rect x="31" y="44" width="9" height="14" rx="3" fill={color} opacity="0.9" />
      <rect x="13" y="26" width="10" height="18" rx="4" fill={color} opacity="0.85" transform="rotate(-18 13 26)" />
    </g>
  ),
  hourglass: (color, accent) => (
    <g>
      <path d="M18 6 H46 L33 32 L46 58 H18 L31 32 Z" fill={color} />
      <rect x="30" y="29.5" width="4" height="5" fill={accent} />
    </g>
  ),
  target: (color, accent) => (
    <g>
      <circle cx="32" cy="32" r="15" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="32" cy="32" r="8" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="32" cy="32" r="3.5" fill={accent} />
    </g>
  ),
};

export default function FlatIcon({ kind, color, accent = '#c9a24b', className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      {GLYPHS[kind] ? GLYPHS[kind](color, accent) : null}
    </svg>
  );
}