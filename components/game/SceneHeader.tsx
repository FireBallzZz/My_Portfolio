"use client";

import { type ReactNode } from "react";

export function SceneHeader({
  title,
  subtitle,
  hint,
  right,
}: {
  title: string;
  subtitle?: string;
  hint?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 px-1">
      <div className="min-w-0">
        <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 font-mono text-[11px] text-muted sm:text-xs">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {hint && (
          <span className="hidden rounded-full border border-line bg-panel-2 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted md:inline-flex">
            {hint}
          </span>
        )}
        {right}
      </div>
    </div>
  );
}
