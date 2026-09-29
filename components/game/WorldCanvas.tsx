"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Avatar from "./Avatar";
import { useKeyboard, useKeyPress } from "./useKeyboard";

export type Obstacle = { x: number; y: number; w: number; h: number };

export type Interactable = {
  id: string;
  x: number;
  y: number;
  label?: string;
  /** Interaction radius in px from center. */
  r?: number;
  /** When false, the proximity halo & label are not rendered
   *  (useful when the scene draws a custom building sprite instead). */
  showHalo?: boolean;
};

type Vec = { x: number; y: number };
type Facing = "down" | "up" | "left" | "right";

const SPEED = 4;

export type WorldCanvasProps = {
  width: number;
  height: number;
  obstacles?: Obstacle[];
  interactables?: Interactable[];
  onInteract?: (id: string) => void;
  onMove?: (pos: Vec, facing: Facing) => void;
  background: ReactNode;
  npcs?: { id: string; x: number; y: number; sprite?: ReactNode; label?: string }[];
};

export default function WorldCanvas({
  width,
  height,
  obstacles = [],
  interactables = [],
  onInteract,
  onMove,
  background,
  npcs = [],
}: WorldCanvasProps) {
  const playerRef = useRef<Vec>({ x: width / 2, y: height - 100 });
  const targetRef = useRef<Vec | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const [rendered, setRendered] = useState<Vec>(() => ({
    x: width / 2,
    y: height - 80,
  }));
  const [facing, setFacing] = useState<Facing>("down");
  const [walking, setWalking] = useState(false);
  // Mirrors `interactables` so the renderer can compute "in-range" cheaply
  // without comparing positions on every render.
  const interactablesRef = useRef<Interactable[]>(interactables);
  const obstaclesRef = useRef<Obstacle[]>(obstacles);
  const onInteractRef = useRef(onInteract);
  const onMoveRef = useRef(onMove);
  const widthRef = useRef(width);
  const heightRef = useRef(height);

  // Keep refs synced in an effect (not during render).
  useEffect(() => {
    interactablesRef.current = interactables;
    obstaclesRef.current = obstacles;
    onInteractRef.current = onInteract;
    onMoveRef.current = onMove;
    widthRef.current = width;
    heightRef.current = height;
  });

  // Measure the visible stage and compute scale factor so the canvas always
  // fits while keeping internal coordinates untouched.
  useLayoutEffect(() => {
    if (!stageRef.current) return;
    const stage = stageRef.current;
    const update = () => {
      const rect = stage.getBoundingClientRect();
      const sx = rect.width / width;
      const sy = rect.height / height;
      const s = Math.min(sx, sy);
      setScale(s > 0 ? s : 1);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [width, height]);

  const pressed = useKeyboard();

  const tryInteract = useCallback(() => {
    const p = playerRef.current;
    const list = interactablesRef.current;
    let best: Interactable | null = null;
    let bestD = Infinity;
    for (const it of list) {
      const dx = p.x - it.x;
      const dy = p.y - it.y;
      const r = it.r ?? 48;
      const d = Math.hypot(dx, dy);
      if (d <= r && d < bestD) {
        best = it;
        bestD = d;
      }
    }
    if (best && onInteractRef.current) onInteractRef.current(best.id);
  }, []);

  useKeyPress("e", tryInteract);
  useKeyPress(" ", tryInteract);
  useKeyPress("Enter", tryInteract);

  // Animation loop. Runs once; reads from refs that are kept in sync.
  useEffect(() => {
    let raf = 0;
    let curFacing: Facing = "down";
    let curWalking = false;
    const tick = () => {
      const p = playerRef.current;
      const target = targetRef.current;
      let dx = 0;
      let dy = 0;
      let isMoving = false;
      let newFacing: Facing = curFacing;

      const left = pressed.has("ArrowLeft") || pressed.has("a");
      const right = pressed.has("ArrowRight") || pressed.has("d");
      const up = pressed.has("ArrowUp") || pressed.has("w");
      const down = pressed.has("ArrowDown") || pressed.has("s");

      if (left) dx -= 1;
      if (right) dx += 1;
      if (up) dy -= 1;
      if (down) dy += 1;

      if (dx !== 0 || dy !== 0) {
        const len = Math.hypot(dx, dy);
        dx /= len;
        dy /= len;
        newFacing =
          Math.abs(dx) > Math.abs(dy)
            ? dx > 0
              ? "right"
              : "left"
            : dy > 0
              ? "down"
              : "up";
        isMoving = true;
      } else if (target) {
        const tx = target.x - p.x;
        const ty = target.y - p.y;
        const td = Math.hypot(tx, ty);
        if (td < 4) {
          targetRef.current = null;
        } else {
          dx = tx / td;
          dy = ty / td;
          newFacing =
            Math.abs(dx) > Math.abs(dy)
              ? dx > 0
                ? "right"
                : "left"
              : dy > 0
                ? "down"
                : "up";
          isMoving = true;
        }
      }

      if (isMoving) {
        const stepX = dx * SPEED;
        const stepY = dy * SPEED;
        const w = widthRef.current;
        const h = heightRef.current;
        const newX = clamp(p.x + stepX, 0, w);
        const newY = clamp(p.y + stepY, 0, h);
        if (!collides(newX, p.y, obstaclesRef.current)) p.x = newX;
        if (!collides(p.x, newY, obstaclesRef.current)) p.y = newY;
      }

      if (curFacing !== newFacing) {
        curFacing = newFacing;
        setFacing(newFacing);
      }
      if (curWalking !== isMoving) {
        curWalking = isMoving;
        setWalking(isMoving);
      }
      setRendered({ x: p.x, y: p.y });
      onMoveRef.current?.({ x: p.x, y: p.y }, newFacing);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pressed]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const y = ((e.clientY - rect.top) / rect.height) * height;
    targetRef.current = { x, y };
  };

  // Read current player position for proximity labels.
  const px = rendered.x;
  const py = rendered.y;

  return (
    <div
      className="relative mx-auto w-full"
      style={{
        // Reserve aspect-ratio space; visible canvas is laid out inside.
        maxWidth: width,
      }}
    >
      {/* Stage container keeps the canvas at its natural aspect ratio.
          On narrow screens we use CSS transform to scale the canvas so all
          buildings stay fully visible (no clipping). */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${width} / ${height}`,
          maxHeight: "min(80vh, 760px)",
          marginInline: "auto",
          overflow: "hidden",
          borderRadius: 16,
          border: "1px solid rgba(124,92,255,0.3)",
          background: "#0a0c14",
        }}
        onClick={handleClick}
      >
        {/* Inner world at natural size, scaled to fit the visible stage. */}
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: width,
            height: height,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <div className="absolute inset-0">{background}</div>

      {interactables.map((it) => {
        const inRange = Math.hypot(px - it.x, py - it.y) <= (it.r ?? 48);
        if (it.showHalo === false && !inRange) return null;
        return (
          <div
            key={it.id}
            className="absolute"
            style={{
              left: it.x - 14,
              top: it.y - 14,
              width: 28,
              height: 28,
            }}
          >
            {inRange && it.label && (
              <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-7 whitespace-nowrap rounded-md border border-cyan/40 bg-void/90 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-cyan">
                {it.label}
              </div>
            )}
            <span
              className={
                "absolute inset-0 rounded-full transition-colors " +
                (inRange ? "bg-cyan/45" : "bg-violet/15")
              }
            />
            <span
              className={
                "absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full " +
                (inRange ? "bg-cyan" : "bg-violet/60")
              }
            />
          </div>
        );
      })}

      {npcs.map((npc) => (
        <div
          key={npc.id}
          className="absolute"
          style={{
            left: npc.x - 16,
            top: npc.y - 24,
            width: 32,
            height: 32,
          }}
        >
          {npc.sprite ?? (
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-panel-2 text-center font-mono text-[10px] text-muted">
              ?
            </div>
          )}
        </div>
      ))}

      <div
        className="absolute"
        style={{
          left: px - 22,
          top: py - 32,
          width: 44,
          height: 44,
        }}
      >
        <Avatar size={44} facing={facing} walking={walking} />
        <span
          className="absolute -bottom-1 left-1/2 h-1 w-9 -translate-x-1/2 rounded-full bg-black/50"
          aria-hidden
        />
      </div>
        </div>
      </div>
    </div>
  );
}



function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function collides(x: number, y: number, obstacles: Obstacle[]) {
  const playerR = 16;
  for (const o of obstacles) {
    const cx = Math.max(o.x, Math.min(x, o.x + o.w));
    const cy = Math.max(o.y, Math.min(y, o.y + o.h));
    if (Math.hypot(x - cx, y - cy) < playerR) return true;
  }
  return false;
}
