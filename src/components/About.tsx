import { motion } from 'framer-motion';
import { Phone, Mail, Instagram } from 'lucide-react';
import { photos, contact } from '../data/site';
import { aboutAnnotations, aboutParagraph } from '../data/content';
import { TextReveal } from './TextReveal';
import Timecode from './Timecode';
import ContactForm from './ContactForm';

const ease = [0.16, 1, 0.3, 1] as const;

const details = [
  { icon: Phone, label: 'Phone', value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { icon: Instagram, label: 'Instagram', value: contact.instagram, href: contact.instagramUrl },
];

/**
 * Combined final section — About (the editor) flowing into Contact.
 * Two stacked, container-aligned blocks: the contact form sits on the main
 * content grid, not floated to one side.
 */
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[50vh] w-[50vh] rounded-full bg-violet-glow/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[45vh] w-[60vh] rounded-full bg-violet-glow/[0.06] blur-[140px]" />

      <div className="frame-x relative">
        <div className="flex items-center gap-3">
          <span className="eyebrow">04 / ABOUT + CONTACT</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/60">
            — End credits
          </span>
        </div>

        {/* ============== ABOUT ============== */}
        <h2 className="headline mt-6 text-[clamp(2.8rem,8vw,7rem)] text-chalk">
          <TextReveal text={'More Than\nJust Cuts.'} />
        </h2>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:mx-0">
              <div className="absolute -left-3 -top-3 z-10 h-12 w-12 border-l border-t border-violet-soft/50" />
              <div className="absolute -bottom-3 -right-3 z-10 h-12 w-12 border-b border-r border-violet-soft/50" />
              <div className="relative aspect-[4/5] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.15] brightness-[0.92]"
                  style={{
                    backgroundImage: `url(${photos.portrait})`,
                    WebkitMaskImage:
                      'radial-gradient(135% 120% at 50% 40%, #000 68%, transparent 100%)',
                    maskImage:
                      'radial-gradient(135% 120% at 50% 40%, #000 68%, transparent 100%)',
                  }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_40%,transparent_24%,rgba(5,5,5,0.9)_92%)]" />
                <div className="absolute inset-0 bg-violet-glow/20 mix-blend-color" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_30%,rgba(192,132,252,0.22),transparent_55%)] mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-violet-light">
                <Timecode /> · FRAME 024
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <p className="font-anton text-2xl uppercase tracking-tight text-violet-light md:text-3xl">
              I'm Kevin Infant.
            </p>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
              {aboutParagraph}
            </p>
            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-2">
              {aboutAnnotations.map((a) => (
                <span key={a} className="font-hand text-3xl text-violet-light/80">
                  {a}.
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ============== CONTACT ============== */}
        <div className="mt-24 border-t border-white/10 pt-16 md:mt-32 md:pt-24">
          <h3 className="headline text-[clamp(2.6rem,7vw,6rem)] text-chalk">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, ease }}
              >
                Let's Work
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block text-grad"
                initial={{ y: '110%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
              >
                Together.
              </motion.span>
            </span>
          </h3>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
            Have footage that deserves a great edit? Tell me about your project and
            let's make something worth watching.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            {/* Form — aligned to the container's left edge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease }}
              className="lg:col-span-7"
            >
              <ContactForm />
            </motion.div>

            {/* Direct contact details */}
            <div className="lg:col-span-5">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Or reach me directly
              </p>
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {details.map((d) => {
                  const Icon = d.icon;
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 text-violet-soft transition-colors duration-300 group-hover:border-violet-soft/40 group-hover:text-violet-light">
                        <Icon size={17} strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                          {d.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-chalk">
                          {d.value}
                        </span>
                      </span>
                    </>
                  );
                  return d.href ? (
                    <a
                      key={d.label}
                      href={d.href}
                      target={d.href.startsWith('http') ? '_blank' : undefined}
                      rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      data-cursor="link"
                      className="group flex items-center gap-3 bg-base-800 p-4 transition-colors duration-300 hover:bg-base-700"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={d.label} className="group flex items-center gap-3 bg-base-800 p-4">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
