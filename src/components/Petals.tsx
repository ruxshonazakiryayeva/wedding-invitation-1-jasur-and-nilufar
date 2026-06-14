import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
  rotate: number;
  hue: number;
};

export function Petals({ count = 24 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 14,
        size: 8 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 220,
        opacity: 0.5 + Math.random() * 0.35,
        rotate: Math.random() * 360,
        hue: Math.random() < 0.5 ? 0 : 1,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-[-40px] block"
          style={{
            left: `${p.left}%`,
            width: `${p.size * 1.4}px`,
            height: `${p.size * 2}px`,
            opacity: p.opacity,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          <RosePetal tone={p.hue} />
        </span>
      ))}
    </div>
  );
}

function RosePetal({ tone }: { tone: number }) {
  // Soft white / cream gradient petal
  const base = tone === 0 ? "#ffffff" : "#fff6ea";
  const edge = tone === 0 ? "#f4e6d2" : "#e8d3b3";
  return (
    <svg
      viewBox="0 0 40 60"
      width="100%"
      height="100%"
      style={{
        filter: "drop-shadow(0 2px 3px rgba(120, 80, 40, 0.18))",
        animation: "petal-spin 6s ease-in-out infinite",
      }}
    >
      <defs>
        <radialGradient id={`pg-${tone}`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor={base} stopOpacity="0.98" />
          <stop offset="70%" stopColor={base} stopOpacity="0.85" />
          <stop offset="100%" stopColor={edge} stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <path
        d="M20 2 C32 14, 36 30, 28 48 C25 55, 20 58, 20 58 C20 58, 15 55, 12 48 C4 30, 8 14, 20 2 Z"
        fill={`url(#pg-${tone})`}
        stroke={edge}
        strokeWidth="0.4"
        strokeOpacity="0.5"
      />
      <path
        d="M20 8 C22 22, 22 38, 20 54"
        stroke={edge}
        strokeOpacity="0.4"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}
