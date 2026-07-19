"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { useIsTouchDevice } from "@/lib/hooks";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 22 });

  const handleMove = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200 }}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
        data-cursor-text="explore"
        className="gradient-border group relative overflow-hidden rounded-3xl bg-panel"
      >
        <div className="gradient-border-inner relative rounded-[calc(1.5rem-1px)] p-8 sm:p-10">
          {/* ambient glow on hover */}
          <div className="pointer-events-none absolute -inset-1 -z-10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(124,92,255,0.25),transparent_60%)]" />

          <div className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs text-cyan">{project.index}</span>
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">
              {project.category}
            </span>
          </div>

          <h3 className="mt-6 font-display text-2xl font-medium text-ink sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 font-mono text-sm text-violet-soft">{project.tagline}</p>

          <motion.p
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "auto" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base"
          >
            {project.description}
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ y: -2, scale: 1.05 }}
                className="rounded-full bg-panel-2 px-3 py-1 text-xs text-muted ring-1 ring-line transition-colors group-hover:text-ink"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-6">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                data-cursor-text="open"
                className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-cyan"
              >
                {link.label}
                <ArrowUpRight size={13} />
              </a>
            ))}
            <span className="ml-auto font-mono text-xs text-muted">{project.year}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
