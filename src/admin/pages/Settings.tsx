import { useAuth } from '../../context/AuthContext';
import { ADMIN_EMAILS } from '../../lib/supabase';

export default function Settings() {
  const { user, signOut } = useAuth();

  const rows = [
    { label: 'Signed in as', value: user?.email ?? '—' },
    { label: 'Backend', value: 'Supabase (configured)' },
    {
      label: 'Admin allowlist',
      value: ADMIN_EMAILS.length ? ADMIN_EMAILS.join(', ') : 'Any authenticated user (set VITE_ADMIN_EMAILS to restrict)',
    },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-100">Settings</h1>
        <p className="mt-1 text-sm text-neutral-500">Account & configuration.</p>
      </header>

      <div className="max-w-xl divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-neutral-400">{r.label}</span>
            <span className="break-all text-sm text-neutral-100">{r.value}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => void signOut()}
        className="mt-8 rounded-lg border border-neutral-700 px-5 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-neutral-800"
      >
        Sign out
      </button>
    </div>
  );
}
