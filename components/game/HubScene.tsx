"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  GraduationCap,
  Atom,
  BookOpen,
  Briefcase,
  UserCircle2,
} from "lucide-react";
import WorldCanvas, { type Interactable, type Obstacle } from "./WorldCanvas";
import { gameStore } from "./store";
import { SceneShell } from "./SceneShell";

const WIDTH = 960;
const HEIGHT = 620;

type NPC = {
  id: string;
  label: string;
  /** Building rect. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Proximity hit zone. */
  hit: { x: number; y: number };
  accent: "violet" | "cyan" | "amber" | "emerald";
  icon: "uap" | "ml" | "library" | "eutropia" | "player";
  speaker: string;
  text: string;
};

const NPCS: NPC[] = [
  {
    id: "uap",
    label: "UAP Campus",
    x: 80,
    y: 40,
    w: 240,
    h: 160,
    hit: { x: 200, y: 280 },
    accent: "amber",
    icon: "uap",
    speaker: "University of Asia Pacific",
    text: "Where it all started. Late-night labs, early-morning bug hunts. The degree and the foundation for everything since.",
  },
  {
    id: "ml-lab",
    label: "ML Research Lab",
    x: 360,
    y: 40,
    w: 240,
    h: 160,
    hit: { x: 480, y: 280 },
    accent: "cyan",
    icon: "ml",
    speaker: "The ML Research Lab",
    text: "Multimodal attention analysis: ResNet50 + CBAM, six-DOF head pose, gaze, posture. Fused through an attention scorer. The AGG metric was born here.",
  },
  {
    id: "library",
    label: "Library",
    x: 640,
    y: 40,
    w: 240,
    h: 160,
    hit: { x: 760, y: 280 },
    accent: "violet",
    icon: "library",
    speaker: "The Library",
    text: "Where the full-stack self-taught journey began. React docs on one tab, Node API on the other. Stayed late more than once.",
  },
  {
    id: "eutropia",
    label: "Eutropia HQ",
    x: 80,
    y: 420,
    w: 240,
    h: 160,
    hit: { x: 200, y: 400 },
    accent: "cyan",
    icon: "eutropia",
    speaker: "Eutropia HQ",
    text: "Current internship. Backend Developer — production APIs, schema design, integration work, code review. Learning how professional teams ship every day.",
  },
  {
    id: "player-card",
    label: "Player Card",
    x: 640,
    y: 420,
    w: 240,
    h: 160,
    hit: { x: 760, y: 400 },
    accent: "violet",
    icon: "player",
    speaker: "Player Card",
    text: "Forhad Siddique Rajon · FSR. CSE undergrad @ UAP. Backend Dev Intern @ Eutropia. Builds ML pipelines, full-stack apps, and the occasional pixel city.",
  },
];

const INTERACTABLES: Interactable[] = NPCS.map((n) => ({
  id: n.id,
  x: n.hit.x,
  y: n.hit.y,
  r: 64,
  showHalo: false,
  label: n.label,
}));

const OBSTACLES: Obstacle[] = [
  { x: 80, y: 40, w: 240, h: 160 },
  { x: 360, y: 40, w: 240, h: 160 },
  { x: 640, y: 40, w: 240, h: 160 },
  { x: 80, y: 420, w: 240, h: 160 },
  { x: 640, y: 420, w: 240, h: 160 },
  { x: 360, y: 310, w: 240, h: 60 },
];

const ACCENT_CLASS: Record<
  NPC["accent"],
  { ring: string; glow: string; text: string; chip: string; dot: string }
> = {
  violet: {
    ring: "border-violet/60",
    glow: "shadow-[0_0_18px_rgba(124,92,255,0.45)]",
    text: "text-violet-soft",
    chip: "border-violet/40 bg-violet/15 text-violet-soft",
    dot: "bg-violet",
  },
  cyan: {
    ring: "border-cyan/60",
    glow: "shadow-[0_0_18px_rgba(34,211,238,0.45)]",
    text: "text-cyan",
    chip: "border-cyan/40 bg-cyan/15 text-cyan",
    dot: "bg-cyan",
  },
  amber: {
    ring: "border-amber-300/60",
    glow: "shadow-[0_0_18px_rgba(255,209,102,0.45)]",
    text: "text-amber-300",
    chip: "border-amber-300/40 bg-amber-300/15 text-amber-200",
    dot: "bg-amber-300",
  },
  emerald: {
    ring: "border-emerald-400/60",
    glow: "shadow-[0_0_18px_rgba(16,185,129,0.4)]",
    text: "text-emerald-300",
    chip: "border-emerald-400/40 bg-emerald-400/15 text-emerald-200",
    dot: "bg-emerald-400",
  },
};

