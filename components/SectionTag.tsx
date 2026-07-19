"use client";

import { motion } from "framer-motion";

type SectionTagProps = {
  index: string;
  stage: string;
  title: string;
};

/** Every section of this site is framed as a stage in an ML pipeline —
 *  input, features, inference, training log, output. The mono-tag encodes
 *  that structure instead of decorating it. */
export default function SectionTag({ index, stage, title }: SectionTagProps) {
  return (
    <div className="mb-5 flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-3 font-mono text-xs text-cyan"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse-soft" />
        <span>
          [ {index} · {stage.toUpperCase()} ]
        </span>
      </motion.div>
      <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
    </div>
  );
}
