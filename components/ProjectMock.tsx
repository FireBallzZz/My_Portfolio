"use client";

/** Tiny CSS-only UI renders for each project card. */

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="project-mock">{children}</div>;
}

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <Frame>
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          <div className="ml-3 h-3 flex-1 rounded-sm bg-white/5" />
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </Frame>
  );
}

export function MockAttention() {
  return (
    <Chrome>
      <div className="flex h-full">
        <div className="hidden w-1/4 border-r border-white/10 bg-white/[0.02] p-3 sm:block">
          <div className="mb-3 h-2 w-3/4 rounded bg-white/10" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded bg-white/5"
                style={{ width: `${60 + (i % 3) * 12}%` }}
              />
            ))}
          </div>
        </div>
        <div className="relative flex-1 bg-gradient-to-br from-[#0d0f1a] to-[#0a0c14] p-3">
          <div className="absolute right-3 top-3 h-16 w-24 rounded border border-cyan/40 bg-black/60 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
            <div className="absolute left-1/2 top-2 h-1 w-4 -translate-x-1/2 rounded-full bg-cyan/80" />
            <div className="absolute left-1/2 top-4 h-2 w-3 -translate-x-1/2 rounded-full bg-cyan/80" />
            <div className="absolute left-1/2 top-7 h-6 w-px -translate-x-1/2 bg-cyan/60" />
            <div className="absolute left-1/2 top-12 h-3 w-px -translate-x-1/2 bg-cyan/60" />
          </div>
          <div className="absolute left-1/2 top-1/3 h-14 w-12 -translate-x-1/2 rounded border border-violet/70 shadow-[0_0_30px_rgba(124,92,255,0.35)]" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
              attention
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
                style={{ width: "78%" }}
              />
            </div>
            <span className="font-mono text-[9px] text-cyan">0.78</span>
          </div>
          <div className="absolute right-3 bottom-10 flex gap-1">
            {["face", "pose", "gaze", "posture"].map((m, i) => (
              <span
                key={m}
                className="rounded-sm border border-white/10 bg-black/40 px-1 py-0.5 font-mono text-[7px] uppercase tracking-wider text-muted"
                style={{
                  color:
                    i === 0 || i === 2 ? "rgb(34 211 238)" : "rgb(124 92 255)",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

export function MockVoice() {
  return (
    <Chrome>
      <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-[#0c0f1d] to-[#08091a] p-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet to-cyan">
          <span className="font-display text-base font-medium text-white">
            FS
          </span>
          <div className="absolute inset-0 animate-pulse-soft rounded-full ring-2 ring-violet/40" />
        </div>
        <div className="mt-5 flex h-10 items-end gap-1">
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-sm bg-gradient-to-t from-violet to-cyan"
              style={{
                height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex w-full max-w-xs items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="font-mono text-[8px] uppercase tracking-wider text-muted">
            rtt · 38ms
          </span>
          <span className="font-mono text-[8px] text-cyan">live</span>
        </div>
      </div>
    </Chrome>
  );
}

export function MockCognitivedge() {
  return (
    <Chrome>
      <div className="flex h-full">
        <div className="hidden w-1/3 border-r border-white/10 bg-white/[0.02] p-3 sm:block">
          <div className="font-mono text-[8px] uppercase tracking-wider text-muted">
            study hours
          </div>
          <div className="mt-1 font-display text-2xl text-ink">7.4h</div>
          <div className="mt-3 space-y-1.5">
            {[70, 45, 60, 80, 55].map((h, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full bg-violet"
                    style={{ width: `${h}%` }}
                  />
                </div>
                <span className="w-5 font-mono text-[7px] text-muted">{h}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-3">
          <div className="font-mono text-[8px] uppercase tracking-wider text-cyan">
            predicted score
          </div>
          <div className="mt-1 font-display text-3xl text-ink">
            87<span className="text-base text-muted">/100</span>
          </div>
          <div className="mt-4 space-y-1.5">
            {[
              { l: "study_hours", v: 0.32, pos: true },
              { l: "sleep", v: 0.18, pos: true },
              { l: "attendance", v: 0.14, pos: true },
              { l: "screen_time", v: -0.09, pos: false },
              { l: "stress", v: -0.06, pos: false },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-16 font-mono text-[8px] text-muted">{f.l}</span>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={
                      "absolute top-0 h-full rounded-full " +
                      (f.pos ? "left-1/2 bg-cyan" : "right-1/2 bg-violet")
                    }
                    style={{ width: `${Math.abs(f.v) * 100}%` }}
                  />
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/15" />
                </div>
                <span className="w-8 text-right font-mono text-[8px] text-muted">
                  {f.pos ? "+" : ""}
                  {f.v.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

export function MockTaskFlow() {
  return (
    <Chrome>
      <div className="grid h-full grid-cols-7 gap-1 p-2">
        {Array.from({ length: 7 * 3 }).map((_, i) => {
          const seed = (i * 37) % 100;
          const filled = seed > 55;
          const accent = seed > 80;
          return (
            <div
              key={i}
              className={
                "flex h-full flex-col gap-0.5 rounded-sm p-1 text-[7px] " +
                (filled
                  ? accent
                    ? "border border-cyan/30 bg-cyan/10 text-cyan"
                    : "border border-violet/30 bg-violet/10 text-violet-soft"
                  : "border border-dashed border-white/10")
              }
            >
              {filled && (
                <span className="truncate font-mono">
                  {accent ? "ship" : "build"}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Chrome>
  );
}

export function MockExpenseTap() {
  return (
    <Chrome>
      <div className="flex h-full">
        <div className="hidden w-1/4 border-r border-white/10 bg-white/[0.02] p-3 sm:block">
          {["Overview", "Income", "Spend", "Goals"].map((l, i) => (
            <div
              key={l}
              className={
                "mb-2 rounded px-2 py-1 font-mono text-[8px] uppercase tracking-wider " +
                (i === 0 ? "bg-violet/15 text-ink" : "text-muted")
              }
            >
              {l}
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "balance", v: "৳ 84.2k", c: "cyan" },
              { l: "income", v: "৳ 42.0k", c: "violet" },
              { l: "spend", v: "৳ 28.6k", c: "ink" },
            ].map((k) => (
              <div
                key={k.l}
                className="rounded border border-white/10 bg-white/[0.02] p-2"
              >
                <div className="font-mono text-[7px] uppercase tracking-wider text-muted">
                  {k.l}
                </div>
                <div className="mt-0.5 font-display text-sm text-ink">{k.v}</div>
              </div>
            ))}
          </div>
          <div className="flex h-20 items-end gap-1 rounded border border-white/10 bg-white/[0.02] p-2">
            {[42, 65, 30, 78, 55, 88, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-violet/60 to-cyan/70"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

export function MockMediCare() {
  return (
    <Chrome>
      <div className="flex h-full flex-col bg-gradient-to-b from-[#0b0e1c] to-[#070912] p-3">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-muted">
              next dose in
            </div>
            <div className="font-display text-2xl text-ink">02:14:38</div>
          </div>
          <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-cyan">
            on schedule
          </span>
        </div>
        <div className="flex-1 space-y-1.5 overflow-hidden">
          {[
            { t: "Metformin", d: "500mg · 08:00", done: true },
            { t: "Atorvastatin", d: "20mg · 14:00", done: true },
            { t: "Vitamin D3", d: "1000IU · 21:00", done: false },
            { t: "Aspirin", d: "75mg · 22:00", done: false },
          ].map((m, i) => (
            <div
              key={i}
              className={
                "flex items-center justify-between rounded border px-2 py-1.5 " +
                (m.done
                  ? "border-white/5 bg-white/[0.015] text-muted line-through"
                  : "border-violet/30 bg-violet/5 text-ink")
              }
            >
              <div>
                <div className="font-mono text-[9px]">{m.t}</div>
                <div className="font-mono text-[7px] text-muted">{m.d}</div>
              </div>
              <div
                className={
                  "h-2 w-2 rounded-full " +
                  (m.done ? "bg-white/20" : "bg-cyan")
                }
              />
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function MockFinance() {
  return (
    <Chrome>
      <div className="flex h-full">
        <div className="hidden w-1/5 border-r border-white/10 bg-white/[0.02] p-2 sm:block">
          {["Dashboard", "Budgets", "Recurring", "Insights"].map((l, i) => (
            <div
              key={l}
              className={
                "mb-1 rounded px-1.5 py-1 font-mono text-[8px] uppercase tracking-wider " +
                (i === 0 ? "bg-violet/20 text-ink" : "text-muted")
              }
            >
              {l}
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="rounded border border-violet/30 bg-gradient-to-br from-violet/15 to-cyan/10 p-2">
            <div className="font-mono text-[7px] uppercase tracking-wider text-muted">
              net worth
            </div>
            <div className="font-display text-xl text-ink">
              ৳ 124,580<span className="text-cyan">.45</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded border border-white/10 bg-white/[0.02] p-2">
              <div className="font-mono text-[7px] text-muted">budget</div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 rounded-full bg-cyan" />
              </div>
            </div>
            <div className="rounded border border-white/10 bg-white/[0.02] p-2">
              <div className="font-mono text-[7px] text-muted">goals</div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-1/2 rounded-full bg-violet" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded border border-white/10 bg-white/[0.02] p-2">
            <div className="relative h-10 w-10 rounded-full bg-[conic-gradient(from_90deg,rgb(124_92_255)_0deg,rgb(34_211,238)_120deg,rgb(124_92_255)_240deg,rgb(124_92_255)_360deg)]">
              <div className="absolute inset-1 rounded-full bg-[#0a0c14]" />
            </div>
            <div className="flex-1 space-y-1">
              {[
                { l: "rent", c: "bg-violet", w: "60%" },
                { l: "food", c: "bg-cyan", w: "30%" },
                { l: "misc", c: "bg-white/30", w: "10%" },
              ].map((s) => (
                <div key={s.l} className="flex items-center gap-1.5">
                  <span className={"h-1.5 w-1.5 rounded-full " + s.c} />
                  <span className="font-mono text-[7px] text-muted">{s.l}</span>
                  <span className="font-mono text-[7px] text-ink">{s.w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chrome>
  );
}

const MOCKS: Record<string, () => React.JSX.Element> = {
  "attention-framework": MockAttention,
  "voice-bridge": MockVoice,
  cognitivedge: MockCognitivedge,
  taskflow: MockTaskFlow,
  expensetap: MockExpenseTap,
  medicareminder: MockMediCare,
  financemanager: MockFinance,
};

export function ProjectMock({ id }: { id: string }) {
  const Comp = MOCKS[id];
  if (Comp) return <Comp />;
  return (
    <Frame>
      <div className="h-full w-full bg-gradient-to-br from-violet/30 via-panel to-cyan/30" />
    </Frame>
  );
}