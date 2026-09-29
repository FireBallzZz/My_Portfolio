"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { profile, stats } from "@/lib/data";
import SectionTag from "./SectionTag";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString() + suffix;
      }
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

type Part = { t: string; c: "violet" | "cyan" | "ink" | "muted" };
type Line = { type: "comment" | "code" | "result" | "blank"; parts: Part[] };

const BIO_LINES: Line[] = [
  { type: "comment", parts: [{ t: "# who am I?", c: "muted" }] },
  {
    type: "code",
    parts: [
      { t: "const", c: "violet" },
      { t: " forhad", c: "ink" },
      { t: " = ", c: "ink" },
      { t: "{", c: "muted" },
    ],
  },
  {
    type: "code",
    parts: [
      { t: "  role", c: "cyan" },
      { t: ": ", c: "muted" },
      { t: '"CSE undergrad @ UAP"', c: "ink" },
      { t: ",", c: "muted" },
    ],
  },
  {
    type: "code",
    parts: [
      { t: "  focus", c: "cyan" },
      { t: ": [", c: "muted" },
      { t: '"ML"', c: "ink" },
      { t: ", ", c: "muted" },
      { t: '"full-stack"', c: "ink" },
      { t: ", ", c: "muted" },
      { t: '"research"', c: "ink" },
      { t: "],", c: "muted" },
    ],
  },
  {
    type: "code",
    parts: [
      { t: "  builds", c: "cyan" },
      { t: ": ", c: "muted" },
      { t: '"things that ship"', c: "ink" },
      { t: ",", c: "muted" },
    ],
  },
  { type: "code", parts: [{ t: "};", c: "muted" }] },
  { type: "blank", parts: [] },
  {
    type: "code",
    parts: [
      { t: "forhad", c: "violet" },
      { t: ".", c: "muted" },
      { t: "thesis", c: "cyan" },
      { t: "(", c: "muted" },
    ],
  },
  {
    type: "code",
    parts: [
      { t: "  input", c: "cyan" },
      { t: ": ", c: "muted" },
      { t: "classroom_video", c: "ink" },
      { t: ",", c: "muted" },
    ],
  },
  {
    type: "code",
    parts: [
      { t: "  output", c: "cyan" },
      { t: ": ", c: "muted" },
      { t: "attention_score", c: "ink" },
      { t: ", ", c: "muted" },
      { t: "pedagogical_recs", c: "ink" },
      { t: ",", c: "muted" },
    ],
  },
  {
    type: "code",
    parts: [
      { t: "  novel", c: "cyan" },
      { t: ": ", c: "muted" },
      { t: "true", c: "ink" },
      { t: ", ", c: "muted" },
      { t: "// AGG metric", c: "muted" },
    ],
  },
  { type: "code", parts: [{ t: ");", c: "muted" }] },
  { type: "blank", parts: [] },
  {
    type: "result",
    parts: [
      { t: "▸ ", c: "cyan" },
      { t: "expected graduation", c: "muted" },
      { t: "  ", c: "muted" },
      { t: "2026", c: "ink" },
    ],
  },
];

const COLOR: Record<Part["c"], string> = {
  violet: "text-violet",
  cyan: "text-cyan",
  ink: "text-ink",
  muted: "text-muted",
};

/** Stylised "EU" mark — geometric, monogrammed. No external assets. */
function EutropiaMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-label="Eutropia"
      role="img"
    >
      <defs>
        <linearGradient id="euGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="10"
        fill="#0a0c14"
        stroke="url(#euGrad)"
        strokeWidth="1.5"
      />
      {/* Stylised "E" shape */}
      <path
        d="M13 11 H27 M13 11 V29 M13 20 H24 M13 29 H27"
        stroke="url(#euGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="20" r="1.6" fill="#22d3ee" />
    </svg>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.2 });
  const [shownLines, setShownLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shownLines >= BIO_LINES.length) return;
    const line = BIO_LINES[shownLines];
    const totalChars =
      line.type === "code" || line.type === "result" || line.type === "comment"
        ? line.parts.reduce((acc, p) => acc + p.t.length, 0)
        : 0;
    const delay =
      line.type === "blank"
        ? 60
        : line.type === "comment"
          ? 220
          : Math.max(160, totalChars * 18);
    const timer = setTimeout(() => setShownLines((s) => s + 1), delay);
    return () => clearTimeout(timer);
  }, [inView, shownLines]);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTag index="01" stage="embedding" title="About" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="gradient-border relative overflow-hidden rounded-2xl"
          >
            <div className="gradient-border-inner overflow-hidden rounded-[calc(1rem-1px)] bg-[#08091a]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  ~ /about/forhad.tsx
                </span>
                <span className="font-mono text-[10px] text-cyan">bio</span>
              </div>
              <pre
                className="overflow-x-auto p-5 font-mono text-[12px] leading-6 sm:text-[13px]"
                aria-label="Bio as code"
              >
                {BIO_LINES.slice(0, shownLines).map((line, i) => {
                  if (line.type === "blank")
                    return <div key={i} className="h-3" />;
                  return (
                    <div key={i} className="whitespace-pre-wrap">
                      {line.parts.map((p, j) => (
                        <span key={j} className={COLOR[p.c]}>
                          {p.t}
                        </span>
                      ))}
                      {line.type === "code" && i === shownLines - 1 && (
                        <span className="animate-caret text-cyan">▍</span>
                      )}
                    </div>
                  );
                })}
              </pre>
            </div>
          </motion.div>

          <div className="flex flex-col justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  className="border-l border-line pl-4"
                >
                  <div className="font-display text-3xl font-medium text-ink sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-2 border-t border-line pt-5 font-mono text-sm text-muted"
            >
              <div>
                <span className="text-cyan">@</span> {profile.university}
              </div>
              <div>
                <span className="text-cyan">@</span> {profile.location}
              </div>
              <div>
                <span className="text-cyan">@</span> open to{" "}
                <span className="text-ink">research collaborations</span> &amp;{" "}
                <span className="text-ink">full-stack roles</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-cyan/30 bg-gradient-to-br from-cyan/[0.07] via-panel-2 to-violet/[0.04] p-4 sm:p-5"
            >
              {/* Header strip */}
              <div className="flex items-center justify-between border-b border-line/60 pb-3">
                <div className="flex items-center gap-3">
                  <EutropiaMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
                  <div className="min-w-0">
                    <div className="font-display text-base font-medium text-ink sm:text-lg">
                      Eutropia
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      backend · production
                    </div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-emerald-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  current
                </span>
              </div>

              {/* Role */}
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4 className="font-display text-lg font-medium text-ink sm:text-xl">
                  Backend Developer Intern
                </h4>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-cyan">
                  2025 — Present · Hybrid
                </span>
              </div>

              {/* Bullet list */}
              <ul className="mt-3 space-y-1.5 text-[12px] leading-relaxed text-violet-soft sm:text-[13px]">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  Shipping production APIs alongside senior backend engineers.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  Designing REST endpoints, schemas, and service-to-service contracts.
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  Owning code review, deployment, and on-call hygiene end-to-end.
                </li>
              </ul>

              {/* Footer chip row */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line/60 pt-3">
                {["Node.js", "REST APIs", "PostgreSQL", "API Integration", "Code Review"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-void/40 px-2 py-0.5 font-mono text-[10px] text-muted"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>

              {/* Decorative glow */}
              <span
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan/10 blur-3xl"
                aria-hidden
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