const ICON_MAP: Record<
  NPC["icon"],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  uap: GraduationCap,
  ml: Atom,
  library: BookOpen,
  eutropia: Briefcase,
  player: UserCircle2,
};

export default function HubScene() {
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const nearest = useMemo(() => {
    if (!playerPos) return null;
    let best: NPC | null = null;
    let bestD = Infinity;
    for (const n of NPCS) {
      const d = Math.hypot(playerPos.x - n.hit.x, playerPos.y - n.hit.y);
      if (d <= 70 && d < bestD) {
        best = n;
        bestD = d;
      }
    }
    return best;
  }, [playerPos]);

  return (
    <SceneShell
      title="Neon Dhaka"
      subtitle="Walk to a building entrance. Press E or Space to talk."
      hint="WASD · click · E"
    >
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_280px]">
        <WorldCanvas
          width={WIDTH}
          height={HEIGHT}
          obstacles={OBSTACLES}
          interactables={INTERACTABLES}
          onMove={(p) => setPlayerPos(p)}
          onInteract={(id) => {
            const npc = NPCS.find((n) => n.id === id);
            if (npc)
              gameStore.set({
                dialog: { speaker: npc.speaker, text: npc.text },
              });
          }}
          background={<CityBg npcs={NPCS} nearestId={nearest?.id ?? null} />}
        />
        <SidePanel nearest={nearest} npcs={NPCS} />
      </div>
    </SceneShell>
  );
}

function SidePanel({ nearest, npcs }: { nearest: NPC | null; npcs: NPC[] }) {
  return (
    <aside className="flex flex-col gap-3 lg:sticky lg:top-24">
      <div className="rounded-2xl border border-line bg-panel/60 p-4">
        <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className={
                "absolute inline-flex h-full w-full rounded-full opacity-60 " +
                (nearest ? "animate-ping bg-cyan" : "bg-muted")
              }
            />
            <span
              className={
                "relative inline-flex h-1.5 w-1.5 rounded-full " +
                (nearest ? "bg-cyan" : "bg-muted")
              }
            />
          </span>
          nearby
        </div>
        {nearest ? (
          <div>
            <div className="font-display text-base text-ink">{nearest.label}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-cyan">
              press E / Space to talk
            </div>
          </div>
        ) : (
          <div className="font-mono text-[11px] text-muted">
            Walking… move closer to a building entrance.
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-panel/60 p-4">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          places
        </div>
        <ul className="space-y-1.5">
          {npcs.map((n) => {
            const Icon = ICON_MAP[n.icon];
            const accent = ACCENT_CLASS[n.accent];
            const active = nearest?.id === n.id;
            return (
              <li
                key={n.id}
                className={
                  "flex items-center gap-2 rounded-lg border px-2 py-1.5 transition-colors " +
                  (active ? accent.chip : "border-line bg-void/30")
                }
              >
                <span
                  className={
                    "flex h-6 w-6 items-center justify-center rounded border " +
                    (active ? accent.ring : "border-line")
                  }
                >
                  <Icon size={12} className={active ? accent.text : "text-muted"} />
                </span>
                <span
                  className={
                    "font-mono text-[11px] " + (active ? "text-ink" : "text-muted")
                  }
                >
                  {n.label}
                </span>
                {active && (
                  <span className={`ml-auto h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-2xl border border-line bg-panel/60 p-4 font-mono text-[10px] text-muted">
        <div className="mb-1.5 uppercase tracking-[0.2em]">controls</div>
        <ul className="ml-3 list-disc space-y-0.5">
          <li>WASD / arrows — move</li>
          <li>E / Space — talk</li>
          <li>Click anywhere — walk there</li>
        </ul>
      </div>
    </aside>
  );
}

function CityBg({
  npcs,
  nearestId,
}: {
  npcs: NPC[];
  nearestId: string | null;
}) {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0a0c14 0%, #14102a 40%, #1a1440 100%)",
        }}
      />
      <div className="absolute inset-0">
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 60}%`,
              width: 0.6 + ((i * 7) % 10) / 12,
              height: 0.6 + ((i * 7) % 10) / 12,
              opacity: 0.3 + ((i * 3) % 7) / 12,
            }}
          />
        ))}
      </div>
      <div className="absolute right-14 top-6 h-10 w-10 rounded-full bg-[#fff7d6] shadow-[0_0_50px_rgba(255,247,214,0.5)]" />
      <svg
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-[55%] h-[35%] w-full"
        aria-hidden
      >
        <polygon
          points="0,56 0,38 8,28 14,36 22,26 28,34 36,22 44,30 52,18 60,28 68,22 76,32 84,28 92,34 100,30 100,56"
          fill="#1a1740"
          opacity="0.7"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-[55%]">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #0d1f18 0%, #0a1410 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(124,92,255,0.1) 25%, rgba(124,92,255,0.1) 26%, transparent 27%, transparent 74%, rgba(124,92,255,0.1) 75%, rgba(124,92,255,0.1) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(124,92,255,0.1) 25%, rgba(124,92,255,0.1) 26%, transparent 27%, transparent 74%, rgba(124,92,255,0.1) 75%, rgba(124,92,255,0.1) 76%, transparent 77%)",
            backgroundSize: "32px 32px",
          }}
        />
        <Plaza />
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#ffcf6e] shadow-[0_0_8px_rgba(255,207,110,0.7)]"
            style={{
              left: `${6 + i * 10}%`,
              bottom: `${15 + (i % 2) * 6}%`,
            }}
          />
        ))}
      </div>
      {npcs.map((n) => (
        <BuildingSprite key={n.id} npc={n} active={n.id === nearestId} />
      ))}
    </div>
  );
}

