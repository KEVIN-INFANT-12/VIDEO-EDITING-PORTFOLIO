import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/content';
import { TextReveal } from './TextReveal';

export default function Services() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-24 md:py-36">
      <div className="frame-x">
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">EDIT / 01</span>
            <h2 className="headline mt-4 text-[clamp(2.4rem,7vw,6rem)] text-chalk">
              <TextReveal text={'What I Edit'} lineClassName="whitespace-nowrap" />
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted">
            Four disciplines, one obsession — making footage feel intentional
            from the first frame to the last.
          </p>
        </div>

        {/* Editorial rows */}
        <ul
          className="border-t border-white/10"
          onMouseLeave={() => setHover(null)}
        >
          {services.map((s, i) => {
            const active = hover === i;
            const dim = hover !== null && !active;
            return (
              <motion.li
                key={s.no}
                onMouseEnter={() => setHover(i)}
                data-cursor="link"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="group relative border-b border-white/10"
              >
                {/* hover wash */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-glow/10 via-violet-glow/[0.03] to-transparent transition-opacity duration-500 ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div
                  className={`relative flex flex-col gap-4 py-7 transition-all duration-500 md:flex-row md:items-center md:gap-8 md:py-9 ${
                    dim ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <span
                    className={`font-mono text-sm transition-colors duration-300 ${
                      active ? 'text-violet-light' : 'text-muted'
                    }`}
                  >
                    {s.no}
                  </span>

                  <h3
                    className={`headline flex-1 text-[clamp(2rem,6.5vw,5rem)] transition-all duration-500 ${
                      active ? 'text-grad translate-x-2 md:translate-x-4' : 'text-chalk'
                    }`}
                  >
                    {s.title}
                  </h3>

                  {/* tags */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 md:max-w-[16rem] md:justify-end">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ArrowUpRight
                    className={`hidden shrink-0 text-violet-light transition-all duration-500 md:block ${
                      active
                        ? 'translate-x-0 translate-y-0 opacity-100'
                        : '-translate-x-2 translate-y-2 opacity-0'
                    }`}
                    size={30}
                  />
                </div>

                {/* description reveals on hover (desktop) */}
                <div
                  className={`overflow-hidden transition-all duration-500 md:pl-12 ${
                    active ? 'max-h-16 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="max-w-xl text-sm text-muted">{s.line}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
