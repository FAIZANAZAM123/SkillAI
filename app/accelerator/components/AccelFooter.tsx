export default function AccelFooter() {
  return (
    <footer
      className="py-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#050816" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4F46E5,#7C3AED)" }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="font-black text-white">
              Accel<span style={{ color: "#4F46E5" }}>IO</span>
            </span>
          </div>
          <p className="text-xs text-center max-w-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            AccelIO is a startup accelerator event. Results vary. Past outcomes do not guarantee future results.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2026 AccelIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
