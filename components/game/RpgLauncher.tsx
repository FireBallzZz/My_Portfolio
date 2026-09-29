"use client";

/** RPG mode — opt-in. Click-only + keyboard (WASD/arrows + E/Space).
 *  Currently just hosts Neon Dhaka: a walkable top-down city where the
 *  player visits buildings to hear about Forhad's story. */

import { useEffect } from "react";
import { Heart, Star, MapPin, X } from "lucide-react";
import { gameStore, useGame } from "./store";
import HubScene from "./HubScene";
import DialogHost from "./DialogHost";
import { useKeyPress } from "./useKeyboard";

export default function RpgLauncher({ onExit }: { onExit: () => void }) {
  const dialog = useGame((s) => s.dialog);

  // Esc closes the dialog if one is open; otherwise exits RPG mode.
  useKeyPress("Escape", () => {
    if (dialog) gameStore.set({ dialog: null });
    else onExit();
  });

  // First-visit welcome.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("rpg-neon-welcomed")) return;
      window.sessionStorage.setItem("rpg-neon-welcomed", "1");
      gameStore.set({
        dialog: {
          speaker: "Forhad (you)",
          text:
            "Welcome to Neon Dhaka. Walk with WASD or arrow keys. Click anywhere to walk there. Press E or Space when you reach a building entrance.",
        },
      });
    } catch {
      /* private mode */
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-void">
      <TopBar onExit={onExit} />
      <div className="pt-20">
        <HubScene />
      </div>
      <DialogHost />
    </div>
  );
}

function TopBar({ onExit }: { onExit: () => void }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[130] flex items-center justify-between gap-2 border-b border-line bg-void/85 px-3 py-3 backdrop-blur-md sm:px-5">
      <button
        onClick={onExit}
        className="group flex items-center gap-2 rounded-md border border-line bg-panel-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink transition-colors hover:border-violet/40 hover:bg-violet/10"
        aria-label="Exit RPG mode"
      >
        <X size={12} className="text-muted group-hover:text-ink" />
        <span className="hidden sm:inline">Exit Game</span>
      </button>

      <div className="flex items-center gap-1.5">
        <Stat icon={<MapPin size={11} className="text-violet-soft" />} label="zone" value="Neon Dhaka" />
        <Stat icon={<Star size={11} className="text-cyan" />} label="story" value="01" />
        <Stat icon={<Heart size={11} className="text-[#ff5577]" />} label="hp" value="100" />
      </div>

      <span className="hidden rounded-md border border-line bg-panel-2 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted lg:inline-flex">
        WASD · E · Esc
      </span>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-line bg-panel-2 px-2 py-1 font-mono text-[10px] text-muted">
      {icon}
      <span className="hidden sm:inline">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}
