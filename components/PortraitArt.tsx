"use client";

/** Decorative fallback portrait — pure SVG/CSS, no image file required.
 *  Used while the real `profile.avatar` is loading or when it 404s. */

type PortraitArtProps = {
  initials: string;
  className?: string;
};

export default function PortraitArt({ initials, className = "" }: PortraitArtProps) {
  // First letter only for the giant monogram.
  const letter = initials.charAt(0).toUpperCase();

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Layered gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(140% 110% at 18% 12%, rgba(124,92,255,0.45) 0%, rgba(124,92,255,0) 55%), radial-gradient(120% 100% at 90% 80%, rgba(34,211,238,0.4) 0%, rgba(34,211,238,0) 60%), linear-gradient(160deg, #0e0f24 0%, #1a1740 60%, #0a0c14 100%)",
        }}
      />

      {/* Subtle grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.12]"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="portrait-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 28 0 L 0 0 0 28"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#portrait-grid)" />
      </svg>

      {/* Soft star dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 100}%`,
              width: 1 + ((i * 7) % 8) / 10,
              height: 1 + ((i * 7) % 8) / 10,
              opacity: 0.25 + ((i * 3) % 6) / 10,
            }}
          />
        ))}
      </div>

      {/* Decorative orbiting ring */}
      <svg
        className="absolute -inset-8 opacity-50"
        viewBox="0 0 200 250"
        fill="none"
        aria-hidden
      >
        <ellipse
          cx="100"
          cy="125"
          rx="90"
          ry="115"
          stroke="url(#ring-grad)"
          strokeWidth="0.6"
          strokeDasharray="2 4"
        />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c5cff" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* Mono monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display text-[8rem] font-medium leading-none text-white/90 sm:text-[9rem] lg:text-[10rem]"
          style={{
            textShadow:
              "0 0 30px rgba(124,92,255,0.55), 0 0 60px rgba(34,211,238,0.3)",
          }}
        >
          {letter}
        </span>
        <span className="-mt-2 font-mono text-[10px] uppercase tracking-[0.5em] text-cyan/80">
          forhad.dev
        </span>
      </div>

      {/* Bottom info chips */}
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-2 sm:inset-x-6 sm:bottom-6">
        <span className="rounded-full border border-cyan/40 bg-void/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-cyan backdrop-blur">
          backend dev
        </span>
        <span className="rounded-full border border-violet/40 bg-void/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-violet-soft backdrop-blur">
          ml · fullstack
        </span>
      </div>
    </div>
  );
}