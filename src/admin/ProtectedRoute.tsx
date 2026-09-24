import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/** Gates admin routes: requires an authenticated, allow-listed user. */
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, user, isAdmin, configured } = useAuth();
  const location = useLocation();

  if (!configured) {
    return (
      <AdminNotice
        title="Backend not configured"
        body="Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local, then restart the dev server to enable the admin panel."
      />
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (!isAdmin) {
    return (
      <AdminNotice
        icon={<ShieldAlert className="text-red-400" />}
        title="Access denied"
        body="This account isn't authorized for the admin panel."
        showSignOut
      />
    );
  }

  return <>{children}</>;
}

function AdminNotice({
  title,
  body,
  icon,
  showSignOut,
}: {
  title: string;
  body: string;
  icon?: ReactNode;
  showSignOut?: boolean;
}) {
  const { signOut } = useAuth();
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6">
      <div className="max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center">
        <div className="mb-4 flex justify-center">{icon ?? <ShieldAlert className="text-amber-400" />}</div>
        <h1 className="text-lg font-semibold text-neutral-100">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{body}</p>
        {showSignOut && (
          <button
            onClick={() => void signOut()}
            className="mt-6 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}
