/** Fixed, full-viewport backdrop rendered once in the root layout, behind
 *  everything. Because it's `fixed` (not part of page flow) it stays put
 *  while the page scrolls, so every section shares one continuous, richly
 *  textured canvas instead of each section being its own flat black panel.
 *
 *  Layers, back to front: base color → drifting aurora blobs → grid →
 *  vignette (for edge contrast) → grain (breaks up flat-color banding). */
export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-void" aria-hidden="true">
      <div className="ambient-aurora-a" />
      <div className="ambient-aurora-b" />
      <div className="ambient-aurora-c" />
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-vignette" />
      <div className="ambient-grain" />
    </div>
  );
}
