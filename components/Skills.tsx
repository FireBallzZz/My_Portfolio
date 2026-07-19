"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import SectionTag from "./SectionTag";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionTag index="02" stage="features" title="Skills" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6, rotate: -0.4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="glass group relative overflow-hidden rounded-3xl p-7"
            >
              {/* background pulse on hover */}
              <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-violet/0 via-violet/0 to-cyan/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-violet/25 group-hover:to-cyan/15 group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-medium text-ink">
                  {group.label}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {group.tag}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-line bg-panel-2/60 px-3.5 py-1.5 text-sm text-muted transition-all duration-300 group-hover:border-violet/40 group-hover:text-ink"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
