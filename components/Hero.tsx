"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowDown,
  Download,
  FolderGit2,
  Mail,
  Sparkles,
  Play,
} from "lucide-react";
import { profile, socials } from "@/lib/data";
import { useIsTouchDevice, useMousePosition } from "@/lib/hooks";
import AnimatedText from "./AnimatedText";
import TypingText from "./TypingText";
import MagneticButton from "./MagneticButton";
import ParticleField from "./ParticleField";
import PortraitArt from "./PortraitArt";

function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const [imgOk, setImgOk] = useState(false);

  // Probe whether the configured avatar URL actually resolves.
  useEffect(() => {
    if (!profile.avatar) return;
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) setImgOk(true);
    };
    img.onerror = () => {
      if (!cancelled) setImgOk(false);
    };
    img.src = profile.avatar;
    return () => {
      cancelled = true;
    };
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 14);
    rotateX.set(py * -14);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="relative mx-auto w-64 sm:w-80 lg:w-[22rem]"
      style={{ perspective: 1000 }}
    >
      <div
        className="pointer-events-none absolute -inset-24 -z-10 opacity-60"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(124,92,255,0.18) 40deg, transparent 90deg, transparent 220deg, rgba(34,211,238,0.14) 270deg, transparent 320deg)",
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        className="animate-float"
      >
        <div className="gradient-border relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(124,92,255,0.35)]">
          <div className="gradient-border-inner relative h-full w-full overflow-hidden rounded-[calc(2rem-1px)] bg-panel">
            {imgOk ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 256px, 352px"
                className="object-cover"
                priority
              />
            ) : (
              <PortraitArt initials={profile.initials} />
            )}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.06) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="glass mx-auto mt-5 flex w-fit items-center gap-2 rounded-full px-3.5 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-soft" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          available ·{" "}
          <span className="text-ink">{profile.location}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

function MouseSpotlight() {
  const { x, y } = useMousePosition();
  const isTouch = useIsTouchDevice();
  if (isTouch) return null;
  return (
    <div
      className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full"
      style={{
        left: x - 144,
        top: y - 144,
        background:
          "radial-gradient(circle, rgba(124,92,255,0.10) 0%, rgba(34,211,238,0.06) 35%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}

type HeroProps = {
  /** Called when the visitor wants to enter RPG mode. */
  onEnterRpg?: () => void;
};

export default function Hero({ onEnterRpg }: HeroProps) {
  return (
    <section
      id="hero"
      className="bg-aurora relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-16 sm:px-10 sm:pt-32 sm:pb-20 lg:px-16"
    >
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <ParticleField />
      <MouseSpotlight />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs text-cyan"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
            <span className="rounded-full border border-cyan/30 bg-cyan/5 px-2.5 py-0.5">
              {profile.university}
            </span>
          </motion.div>

          <AnimatedText
            text={profile.name}
            mode="chars"
            delay={0.2}
            as="h1"
            className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-[4.2rem]"
          />

          <div className="mt-4 min-h-[2.25rem] font-mono text-lg leading-tight text-violet-soft sm:min-h-[2.5rem] sm:text-xl md:min-h-[3rem] md:text-2xl">
            <TypingText words={profile.roles} />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* Primary CTA group */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href={profile.resumeUrl}
              download
              variant="light"
              cursorText="get"
            >
              <Download size={16} />
              Download CV
            </MagneticButton>
            <MagneticButton
              variant="dark"
              cursorText="see"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FolderGit2 size={16} />
              View Projects
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              cursorText="hi"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Mail size={16} />
              Contact Me
            </MagneticButton>
          </motion.div>

          {/* RPG opt-in */}
          {onEnterRpg && (
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              onClick={onEnterRpg}
              className="group mt-6 inline-flex items-center gap-3 rounded-full border border-violet/40 bg-gradient-to-r from-violet/15 to-cyan/15 px-4 py-2 text-sm transition-all hover:from-violet/25 hover:to-cyan/25"
              aria-label="Enter RPG mode"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet/30 transition-transform group-hover:scale-110">
                <Play size={12} className="translate-x-[1px] text-violet-soft" />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                  feeling playful?
                </span>
                <span className="font-display text-sm text-ink">
                  Enter Forhad&rsquo;s World
                </span>
              </span>
              <Sparkles
                size={14}
                className="text-violet-soft opacity-70 transition-opacity group-hover:opacity-100"
              />
            </motion.button>
          )}

          {/* Inline socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-6 flex items-center gap-4 border-t border-line pt-5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              find me on
            </span>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-violet/40 hover:bg-violet/10 hover:text-ink"
                >
                  <span className="font-mono text-xs font-medium">
                    {s.label[0]}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <Portrait />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-muted"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
