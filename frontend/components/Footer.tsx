export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="text-lg font-semibold text-white">Be4Breach</p>
            <p className="text-sm text-slate-400">
              Cybersecurity readiness and response automation for teams that
              cannot afford downtime.
            </p>
            <p className="text-sm text-slate-400">security@be4breach.com</p>
          </div>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Platform
            </p>
            <ul className="space-y-2">
              <li>Threat intelligence</li>
              <li>Incident readiness</li>
              <li>Risk reporting</li>
            </ul>
          </div>
          <div className="space-y-3 text-sm text-slate-400">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Company
            </p>
            <ul className="space-y-2">
              <li>Security standards</li>
              <li>Privacy commitments</li>
              <li>Responsible disclosure</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>© 2026 Be4Breach. All rights reserved.</p>
          <p>Built for security leaders who demand clarity.</p>
        </div>
      </div>
    </footer>
  );
}