function Plaza() {
  return (
    <div className="absolute left-1/2 top-1/2 h-32 w-60 -translate-x-1/2 -translate-y-1/2">
      <div className="absolute inset-0 rounded-2xl border border-cyan/30 bg-cyan/[0.04]" />
      <div className="absolute inset-2 rounded-xl border border-cyan/20" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.3em] text-cyan/60">
        central plaza
      </div>
      <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/40 bg-violet/10" />
    </div>
  );
}

function BuildingSprite({
  npc,
  active,
}: {
  npc: NPC;
  active: boolean;
}) {
  const accent = ACCENT_CLASS[npc.accent];
  const Icon = ICON_MAP[npc.icon];
  const sub =
    npc.icon === "uap"
      ? "campus"
      : npc.icon === "ml"
        ? "research"
        : npc.icon === "library"
          ? "self-taught"
          : npc.icon === "eutropia"
            ? "backend intern"
            : "profile";
  const tagNum =
    npc.icon === "uap"
      ? "01"
      : npc.icon === "ml"
        ? "02"
        : npc.icon === "library"
          ? "03"
          : npc.icon === "eutropia"
            ? "04"
            : "00";
  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: npc.x, top: npc.y, width: npc.w, height: npc.h }}
    >
      <span
        className={`absolute -inset-2 rounded-3xl ${accent.glow} ${
          active ? "opacity-100" : "opacity-70"
        } transition-opacity`}
        aria-hidden
      />
      <div
        className={`relative h-full w-full overflow-hidden rounded-xl border-2 ${accent.ring} bg-[#0d1326]`}
      >
        <div className="flex h-9 items-center justify-between border-b border-line bg-[#0a0c14] px-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            <Building2 size={11} />
            {tagNum}
          </div>
          <div
            className={
              "flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] " +
              (active ? accent.text : "text-muted")
            }
          >
            <span
              className={`h-2 w-2 rounded-full ${accent.dot} ${
                active ? "animate-pulse" : ""
              }`}
            />
            {active ? "in range" : "open"}
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-line/60 bg-[#0a0c14]/80 px-3 py-2">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-lg border ${accent.ring} bg-void`}
          >
            <Icon size={22} className={accent.text} />
          </span>
          <div className="min-w-0">
            <div className="truncate font-display text-[16px] font-medium leading-tight text-ink">
              {npc.label}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              {sub}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-1 px-3 py-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className={
                "h-4 w-full rounded-sm " +
                (i % 3 === 0
                  ? `${accent.dot} opacity-90`
                  : i % 5 === 0
                    ? "bg-white/20"
                    : "bg-white/8")
              }
            />
          ))}
        </div>

        <div
          className={
            "absolute inset-x-0 bottom-0 flex items-center justify-center border-t border-line/60 bg-[#0a0c14]/80 py-1 " +
            (active ? accent.text : "text-muted")
          }
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
            {active ? "● entrance — press E" : "○ entrance"}
          </span>
        </div>
      </div>
    </div>
  );
}
