// Shared primitives: icons, album art placeholders
const { useMemo } = React;

// ---- Icons (inline SVG, original designs) ----
const Icon = {
  Search: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  ),
  Check: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 12.5 10 18 20 6"/>
    </svg>
  ),
  X: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 6l12 12M18 6 6 18"/>
    </svg>
  ),
  Lock: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4" y="10" width="16" height="11" rx="2"/>
      <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
    </svg>
  ),
  Pause: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>
    </svg>
  ),
  Play: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7 5v14l12-7z"/>
    </svg>
  ),
  // Socials — geometric, original strokes
  Instagram: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17" cy="7" r="0.9" fill="currentColor"/>
    </svg>
  ),
  X_twitter: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...p}>
      <path d="M4 4l7.5 9.2L4.5 20h2.7l5.7-5.9L17.4 20H20l-7.8-9.6L19.6 4h-2.7L11.7 9.6 7.4 4z" fill="currentColor" stroke="none"/>
    </svg>
  ),
  TikTok: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5"/>
      <path d="M14 4c.5 2.5 2.5 4 5 4"/>
    </svg>
  ),
  Spotify: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M7 10c3.5-1 7-.5 10 1"/>
      <path d="M7.5 13.5c3-.8 6-.3 8.5 1"/>
      <path d="M8 16.5c2.5-.6 5-.3 7 .8"/>
    </svg>
  ),
  YouTube: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2.5" y="6" width="19" height="12" rx="3"/>
      <path d="M11 9.5v5l4-2.5z" fill="currentColor" stroke="none"/>
    </svg>
  ),
};

// Deterministic hash from a string → integer
function hash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// ---- Album art: abstract striped / geometric placeholder per song ----
function AlbumArt({ song, size = 160 }) {
  const [c1, c2] = song.grad;
  const h = hash(song.id);
  const variant = h % 4;
  const rot = (h % 60) - 30;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g-${song.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={c2}/>
        </linearGradient>
        <pattern id={`p-${song.id}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform={`rotate(${rot})`}>
          <rect width="8" height="8" fill="transparent"/>
          <line x1="0" y1="0" x2="0" y2="8" stroke="white" strokeOpacity="0.12" strokeWidth="1.5"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill={`url(#g-${song.id})`}/>
      <rect width="100" height="100" fill={`url(#p-${song.id})`}/>

      {variant === 0 && (
        <>
          <circle cx="50" cy="50" r="22" fill="none" stroke="white" strokeOpacity="0.85" strokeWidth="1.5"/>
          <circle cx="50" cy="50" r="4" fill="white" fillOpacity="0.9"/>
        </>
      )}
      {variant === 1 && (
        <>
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="1.5"/>
          <line x1="20" y1="50" x2="80" y2="50" stroke="white" strokeOpacity="0.6" strokeWidth="1"/>
          <line x1="50" y1="20" x2="50" y2="80" stroke="white" strokeOpacity="0.6" strokeWidth="1"/>
        </>
      )}
      {variant === 2 && (
        <>
          <polygon points="50,22 78,72 22,72" fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="1.5"/>
          <circle cx="50" cy="55" r="8" fill="white" fillOpacity="0.25"/>
        </>
      )}
      {variant === 3 && (
        <>
          <path d="M20 70 Q35 40 50 55 T80 40" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" fill="none"/>
          <circle cx="20" cy="70" r="2.5" fill="white"/>
          <circle cx="80" cy="40" r="2.5" fill="white"/>
        </>
      )}

      {/* subtle vignette */}
      <rect width="100" height="100" fill="url(#vign)"/>
      <defs>
        <radialGradient id="vign" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="black" stopOpacity="0"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.35"/>
        </radialGradient>
      </defs>
    </svg>
  );
}

Object.assign(window, { Icon, AlbumArt, hash });
