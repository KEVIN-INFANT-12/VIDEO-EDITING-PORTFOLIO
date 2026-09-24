import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import SideProgress from './components/SideProgress';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Software from './components/Software';
import Work from './components/Work';
import About from './components/About';
import Footer from './components/Footer';
import { useLenis } from './hooks/useLenis';
import { useActiveSection } from './hooks/useActiveSection';
import { chapters } from './data/site';

const SECTION_IDS = chapters.map((c) => c.id);

/** The public single-page portfolio. */
export default function HomePage() {
  useLenis();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <>
      {/* Global cinematic overlays */}
      <CustomCursor />
      <div className="grain animate-grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <div className="filmedge" aria-hidden />

      <Navbar />
      <SideProgress activeId={activeId} />

      <main>
        <Hero />

        <div className="border-y border-white/10 bg-base-800/50 py-4 font-anton text-xl uppercase tracking-tight text-chalk/80 md:text-3xl">
          <Marquee
            items={['Edit.', 'Elevate.', 'Engage.', 'Good footage', 'Better stories']}
            duration={34}
          />
        </div>

        <Services />
        <Software />
        <Work />
        <About />
      </main>

      <Footer />
    </>
  );
}
