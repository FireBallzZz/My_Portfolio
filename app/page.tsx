"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy-load the RPG game so it doesn't bloat the default landing bundle.
// ssr: false because the game uses localStorage and requestAnimationFrame.
const RpgLauncher = dynamic(
  () => import("@/components/game/RpgLauncher"),
  { ssr: false }
);

export default function Home() {
  const [rpgOpen, setRpgOpen] = useState(false);

  // Close on Esc — works for keyboard users, doesn't break mouse users.
  useEffect(() => {
    if (!rpgOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRpgOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [rpgOpen]);

  const openRpg = useCallback(() => setRpgOpen(true), []);
  const closeRpg = useCallback(() => setRpgOpen(false), []);

  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <Hero onEnterRpg={openRpg} />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />

      {/* RPG mode is opt-in and lives in its own layer. */}
      <AnimatePresence>
        {rpgOpen && (
          <motion.div
            key="rpg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[120] overflow-y-auto bg-void"
            role="dialog"
            aria-modal="true"
            aria-label="RPG mode — interactive portfolio"
          >
            <RpgLauncher onExit={closeRpg} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}