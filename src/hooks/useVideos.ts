import { useEffect, useState } from 'react';
import type { Video } from '../lib/types';
import { getPublishedVideos } from '../lib/videos';

/** Loads published videos for the public site (Supabase or local fallback). */
export function useVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    getPublishedVideos()
      .then((v) => {
        if (alive) setVideos(v);
      })
      .catch(() => {
        if (alive) setVideos([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const shortForm = videos.filter((v) => v.category === 'short_form');
  const longForm = videos.filter((v) => v.category === 'long_form');
  const featured = videos.filter((v) => v.is_featured);

  return { videos, shortForm, longForm, featured, loading };
}
