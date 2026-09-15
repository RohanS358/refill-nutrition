import { cn } from "@/lib/utils";

/**
 * Double helix, drawn on scroll via .draw-path (wrap in <Draw>).
 * Strands are normalized (pathLength=1); rungs fade in as nodes.
 *
 * Geometry is computed from a single cosine wave (amplitude AMP, period
 * PERIOD) so the rung endpoints sit exactly on the strands. Each quarter
 * period is a Hermite cubic, which keeps the correct steep slope at the
 * crossings instead of pinching into lens shapes.
 */

const CX = 160;
const AMP = 100;
const PERIOD = 320;
const HEIGHT = 640;
const QUARTER = PERIOD / 4;

const strandX = (y: number, phase: 1 | -1) =>
  CX - phase * AMP * Math.cos((2 * Math.PI * y) / PERIOD);

/** dx/dy of the strand at y. */
const strandSlope = (y: number, phase: 1 | -1) =>
  phase * AMP * ((2 * Math.PI) / PERIOD) * Math.sin((2 * Math.PI * y) / PERIOD);

function strandPath(phase: 1 | -1) {
  let d = `M${strandX(0, phase).toFixed(1)} 0`;
  for (let y0 = 0; y0 < HEIGHT; y0 += QUARTER) {
    const y1 = y0 + QUARTER;
    const h = QUARTER / 3;
    const c1 = strandX(y0, phase) + strandSlope(y0, phase) * h;
    const c2 = strandX(y1, phase) - strandSlope(y1, phase) * h;
    d += ` C${c1.toFixed(1)} ${(y0 + h).toFixed(1)}, ${c2.toFixed(1)} ${(y1 - h).toFixed(1)}, ${strandX(y1, phase).toFixed(1)} ${y1}`;
  }
  return d;
}

/** Base pairs every 32px, skipping the crossings where the strands meet. */
const rungs = Array.from({ length: HEIGHT / 32 }, (_, i) => 16 + i * 32)
  .map((y) => ({
    y,
    half: Math.abs(AMP * Math.cos((2 * Math.PI * y) / PERIOD)),
  }))
  .filter((r) => r.half > 30);

export function Helix({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 320 ${HEIGHT}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-full w-auto", className)}
    >
      <path
        className="draw-path"
        pathLength={1}
        d={strandPath(1)}
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        className="draw-path"
        pathLength={1}
        d={strandPath(-1)}
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ transitionDelay: "calc(var(--draw-delay, 0ms) + 150ms)" }}
      />
      <g className="draw-node" stroke="currentColor" strokeWidth="1" opacity="0.7">
        {rungs.map((r) => (
          <line key={r.y} x1={CX - r.half} y1={r.y} x2={CX + r.half} y2={r.y} />
        ))}
      </g>
      <g className="draw-node">
        {rungs.map((r) => (
          <g key={r.y} fill="currentColor">
            <circle cx={CX - r.half} cy={r.y} r="3" />
            <circle cx={CX + r.half} cy={r.y} r="3" />
          </g>
        ))}
      </g>
    </svg>
  );
}
