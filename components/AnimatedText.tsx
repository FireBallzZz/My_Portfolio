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

function AnimatedUnit({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block overflow-hidden align-bottom"
      aria-hidden="true"
    >
      <motion.span className="inline-block" variants={unit}>
        {children}
      </motion.span>
    </span>
  );
}

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
          <span
            key={`w-${wi}`}
            className="inline-block whitespace-nowrap"
          >
            {mode === "chars"
              ? Array.from(word).map((char, ci) => (
                  <AnimatedUnit key={ci}>{char}</AnimatedUnit>
                ))
              : (
                  <AnimatedUnit key="w">{word}</AnimatedUnit>
                )}
          </span>
        );
        return wi === words.length - 1 ? [wordEl] : [wordEl, " "];
      })}
    </Tag>
  );
}