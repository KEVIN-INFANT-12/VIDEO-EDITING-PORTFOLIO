import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { workflow } from '../data/content';
import { TextReveal } from './TextReveal';

export default function Software() {
  return (
    <section id="software" className="relative overflow-hidden py-24 md:py-36">
      {/* ---------- Subtle background depth (≈90–95% black) ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* glow behind the heading */}
        <div className="absolute -top-10 left-[6%] h-[42vh] w-[42vh] rounded-full bg-violet-glow/[0.07] blur-[120px]" />
        {/* atmospheric glow around the pipeline */}
        <div className="absolute left-1/2 top-1/2 h-[46vh] w-[66vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/[0.06] blur-[140px]" />
        {/* faint technical grid, faded at the edges */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            WebkitMaskImage: 'radial-gradient(circle at 50% 45%, #000, transparent 72%)',
            maskImage: 'radial-gradient(circle at 50% 45%, #000, transparent 72%)',
          }}
        />
        {/* faint oversized concentric arcs */}
        <div className="absolute left-1/2 top-1/2 h-[82vh] w-[82vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="absolute left-1/2 top-1/2 h-[54vh] w-[54vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-soft/[0.05]" />
      </div>

      <div className="frame-x relative z-10">
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">TAKE 02 / TOOLS</span>
            <h2 className="headline mt-5 text-[clamp(2.8rem,8vw,7rem)] leading-[1.08] tracking-[0.02em] text-chalk">
              <TextReveal text={'Tools Of\nThe Trade'} />
            </h2>
          </div>
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted">
            A tight pipeline. Nothing bloated — just the three tools that take a
            project from raw clips to finished story.
          </p>
        </div>

        {/* ---------- Pipeline: 3 equal cards + arrows between ---------- */}
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5 md:flex-row md:items-stretch md:gap-4 lg:gap-8">
          {workflow.map((step, i) => (
            <div key={step.abbr} className="contents">
              {i > 0 && <Arrow index={i} />}
              <motion.div
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 }}
                data-cursor="link"
                className="group relative flex w-full max-w-[300px] flex-col items-center justify-center rounded-xl border border-white/10 bg-base-800/70 p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-white/20 md:w-[220px] lg:w-[240px]"
              >
                <span className="absolute right-4 top-3 font-mono text-[10px] text-muted/50">
                  0{i + 1}
                </span>
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-2xl border font-anton text-3xl leading-none transition-transform duration-500 group-hover:scale-105"
                  style={{
                    color: step.accent,
                    borderColor: `${step.accent}55`,
                    background: `linear-gradient(160deg, ${step.accent}22, ${step.accent}08)`,
                    boxShadow: `inset 0 0 26px ${step.accent}18`,
                  }}
                >
                  {step.abbr}
                </div>
                <h3 className="mt-5 font-anton text-lg uppercase tracking-tight text-chalk">
                  {step.tool}
                </h3>
              </motion.div>
            </div>
          ))}
        </div>

        <p className="mt-16 text-center font-anton text-2xl uppercase tracking-tight text-chalk/85 md:text-3xl">
          Good footage in.{' '}
          <span className="text-grad">Better stories out.</span>
        </p>
      </div>
    </section>
  );
}

/** Arrow between cards — points right on desktop, down when stacked. */
function Arrow({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
      className="flex shrink-0 items-center justify-center text-violet-soft/70"
      aria-hidden
    >
      <ArrowRight size={22} className="rotate-90 md:rotate-0" />
    </motion.div>
  );
}
