"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import SectionTag from "./SectionTag";
import ProjectCard from "./ProjectCard";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "fullstack", label: "Full-stack" },
  { id: "ml", label: "ML / Research" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function matchesFilter(p: (typeof projects)[number], filter: FilterId) {
  if (filter === "all") return true;
  if (filter === "featured") return p.featured;
  if (filter === "fullstack")
    return p.category.toLowerCase().includes("full-stack");
  if (filter === "ml")
    return (
      p.category.toLowerCase().includes("machine learning") || p.featured
    );
  return true;
}

export default function Projects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const filtered = projects.filter((p) => matchesFilter(p, filter));

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative px-5 py-20 sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTag index="03" stage="inference" title="Selected Work" />
          <div
            className="flex flex-wrap items-center gap-1.5 self-start rounded-full border border-line bg-panel/50 p-1 backdrop-blur-md sm:self-end"
            role="tablist"
            aria-label="Filter projects"
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={
                  "relative rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors " +
                  (filter === f.id
                    ? "text-ink"
                    : "text-muted hover:text-ink")
                }
              >
                {filter === f.id && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-violet/20 ring-1 ring-violet/40"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center font-mono text-sm text-muted">
            nothing here in this filter — try another.
          </p>
        )}
      </div>
    </section>
  );
}