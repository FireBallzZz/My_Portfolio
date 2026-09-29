"use client";

import { useEffect, useState } from "react";

/** Tracks which keys are currently held. Returns a stable `Set<string>`. */
export function useKeyboard(): Set<string> {
  const [pressed, setPressed] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      setPressed((prev) => {
        if (prev.has(e.key)) return prev;
        const next = new Set(prev);
        next.add(e.key);
        return next;
      });
    };
    const onUp = (e: KeyboardEvent) => {
      setPressed((prev) => {
        if (!prev.has(e.key)) return prev;
        const next = new Set(prev);
        next.delete(e.key);
        return next;
      });
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return pressed;
}

/** Fires once each time `key` goes from up → down. */
export function useKeyPress(key: string, fn: () => void) {
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === key) fn();
    };
    window.addEventListener("keydown", onDown);
    return () => window.removeEventListener("keydown", onDown);
  }, [key, fn]);
}