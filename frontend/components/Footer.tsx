import Logo from "./Logo";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 bg-black px-6 py-12 text-sm text-white/70"
      id="contact"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-white/60">
            Be4Breach is a cybersecurity partner focused on predictive defense,
            resilience, and trusted outcomes across global industries.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Contact
          </p>
          <p>+91 9461915152</p>
          <p>contact@be4breach.com</p>
          <p>www.be4breach.com</p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Social
          </p>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  className="transition hover:text-white"
                  href={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
