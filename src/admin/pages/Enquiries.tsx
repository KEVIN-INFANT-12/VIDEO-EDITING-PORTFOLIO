import { useEffect, useMemo, useState } from 'react';
import { Loader2, Inbox, Search } from 'lucide-react';
import type { Enquiry, EnquiryStatus } from '../../lib/types';
import { listEnquiries, updateEnquiryStatus } from '../../lib/enquiries';
import { useToast } from '../components/Toast';

const STATUSES: EnquiryStatus[] = ['new', 'contacted', 'closed'];
const statusStyle: Record<EnquiryStatus, string> = {
  new: 'bg-rose-500/15 text-rose-300',
  contacted: 'bg-amber-500/15 text-amber-300',
  closed: 'bg-neutral-700/40 text-neutral-400',
};

export default function Enquiries() {
  const toast = useToast();
  const [items, setItems] = useState<Enquiry[] | null>(null);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<EnquiryStatus | 'all'>('all');

  useEffect(() => {
    listEnquiries()
      .then(setItems)
      .catch((e) => {
        setItems([]);
        toast(e.message ?? 'Failed to load enquiries', 'error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStatus = async (e: Enquiry, status: EnquiryStatus) => {
    setItems((prev) => prev?.map((x) => (x.id === e.id ? { ...x, status } : x)) ?? prev);
    try {
      await updateEnquiryStatus(e.id, status);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Update failed', 'error');
    }
  };

  const filtered = useMemo(() => {
    if (!items) return [];
    return items.filter((e) => {
      if (filter !== 'all' && e.status !== filter) return false;
      if (!q) return true;
      const hay = `${e.name} ${e.email} ${e.phone ?? ''} ${e.service ?? ''} ${e.message}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [items, q, filter]);

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-100">Enquiries</h1>
        <p className="mt-1 text-sm text-neutral-500">Messages from the contact form.</p>
      </header>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, message…"
            className="w-full rounded-lg border border-neutral-700 bg-neutral-950 py-2.5 pl-9 pr-3 text-sm text-neutral-100 outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex gap-1.5">
          {(['all', ...STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-wide transition ${
                filter === s ? 'bg-violet-600 text-white' : 'border border-neutral-800 text-neutral-400 hover:text-neutral-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {items === null ? (
        <div className="flex justify-center py-20 text-neutral-500">
          <Loader2 className="animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-800 py-20 text-center">
          <Inbox className="text-neutral-600" />
          <p className="text-sm text-neutral-500">No enquiries{filter !== 'all' ? ` (${filter})` : ''} yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e) => (
            <div key={e.id} className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-neutral-100">{e.name}</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                    <a href={`mailto:${e.email}`} className="hover:text-violet-300">{e.email}</a>
                    {e.phone && <a href={`tel:${e.phone}`} className="hover:text-violet-300">{e.phone}</a>}
                    {e.service && <span className="text-neutral-500">{e.service}</span>}
                    <span className="text-neutral-600">{new Date(e.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <select
                  value={e.status}
                  onChange={(ev) => setStatus(e, ev.target.value as EnquiryStatus)}
                  className={`rounded-lg border-0 px-2.5 py-1.5 text-xs font-medium uppercase tracking-wide outline-none ${statusStyle[e.status]}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-neutral-900 text-neutral-100">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-neutral-300">{e.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
