"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Blocks scroll and paints a short "booting the pipeline" sequence before
 *  revealing the page. Skips itself entirely for reduced-motion users. */
export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const skip = setTimeout(() => setDone(true), 0);
      return () => clearTimeout(skip);
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1400;

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-void"
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="font-mono text-xs tracking-[0.3em] text-muted">
            INITIALIZING_PORTFOLIO.PY
          </div>
          <div className="relative h-px w-56 overflow-hidden bg-line sm:w-72">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet to-cyan"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="font-mono text-2xl font-medium text-ink">
            {String(progress).padStart(3, "0")}
            <span className="text-muted">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
