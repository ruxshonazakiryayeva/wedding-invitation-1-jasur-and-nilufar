import { useMemo } from "react";

const EMOJIS = ["🌸", "🌺", "🌷", "🥀"];

export function Petals({ count = 22 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: 14 + Math.random() * 22,
        drift: (Math.random() - 0.5) * 200,
        emoji: EMOJIS[i % EMOJIS.length],
        opacity: 0.5 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
