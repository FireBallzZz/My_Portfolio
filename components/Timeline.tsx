"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { timeline } from "@/lib/data";
import SectionTag from "./SectionTag";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });

  return (
    <section id="timeline" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <SectionTag index="04" stage="training_log" title="Timeline" />

        <div ref={containerRef} className="relative mt-16 pl-8 sm:pl-10">
          {/* track */}
          <div className="absolute left-[3px] top-0 h-full w-px bg-line sm:left-[7px]" />
          {/* progress line */}
          <motion.div
            className="absolute left-[3px] top-0 w-px origin-top bg-gradient-to-b from-violet to-cyan sm:left-[7px]"
            style={{ scaleY: scrollYProgress, height: "100%" }}
          />

          <div className="flex flex-col gap-14">
            {timeline.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className="relative"
              >
                <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_0_4px_rgba(34,211,238,0.15)] sm:-left-10" />
                <div className="font-mono text-xs uppercase tracking-wider text-cyan">
                  {entry.period}
                </div>
                <h3 className="mt-1.5 font-display text-xl font-medium text-ink sm:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {entry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
