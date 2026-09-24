import { useState } from 'react';
import type { Video } from '../lib/types';
import { ytThumb } from '../lib/videos';

interface Props {
  video: Video;
  className?: string;
  eager?: boolean;
}

/** Cover image: custom thumbnail → YouTube maxres → hq → generated fallback. */
export default function VideoThumb({ video, className = '', eager }: Props) {
  const initial = video.thumbnail_url || ytThumb(video.video_url, 'max');
  const [src, setSrc] = useState(initial);
  const [failed, setFailed] = useState(!initial);
  const [loaded, setLoaded] = useState(false);

  const onError = () => {
    if (!video.thumbnail_url && src.includes('maxresdefault')) {
      setSrc(ytThumb(video.video_url, 'hq'));
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-base-700 ${className}`}
        role="img"
        aria-label={video.title}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(168,85,247,0.3),transparent_60%)]" />
        <span className="relative px-4 text-center font-anton text-xl uppercase tracking-tight text-white/80">
          {video.title}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-base-700 ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-base-600" />}
      <img
        src={src}
        alt={video.title}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={onError}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
