"use client";

import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. Built from scratch, shipped
          with care.
        </p>
        <MagneticButton
          variant="ghost"
          className="px-4 py-2 text-xs"
          cursorText="up"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={14} />
          Back to top
        </MagneticButton>
      </div>
    </footer>
  );
}
