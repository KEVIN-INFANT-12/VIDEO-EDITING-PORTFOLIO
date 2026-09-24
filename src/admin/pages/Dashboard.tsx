import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Eye, FileEdit, Zap, Clapperboard, Inbox } from 'lucide-react';
import { listAllVideos } from '../../lib/videos';
import { listEnquiries } from '../../lib/enquiries';
import type { Video, Enquiry } from '../../lib/types';

export default function Dashboard() {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[] | null>(null);

  useEffect(() => {
    listAllVideos().then(setVideos).catch(() => setVideos([]));
    listEnquiries().then(setEnquiries).catch(() => setEnquiries([]));
  }, []);

  const total = videos?.length ?? 0;
  const published = videos?.filter((v) => v.is_published).length ?? 0;
  const drafts = total - published;
  const shortCount = videos?.filter((v) => v.category === 'short_form').length ?? 0;
  const longCount = videos?.filter((v) => v.category === 'long_form').length ?? 0;
  const newEnquiries = enquiries?.filter((e) => e.status === 'new').length ?? 0;

  const loading = videos === null;

  const stats = [
    { label: 'Total videos', value: total, icon: Film, accent: 'text-violet-300' },
    { label: 'Published', value: published, icon: Eye, accent: 'text-emerald-300' },
    { label: 'Drafts', value: drafts, icon: FileEdit, accent: 'text-amber-300' },
    { label: 'Short form', value: shortCount, icon: Zap, accent: 'text-sky-300' },
    { label: 'Long form', value: longCount, icon: Clapperboard, accent: 'text-fuchsia-300' },
    { label: 'New enquiries', value: newEnquiries, icon: Inbox, accent: 'text-rose-300' },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-100">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Overview of your portfolio content.</p>
      </header>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  {s.label}
                </span>
                <Icon size={18} className={s.accent} />
              </div>
              <p className="mt-3 text-3xl font-semibold text-neutral-100">
                {loading ? <span className="inline-block h-8 w-10 animate-pulse rounded bg-neutral-800" /> : s.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/admin/videos"
          className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
        >
          Manage videos
        </Link>
        <Link
          to="/admin/enquiries"
          className="rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-neutral-800"
        >
          View enquiries
        </Link>
      </div>
    </div>
  );
}
