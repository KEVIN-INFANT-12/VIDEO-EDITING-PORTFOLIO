import { ArrowUp } from 'lucide-react';
import { nav, person } from '../data/site';
import { scrollToSection } from '../hooks/useLenis';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-base-900">
      <div className="frame-x py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-violet-soft/40 font-anton text-lg text-violet-light">
                {person.initials}
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-wide text-chalk">
                  {person.name}
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {person.role}
                </span>
              </span>
            </div>
            <p className="mt-6 font-anton text-3xl uppercase leading-none tracking-tight text-chalk/90 md:text-5xl">
              Good footage.
              <br />
              <span className="text-grad">Better stories.</span>
            </p>
          </div>

          <nav className="md:col-span-3 md:col-start-8" aria-label="Footer">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Index
            </span>
            <ul className="mt-5 space-y-2.5">
              {[{ label: 'Home', href: '#home' }, ...nav].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(l.href);
                    }}
                    data-cursor="link"
                    className="group inline-flex items-center text-sm text-muted transition-colors hover:text-chalk"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-violet-soft transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 md:col-start-11">
            <button
              type="button"
              onClick={() => scrollToSection('#home')}
              data-cursor="link"
              className="group inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:border-violet-soft/40 hover:text-violet-light"
            >
              Top
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Kevin Infant — All rights reserved.</span>
          <span>Edit. Elevate. Engage.</span>
        </div>
      </div>
    </footer>
  );
}
