"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Server,
  Boxes,
  Wrench,
  Sparkles,
} from "lucide-react";
import { skillGroups } from "@/lib/data";
import SectionTag from "./SectionTag";

const ICON_MAP: Record<string, React.ElementType> = {
  Frontend: Code2,
  Backend: Server,
  "Machine Learning": Brain,
  Tooling: Wrench,
};

const bento = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Skills() {
  const [frontend, backend, ml, tooling] = skillGroups;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTag index="02" stage="features" title="Skills" />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[180px]">
          <BentoTile i={0} className="lg:col-span-2">
            <TileHead
              Icon={ICON_MAP[frontend.label]}
              tag={frontend.tag}
              label={frontend.label}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {frontend.skills.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
            <div className="bento-orb -right-12 -top-12 bg-violet/40" aria-hidden />
          </BentoTile>

          <BentoTile i={1}>
            <TileHead
              Icon={ICON_MAP[backend.label]}
              tag={backend.tag}
              label={backend.label}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {backend.skills.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
            <div className="bento-orb -bottom-10 -right-10 bg-cyan/40" aria-hidden />
          </BentoTile>

          <BentoTile
            i={2}
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
            featured
          >
            <TileHead Icon={Brain} tag={ml.tag} label={ml.label} accent />
            <p className="mt-3 max-w-md text-sm text-muted">
              Research-first stack. From dataset curation through model training
              to LLM-in-the-loop reasoning and explainability.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ml.skills.map((s) => (
                <Pill key={s} highlight>
                  {s}
                </Pill>
              ))}
            </div>
            <div className="mt-5 hidden items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted sm:flex">
              {["data", "→", "train", "→", "eval", "→", "ship"].map((t, i) => (
                <span
                  key={i}
                  className={
                    t === "→"
                      ? "text-cyan"
                      : "rounded-full border border-white/10 bg-white/[0.02] px-2 py-1"
                  }
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              className="bento-orb -bottom-16 -right-10 bg-gradient-to-br from-violet to-cyan opacity-40"
              aria-hidden
            />
          </BentoTile>

          <BentoTile i={3}>
            <TileHead
              Icon={Wrench}
              tag={tooling.tag}
              label={tooling.label}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {tooling.skills.map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
            <div className="bento-orb -bottom-10 -left-10 bg-violet/30" aria-hidden />
          </BentoTile>

          <BentoTile i={4} className="lg:col-span-2">
            <TileHead Icon={Sparkles} tag="now" label="Currently exploring" />
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "Transformers from scratch",
                "Three.js shaders",
                "Rustlings",
                "WebGPU",
              ].map((s) => (
                <Pill key={s} highlight>
                  {s}
                </Pill>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-cyan">
              last updated · this week
            </p>
          </BentoTile>

          <BentoTile i={5}>
            <TileHead Icon={Boxes} tag="summary" label="At a glance" />
            <div className="mt-3 space-y-2">
              <StatRow k="projects shipped" v="6+" />
              <StatRow k="research modalities" v="4 fused" />
              <StatRow k="languages" v="EN · BN" />
            </div>
          </BentoTile>
        </div>
      </div>
    </section>
  );
}

function BentoTile({
  children,
  i,
  className = "",
  featured = false,
}: {
  children: React.ReactNode;
  i: number;
  className?: string;
  featured?: boolean;
}) {
  return (
    <motion.div
      custom={i}
      variants={bento}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={
        "bento-tile flex flex-col p-5 sm:p-6 " +
        (featured ? "bg-gradient-to-br from-violet/10 via-panel to-cyan/5" : "") +
        " " +
        className
      }
    >
      {children}
    </motion.div>
  );
}

function TileHead({
  Icon,
  label,
  tag,
  accent,
}: {
  Icon: React.ElementType;
  label: string;
  tag: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span
          className={
            "flex h-8 w-8 items-center justify-center rounded-lg border " +
            (accent
              ? "border-cyan/40 bg-cyan/10 text-cyan"
              : "border-white/10 bg-white/[0.03] text-ink")
          }
        >
          <Icon size={15} />
        </span>
        <h3 className="font-display text-base font-medium text-ink">{label}</h3>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {tag}
      </span>
    </div>
  );
}

function Pill({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <span
      className={
        "rounded-full px-3 py-1 text-sm transition-colors " +
        (highlight
          ? "border border-violet/40 bg-violet/10 text-ink"
          : "border border-line bg-panel-2/60 text-muted")
      }
    >
      {children}
    </span>
  );
}

function StatRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-1.5 last:border-0">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {k}
      </span>
      <span className="font-display text-sm text-ink">{v}</span>
    </div>
  );
}