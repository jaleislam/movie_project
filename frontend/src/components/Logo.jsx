const Logo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="url(#logoGrad)" />
    <path d="M19 15L34 24L19 33V15Z" fill="#ffffff" />
    <circle cx="24" cy="24" r="21.25" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1.5" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0" style={{ stopColor: "var(--accent)" }} />
        <stop offset="1" style={{ stopColor: "#8b5cf6" }} />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;