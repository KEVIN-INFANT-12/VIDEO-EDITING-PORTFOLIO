interface MarqueeProps {
  items: string[];
  duration?: number;
  className?: string;
  separator?: string;
}

/** Infinite horizontal marquee (CSS-driven; pauses under reduced-motion). */
export default function Marquee({
  items,
  duration = 38,
  className = '',
  separator = '✦',
}: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={`relative flex overflow-hidden ${className}`}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
      aria-hidden
    >
      <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap">
        {row.map((it, i) => (
          <span key={i} className="flex items-center">
            <span>{it}</span>
            <span className="mx-6 text-violet-glow/70 md:mx-10">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
