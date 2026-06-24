export default function Footer() {
  return (
    <footer className="border-t border-[#32FF3210] py-10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#32FF32] to-[#00D26A] flex items-center justify-center">
              <span className="text-black font-black text-xs">ICT</span>
            </div>
            <span className="font-bold text-white text-base">
              Pro<span className="gradient-text">Trader</span>
            </span>
          </div>

          <p className="text-[#ffffff] text-xs text-center max-w-sm">
            Trading involves significant risk of loss. Past results do not guarantee future performance. For educational purposes only.
          </p>

          <p className="text-[#ffffff] text-xs">© 2026 ProTrader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
