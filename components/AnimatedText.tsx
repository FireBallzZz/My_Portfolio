"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type AnimatedTextProps = {
  text: string;
  className?: string;
  /** "chars" for headline-scale reveals, "words" for longer copy */
  mode?: "chars" | "words";
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

const container = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const unit = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** One reveal unit: masked by an overflow-hidden wrapper so the slide-up
 *  doesn't clip visibly outside its own box. */
function AnimatedUnit({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block overflow-hidden align-bottom" aria-hidden="true">
      <motion.span className="inline-block" variants={unit}>
        {children}
      </motion.span>
    </span>
  );
}

/** Splits text into chars or words and reveals them with a staggered
 *  slide-up-and-fade.
 *
 *  Each word is grouped in its own `whitespace-nowrap` span, with a real,
 *  breakable space rendered as a separate sibling between word groups. That
 *  matters: earlier this rendered every character as its own independent
 *  inline-block box with nothing but adjacent boxes between them, and
 *  browsers are free to insert a line break between any two atomic
 *  inline-block boxes — which showed up as words splitting mid-word
 *  ("Rajon" wrapping as "Rajo" / "n"). Grouping by word fixes that while
 *  keeping the per-character stagger animation inside each word. */
export default function AnimatedText({
  text,
  className,
  mode = "chars",
  delay = 0,
  as = "span",
}: AnimatedTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];
  const stagger = mode === "chars" ? 0.022 : 0.06;

  return (
    <Tag
      className={clsx("inline-block", className)}
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={text}
    >
      {words.flatMap((word, wi) => {
        const wordEl = (
          <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
            {mode === "chars"
              ? Array.from(word).map((char, ci) => (
                  <AnimatedUnit key={ci}>{char}</AnimatedUnit>
                ))
              : (
                  <AnimatedUnit key="w">{word}</AnimatedUnit>
                )}
          </span>
        );
        // A plain space as its own sibling — the only place a line break
        // is allowed to happen.
        return wi === words.length - 1 ? [wordEl] : [wordEl, " "];
      })}
    </Tag>
  );
}
