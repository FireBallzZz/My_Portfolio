"use client";

import { useEffect, useRef } from "react";

/** Custom cursor — a small dot that follows the mouse with a springy
 *  trailing ring. Hidden on touch devices and for reduced-motion users.
 *
 *  No `mix-blend-mode` here so the cursor stays visible on the dark
 *  background regardless of what sits underneath it. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reduceMotion) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const applyTransform = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        rx += (mx - rx) * 0.22;
        ry += (my - ry) * 0.22;
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${rx}px, ${
          ry + 30
        }px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(applyTransform);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const setLabel = (text: string) => {
      if (labelRef.current) labelRef.current.textContent = text;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !ringRef.current) return;
      const el = target.closest<HTMLElement>(
        "[data-cursor-text], a, button, [role='button'], input, textarea, label"
      );
      if (!el) {
        ringRef.current.classList.remove("cursor-active");
        labelRef.current?.classList.remove("cursor-active");
        return;
      }
      const label = el.getAttribute("data-cursor-text") ?? "";
      if (label) {
        setLabel(label);
        labelRef.current?.classList.add("cursor-active");
      } else {
        labelRef.current?.classList.remove("cursor-active");
      }
      ringRef.current.classList.add("cursor-active");
    };

    const onOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (
        related &&
        related.closest(
          "[data-cursor-text], a, button, [role='button'], input, textarea, label"
        )
      )
        return;
      ringRef.current?.classList.remove("cursor-active");
      labelRef.current?.classList.remove("cursor-active");
    };

    const onDown = () => ringRef.current?.classList.add("cursor-active");
    const onUp = () => {
      // Re-evaluate after click — if still over a clickable, ring stays
      // active; if not, ring removes its active class.
      const el = document.elementFromPoint(mx, my);
      const overClickable = !!el?.closest(
        "a, button, [role='button'], input, textarea, label"
      );
      if (!overClickable) ringRef.current?.classList.remove("cursor-active");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(applyTransform);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
