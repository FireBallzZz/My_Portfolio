"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useActiveSection } from "@/lib/hooks";
import { profile } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(links.map((l) => l.id));

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:pt-6">
        <motion.nav
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.5 }}
          className="glass flex w-full max-w-3xl items-center justify-between rounded-full px-5 py-2.5 sm:px-6"
        >
          <button
            onClick={() => scrollTo("hero")}
            data-cursor-text="top"
            className="font-mono text-sm font-medium text-ink"
          >
            {profile.initials}
            <span className="text-cyan">.</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  data-cursor-text="go"
                  className={clsx(
                    "group relative rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors",
                    active === link.id ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {link.label}
                  <span
                    className={clsx(
                      "absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-violet to-cyan transition-transform duration-300 group-hover:scale-x-100",
                      active === link.id && "scale-x-100"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton
              variant="dark"
              className="px-4 py-2 text-xs"
              onClick={() => scrollTo("contact")}
              cursorText="hello"
            >
              Let&rsquo;s talk
            </MagneticButton>
          </div>

          <button
            className="rounded-full p-2 text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass fixed inset-x-4 top-20 z-40 flex flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={clsx(
                  "rounded-xl px-4 py-3 text-left font-mono text-sm uppercase tracking-wider transition-colors",
                  active === link.id
                    ? "bg-white/5 text-ink"
                    : "text-muted hover:text-ink"
                )}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
