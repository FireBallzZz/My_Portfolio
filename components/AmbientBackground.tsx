/** Fixed, full-viewport backdrop rendered once in the root layout. */
export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden bg-void"
      aria-hidden="true"
    >
      <div className="ambient-aurora-a" />
      <div className="ambient-aurora-b" />
      <div className="ambient-aurora-c" />
      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-vignette" />
      <div className="ambient-grain" />
    </div>
  );
}