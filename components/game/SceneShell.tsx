"use client";

import { type ReactNode } from "react";
import { SceneHeader } from "./SceneHeader";

export function SceneShell({
  title,
  subtitle,
  hint,
  children,
}: {
  title: string;
  subtitle?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-3 pb-32 pt-4 sm:px-6 sm:pb-36 sm:pt-6 lg:px-8 lg:pb-40">
      <SceneHeader title={title} subtitle={subtitle} hint={hint} />
      {children}
    </div>
  );
}