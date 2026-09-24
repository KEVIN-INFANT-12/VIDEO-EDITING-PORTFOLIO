import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { nav, person } from '../data/site';
import { scrollToSection } from '../hooks/useLenis';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop(): void; start(): void } })
      .lenis;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToSection(href), open ? 260 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={`fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ${
          scrolled
            ? 'border-b border-white/10 bg-base-900/70 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="frame-x flex items-center justify-between py-4 md:py-5">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go('#home');
            }}
            data-cursor="link"
            className="group flex items-center gap-3"
            aria-label="Kevin Infant — home"
          >
            <span className="flex h-10 w-10 items-center justify-center border border-violet-soft/40 font-anton text-lg text-violet-light transition group-hover:bg-violet-glow/15">
              {person.initials}
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-[13px] font-semibold tracking-wide text-chalk">
                {person.name}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {person.role}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-7 md:flex">
              {nav.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    data-cursor="link"
                    className="group relative flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-chalk"
                  >
                    <span className="font-mono text-[10px] text-violet-soft/70">
                      0{i + 1}
                    </span>
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-violet-soft transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Menu toggle (mobile) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              data-cursor="link"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span
                className={`h-px w-6 bg-chalk transition-all duration-300 ${
                  open ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-6 bg-chalk transition-all duration-300 ${
                  open ? '-translate-y-[3.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[85] flex flex-col justify-center bg-base-900/98 px-7 backdrop-blur-2xl md:hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(168,85,247,0.16),transparent_55%)]" />
            <ul className="relative space-y-1">
              {[{ label: 'Home', href: '#home' }, ...nav].map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    className="flex items-baseline gap-4 py-1 font-anton text-5xl uppercase tracking-tight text-chalk/85"
                  >
                    <span className="font-mono text-xs text-violet-soft">
                      0{i + 1}
                    </span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                go('#about');
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-violet-glow px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-glow"
            >
              Start a project <ArrowUpRight size={15} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
