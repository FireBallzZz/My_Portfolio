"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypingTextProps = {
  words: string[];
  className?: string;
};

/** Classic type-then-delete cycler. With reduced motion it just shows the
 *  first word statically instead of animating character-by-character. */
export default function TypingText({ words, className }: TypingTextProps) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      const skip = setTimeout(() => setDisplay(words[0]), 0);
      return () => clearTimeout(skip);
    }

    const current = words[wordIndex % words.length];
    const typingSpeed = deleting ? 35 : 65;
    const atFullWord = !deleting && display === current;
    const atEmpty = deleting && display === "";

    let delay = typingSpeed;
    if (atFullWord) delay = 1400;
    if (atEmpty) delay = 300;

    const timeout = setTimeout(() => {
      if (atFullWord) {
        setDeleting(true);
        return;
      }
      if (atEmpty) {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
        return;
      }
      const next = deleting
        ? current.slice(0, display.length - 1)
        : current.slice(0, display.length + 1);
      setDisplay(next);
    }, delay);

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIndex, words, reduceMotion]);

  return (
    <span className={className}>
      {display}
      <span className="animate-caret text-cyan">|</span>
    </span>
  );
}
