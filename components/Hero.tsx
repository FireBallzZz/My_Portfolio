"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download, FolderGit2, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { useIsTouchDevice } from "@/lib/hooks";
import AnimatedText from "./AnimatedText";
import TypingText from "./TypingText";
import MagneticButton from "./MagneticButton";
import ParticleField from "./ParticleField";

function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const [imgError, setImgError] = useState(false);

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
      {/* light rays */}
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
        data-cursor-text="view"
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        className="animate-float"
      >
        <div className="gradient-border relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_rgba(124,92,255,0.35)]">
          <div className="gradient-border-inner relative h-full w-full overflow-hidden rounded-[calc(2rem-1px)] bg-panel">
            {!imgError ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 256px, 352px"
                className="object-cover"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-panel-2 to-panel">
                <span className="font-display text-6xl font-medium text-line">
                  {profile.initials}
                </span>
              </div>
            )}
            {/* glass reflection sweep */}
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

      {/* status chip — nods to the thesis' live "attention" scoring. Sits
          below the frame in normal flow (not overlapping the photo) so it
          never lands on top of a face, whatever the crop of the portrait. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="glass mx-auto mt-5 flex w-fit items-center gap-2 rounded-full px-3.5 py-2"
      >
        <span className="h-2 w-2 rounded-full bg-cyan animate-pulse-soft" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          attention: <span className="text-ink">locked</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="bg-aurora relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-32 pb-20 sm:px-10 lg:px-16"
    >
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <ParticleField />

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs text-cyan"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
            [ 00 · INPUT ]
            <span className="text-muted">available for opportunities</span>
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
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
        </div>

        <Portrait />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
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
