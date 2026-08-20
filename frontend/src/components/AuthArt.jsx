const AuthArt = () => (
  <svg viewBox="0 0 500 600" className="auth-art-svg" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="authGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style={{ stopColor: "var(--accent)" }} />
        <stop offset="1" style={{ stopColor: "#8b5cf6" }} stopOpacity="0.4" />
      </linearGradient>
    </defs>

    <circle cx="250" cy="220" r="150" fill="url(#authGrad1)" opacity="0.25" className="auth-art-pulse" />
    <circle cx="250" cy="220" r="100" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" className="auth-art-ring" />
    <circle cx="250" cy="220" r="60" fill="var(--accent)" opacity="0.15" />

    <path d="M235 190L285 220L235 250V190Z" fill="#ffffff" opacity="0.9" />

    {Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * Math.PI * 2;
      const r = 190;
      const x = 250 + Math.cos(angle) * r;
      const y = 220 + Math.sin(angle) * r;
      return (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 4 : 2}
          fill="var(--accent)"
          className="auth-art-dot"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      );
    })}

    <rect x="60" y="470" width="120" height="4" rx="2" fill="var(--accent)" opacity="0.3" />
    <rect x="60" y="490" width="80" height="4" rx="2" fill="var(--accent)" opacity="0.2" />
    <rect x="320" y="60" width="120" height="4" rx="2" fill="var(--accent)" opacity="0.3" />
    <rect x="360" y="80" width="80" height="4" rx="2" fill="var(--accent)" opacity="0.2" />
  </svg>
);

export default AuthArt;