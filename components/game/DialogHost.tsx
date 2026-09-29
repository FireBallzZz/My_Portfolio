"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGame } from "./store";

export default function DialogHost() {
  const dialog = useGame((s) => s.dialog);
  return (
    <AnimatePresence>
      {dialog && (
        <motion.div
          key="host"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-20 z-[135] flex justify-center px-4"
        >
          <div className="w-full max-w-2xl rounded-2xl border border-violet/40 bg-panel/95 p-4 shadow-2xl shadow-black/60 backdrop-blur-md">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
              {dialog.speaker}
            </div>
            <p className="mt-1 font-display text-base text-ink sm:text-lg">
              {dialog.text}
            </p>
            <div className="mt-2 text-right font-mono text-[10px] uppercase tracking-wider text-muted">
              press E / Space or Esc to close
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
