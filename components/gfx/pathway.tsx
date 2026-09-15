import { cn } from "@/lib/utils";

/**
 * Clinical nutrition pathway: a route through the named protocol steps
 * (lib/solutions.ts → protocolSteps). Wrap in <Draw> to animate; the
 * junctions and their labels fade in after the route arrives.
 *
 * Labelled, so it is content rather than decoration: the <title> names it
 * for assistive tech instead of aria-hidden (docs/accessibility.md §9).
 */

/** Alternating peak/trough heights, so the route reads as a progression. */
const Y = [300, 180, 260, 120, 200] as const;
const X0 = 40;
const STEP = 180;
const VB_H = 360;

export function Pathway({
  stages,
  className,
}: {
  /** Ordered step labels — normally protocolSteps' titles. */
  stages: readonly string[];
  className?: string;
}) {
  const pts = stages.map((label, i) => ({
    label,
    x: X0 + i * STEP,
    y: Y[i % Y.length],
  }));

  // Smooth route: first curve explicit, the rest mirror it with S.
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const prev = pts[i - 1];
      const dx = (p.x - prev.x) * 0.45;
      return i === 1
        ? `C ${prev.x + dx} ${prev.y} ${p.x - dx} ${p.y} ${p.x} ${p.y}`
        : `S ${p.x - dx} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");

  // Labels are centred on their node, so the outer ones need room beyond the
  // route itself — pad by half the widest label rather than clipping it.
  const PAD = 60;
  const width = X0 * 2 + (stages.length - 1) * STEP + PAD * 2;

  return (
    <svg
      viewBox={`${-PAD} 0 ${width} ${VB_H}`}
      fill="none"
      role="img"
      focusable="false"
      className={cn("w-full", className)}
    >
      <title>{`The clinical nutrition pathway: ${stages.join(", then ")}.`}</title>
      <path
        className="draw-path"
        pathLength={1}
        d={d}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <g className="draw-node">
        {pts.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={p.x}
              cy={p.y}
              r="5"
              fill={i === pts.length - 1 ? "currentColor" : "var(--background)"}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx={p.x} cy={p.y} r="11" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
          </g>
        ))}
      </g>
      {/* Step labels — blueprint idiom: spaced uppercase micro type. */}
      <g
        className="draw-node"
        fill="currentColor"
        fontSize="11"
        fontFamily="inherit"
        letterSpacing="0.18em"
        textAnchor="middle"
      >
        {pts.map((p, i) => (
          <text key={p.label} x={p.x} y={p.y - 26}>
            {String(i + 1).padStart(2, "0")} {p.label.toUpperCase()}
          </text>
        ))}
      </g>
    </svg>
  );
}
