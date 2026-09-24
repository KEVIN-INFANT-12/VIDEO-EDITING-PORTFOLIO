import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { user, isAdmin, signIn, configured, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already signed in as an admin → go straight to the dashboard.
  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      setError(/invalid/i.test(error) ? 'Invalid email or password.' : error);
      return;
    }
    navigate('/admin', { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 font-sans">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
            <Lock size={20} />
          </div>
          <h1 className="text-xl font-semibold text-neutral-100">Admin Login</h1>
          <p className="mt-1 text-sm text-neutral-500">Kevin Infant — Portfolio CMS</p>
        </div>

        {!configured && (
          <p className="mb-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-200">
            Backend not configured. Add your Supabase keys to <code>.env.local</code>{' '}
            and restart the dev server.
          </p>
        )}

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
        >
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 outline-none transition focus:border-violet-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-neutral-500">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 outline-none transition focus:border-violet-500"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || !configured}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-600">
          <a href="/" className="hover:text-neutral-400">← Back to site</a>
        </p>
      </div>
    </div>
  );
}
