import { motion, useScroll, useSpring } from 'framer-motion';
import { chapters } from '../data/site';
import { scrollToSection } from '../hooks/useLenis';

interface Props {
  activeId: string;
}

/** Vertical chapter index + scroll progress rail (desktop). */
export default function SideProgress({ activeId }: Props) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <div className="pointer-events-none fixed right-6 top-1/2 z-[80] hidden -translate-y-1/2 lg:block">
      <div className="flex items-center gap-4">
        {/* progress rail */}
        <div className="relative h-40 w-px overflow-hidden bg-white/10">
          <motion.div
            className="absolute left-0 top-0 w-px origin-top bg-violet-soft"
            style={{ height: '100%', scaleY: progress }}
          />
        </div>

        <ul className="pointer-events-auto space-y-3">
          {chapters.map((c, i) => {
            const active = activeId === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(`#${c.id}`)}
                  data-cursor="link"
                  className="group flex items-center gap-2"
                  aria-label={`Go to ${c.label}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <span
                    className={`font-mono text-[10px] tabular-nums transition-colors ${
                      active ? 'text-violet-light' : 'text-muted/60'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-300 ${
                      active
                        ? 'text-chalk opacity-100'
                        : 'text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                  >
                    {c.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
