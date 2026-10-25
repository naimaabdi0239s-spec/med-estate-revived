const drips = [
  { l: 6, w: 22, h: 70, d: 4.5 },
  { l: 14, w: 14, h: 120, d: 6 },
  { l: 23, w: 28, h: 55, d: 5 },
  { l: 33, w: 16, h: 140, d: 7 },
  { l: 44, w: 20, h: 85, d: 5.5 },
  { l: 55, w: 30, h: 60, d: 4.8 },
  { l: 63, w: 14, h: 130, d: 6.4 },
  { l: 72, w: 24, h: 95, d: 5.2 },
  { l: 82, w: 18, h: 150, d: 7.4 },
  { l: 91, w: 22, h: 65, d: 4.2 },
];

export function MeltingWordmark() {
  return (
    <div className="relative select-none overflow-hidden pb-40" aria-label="Med Estate">
      <svg className="absolute h-0 w-0" aria-hidden>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
        </filter>
      </svg>
      <div className="relative text-ink-muted/40" style={{ filter: "url(#goo)" }}>
        <p className="melt-text whitespace-nowrap text-center font-serif text-[22vw] leading-[0.8] tracking-tight">
          Med Estate
        </p>
        {drips.map((d, i) => (
          <span key={i} className="absolute" style={{ left: `${d.l}%`, top: "78%" }}>
            <span
              className="melt-drip block rounded-b-full bg-current"
              style={{ width: d.w, height: d.h, ["--d" as string]: `${d.d}s`, animationDelay: `${i * 0.35}s` }}
            />
            <span
              className="melt-drop absolute left-1/2 block -translate-x-1/2 rounded-full bg-current"
              style={{ top: d.h - 6, width: d.w * 0.7, height: d.w * 0.8, ["--d" as string]: `${d.d}s`, animationDelay: `${i * 0.35}s` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
