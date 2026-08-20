import { useEffect, useRef } from "react";

const BOLTS = [
  { top: "5%", left: "10%", delay: "0s", duration: "2.2s", scale: 1 },
  { top: "12%", left: "45%", delay: "0.4s", duration: "1.8s", scale: 0.7 },
  { top: "20%", left: "80%", delay: "0.9s", duration: "2.6s", scale: 1.1 },
  { top: "30%", left: "25%", delay: "1.3s", duration: "2s", scale: 0.85 },
  { top: "38%", left: "60%", delay: "0.2s", duration: "2.4s", scale: 1 },
  { top: "45%", left: "5%", delay: "1.7s", duration: "1.9s", scale: 0.9 },
  { top: "45%", left: "30%", delay: "0.6s", duration: "2.1s", scale: 1.2 },
  { top: "52%", left: "88%", delay: "2.1s", duration: "2.3s", scale: 0.75 },
  { top: "60%", left: "40%", delay: "0.1s", duration: "1.7s", scale: 1 },
  { top: "65%", left: "70%", delay: "1.2s", duration: "2.5s", scale: 0.95 },
  { top: "70%", left: "15%", delay: "0.8s", duration: "2s", scale: 1.05 },
  { top: "78%", left: "55%", delay: "1.9s", duration: "1.8s", scale: 0.8 },
  { top: "85%", left: "15%", delay: "0.3s", duration: "2.3s", scale: 1 },
  { top: "85%", left: "82%", delay: "1.5s", duration: "2.1s", scale: 0.9 },
  { top: "92%", left: "35%", delay: "0.7s", duration: "1.9s", scale: 1.1 },
];

const SPARK_COUNT = 8;

const LightningBackground = () => {
  const bgRef = useRef(null);
  const sparksRef = useRef([]);
  const rafRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const trail = useRef([]);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    const handleMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      el.style.setProperty("--cursor-x", `${e.clientX}px`);
      el.style.setProperty("--cursor-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMove);

    // kursor arxasında qalan sparkların hərəkəti
    const animate = () => {
      trail.current.unshift({ ...mouse.current });
      trail.current = trail.current.slice(0, SPARK_COUNT * 4);

      sparksRef.current.forEach((node, i) => {
        const point = trail.current[i * 4];
        if (node && point) {
          node.style.left = `${point.x}px`;
          node.style.top = `${point.y}px`;
          node.style.opacity = String(1 - i / SPARK_COUNT);
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="lightning-bg" ref={bgRef}>
      {/* kursoru izləyən işıq halosu */}
      <div className="cursor-glow" />

      {/* kursorun arxasınca qalan spark izləri */}
      {Array.from({ length: SPARK_COUNT }).map((_, i) => (
        <div
          key={`spark-${i}`}
          ref={(node) => (sparksRef.current[i] = node)}
          className="cursor-spark"
          style={{ animationDelay: `${i * 0.03}s` }}
        />
      ))}

      {BOLTS.map((bolt, i) => (
        <svg
          key={i}
          className="lightning-bolt"
          style={{
            top: bolt.top,
            left: bolt.left,
            animationDelay: bolt.delay,
            animationDuration: bolt.duration,
            transform: `scale(${bolt.scale})`,
          }}
          width="40"
          height="90"
          viewBox="0 0 40 90"
          fill="none"
        >
          <path
            d="M22 0L4 48H18L14 90L38 36H22L28 0H22Z"
            fill="var(--accent)"
          />
        </svg>
      ))}
    </div>
  );
};

export default LightningBackground;