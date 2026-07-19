"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "@/lib/hooks";
import clsx from "clsx";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "light" | "dark" | "outline" | "ghost";
  className?: string;
  cursorText?: string;
  as?: "a" | "button";
  download?: boolean;
};

/** A button/link that leans toward the cursor and springs back on release.
 *  Strength is intentionally subtle — this should read as premium, not gimmicky. */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "light",
  className,
  cursorText,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const isTouch = useIsTouchDevice();
  const rectRef = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  // Measure once on enter (not on every pixel of movement — repeated
  // getBoundingClientRect() calls force a synchronous layout reflow and
  // were a source of visible input lag near buttons).
  const handleMouseEnter = () => {
    if (isTouch || !ref.current) return;
    rectRef.current = ref.current.getBoundingClientRect();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !rectRef.current) return;
    const rect = rectRef.current;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const styles = clsx(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
    // Light: bright white fill, near-black text — the loud, primary CTA.
    variant === "light" && "bg-white text-void hover:bg-ink",
    // Dark: solid dark fill, light text — a filled secondary CTA that's
    // still confident (unlike the transparent outline), for pairing next
    // to a "light" button so the two read as a deliberate set.
    variant === "dark" &&
      "border border-white/10 bg-panel-2 text-ink hover:border-violet/40 hover:bg-panel-2/80",
    variant === "outline" &&
      "border border-line text-ink hover:border-violet/60 hover:bg-violet/5",
    variant === "ghost" && "text-muted hover:text-ink",
    className
  );

  const Comp = href ? motion.a : motion.button;

  return (
    <motion.span
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Comp
        ref={ref as never}
        href={href}
        onClick={onClick}
        download={download}
        data-cursor-text={cursorText}
        whileTap={{ scale: 0.94 }}
        className={styles}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
      >
        {children}
      </Comp>
    </motion.span>
  );
}
