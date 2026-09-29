"use client";

import { motion } from "framer-motion";

export default function Avatar({
  size = 36,
  facing = "down",
  walking = false,
}: {
  size?: number;
  facing?: "down" | "up" | "left" | "right";
  walking?: boolean;
}) {
  const flipX = facing === "left";
  const flipY = facing === "up";

  return (
    <motion.div
      className="relative"
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
        transform: `${flipX ? "scaleX(-1)" : ""} ${flipY ? "scaleY(-1)" : ""}`,
      }}
      animate={walking ? { y: [0, -2, 0, -1, 0] } : { y: [0, -1, 0] }}
      transition={{
        duration: walking ? 0.35 : 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges">
        <ellipse cx="8" cy="15" rx="4" ry="0.6" fill="rgba(0,0,0,0.45)" />
        <rect x="5" y="6" width="6" height="6" fill="#7c5cff" />
        <rect x="3" y="7" width="2" height="4" fill="#7c5cff" />
        <rect x="11" y="7" width="2" height="4" fill="#7c5cff" />
        <rect x="6" y="11" width="1" height="3" fill="#1a1d2e" />
        <rect x="9" y="11" width="1" height="3" fill="#1a1d2e" />
        <rect x="5" y="2" width="6" height="5" fill="#f1c79e" />
        <rect x="5" y="1" width="6" height="2" fill="#1a1d2e" />
        <rect x="4" y="2" width="1" height="2" fill="#1a1d2e" />
        <rect x="11" y="2" width="1" height="2" fill="#1a1d2e" />
        <rect x="6" y="4" width="1" height="1" fill="#0a0c14" />
        <rect x="9" y="4" width="1" height="1" fill="#0a0c14" />
        <rect x="5" y="6" width="6" height="1" fill="#22d3ee" opacity="0.55" />
        <rect x="7" y="6.2" width="2" height="0.6" fill="#0a0c14" />
      </svg>
    </motion.div>
  );
}