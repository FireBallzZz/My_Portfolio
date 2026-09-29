"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** A short boot loader. Plays once on first visit (or whenever localStorage
 *  has no portfolio entry yet) so the visitor sees the brand before the
 *  page reveals. Skipped for reduced-motion and for repeat visitors. */
export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(true); // start as done to avoid hydration flash on repeat visits
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    try {
      if (window.localStorage.getItem("forhad-visited")) return;
    } catch {
      /* private mode — show loader */
    }
    queueMicrotask(() => setDone(false));

    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
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
          try {
            window.localStorage.setItem("forhad-visited", "1");
          } catch {
            /* ignore */
          }
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
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