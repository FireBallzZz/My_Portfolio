"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  words: string[];
  className?: string;
  /** ms per character while typing */
  typingSpeed?: number;
  /** ms per character while deleting */
  deletingSpeed?: number;
  /** ms the fully-typed word stays before deleting starts */
  holdMs?: number;
  /** ms of empty pause between words */
  pauseMs?: number;
};

type Phase = "typing" | "hold" | "deleting" | "pause";

export default function TypingText({
  words,
  className,
  typingSpeed = 65,
  deletingSpeed = 35,
  holdMs = 1400,
  pauseMs = 250,
}: TypingTextProps) {
  const wordCount = words.length;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  useEffect(() => {
    if (wordCount === 0) return;

    const current = words[index % wordCount] ?? "";

    if (phase === "typing") {
      if (text.length >= current.length) {
        // Done typing — switch to hold.
        const t = window.setTimeout(() => setPhase("hold"), holdMs);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typingSpeed
      );
      return () => window.clearTimeout(t);
    }

    if (phase === "hold") {
      const t = window.setTimeout(() => setPhase("deleting"), 0);
      return () => window.clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length <= 0) {
        const t = window.setTimeout(() => setPhase("pause"), 0);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deletingSpeed
      );
      return () => window.clearTimeout(t);
    }

    // pause
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % wordCount);
      setText("");
      setPhase("typing");
    }, pauseMs);
    return () => window.clearTimeout(t);
  }, [text, phase, index, words, wordCount, typingSpeed, deletingSpeed, holdMs, pauseMs]);

  if (wordCount === 0) return null;

  return (
    <span className={className} aria-live="polite">
      <span aria-hidden>{text || "\u00A0"}</span>
      <span
        className="ml-0.5 inline-block w-[0.55em] -translate-y-px animate-caret bg-cyan align-middle"
        style={{ height: "1em" }}
        aria-hidden
      />
    </span>
  );
}
