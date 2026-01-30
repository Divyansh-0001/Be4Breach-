import Logo from "./Logo";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a className="transition hover:text-white" href="#about">
            About
          </a>
          <a className="transition hover:text-white" href="#services">
            Services
          </a>
          <a className="transition hover:text-white" href="#login">
            Login
          </a>
          <a className="transition hover:text-white" href="#contact">
            Contact
          </a>
        </nav>
        <a
          className="rounded-full border border-red-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-red-500"
          href="#login"
        >
          Login
        </a>
      </div>
    </header>
  );
}
