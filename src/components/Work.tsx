import { useState } from 'react';
import ShortForm from './ShortForm';
import LongForm from './LongForm';
import VideoViewer from './VideoViewer';
import Marquee from './Marquee';
import { useVideos } from '../hooks/useVideos';
import type { Video } from '../lib/types';

export default function Work() {
  const { shortForm, longForm } = useVideos();
  const [list, setList] = useState<Video[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const openShort = (i: number) => {
    setList(shortForm);
    setIndex(i);
  };
  const openLong = (i: number) => {
    setList(longForm);
    setIndex(i);
  };

  return (
    <section id="work" className="relative">
      <ShortForm videos={shortForm} onOpen={openShort} />

      {/* divider marquee — only between two populated galleries */}
      {shortForm.length > 0 && longForm.length > 0 && (
        <div className="border-y border-white/10 py-5 font-anton text-2xl uppercase tracking-tight text-white/15 md:text-4xl">
          <Marquee
            items={['Good footage', 'Better stories', 'Edit', 'Elevate', 'Engage']}
            duration={30}
          />
        </div>
      )}

      <LongForm videos={longForm} onOpen={openLong} />

      <VideoViewer
        videos={list}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </section>
  );
}
