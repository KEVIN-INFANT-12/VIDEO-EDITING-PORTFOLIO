import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { ToastProvider } from './components/Toast';

/** Dashboard shell — fixed sidebar on desktop, drawer on mobile. */
export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-800 lg:block">
          <AdminSidebar />
        </aside>

        {/* Mobile top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/90 px-4 py-3 backdrop-blur lg:hidden">
          <span className="flex items-center gap-2 text-sm font-semibold text-neutral-100">
            <span className="flex h-7 w-7 items-center justify-center rounded bg-violet-600 text-xs font-bold text-white">
              KI
            </span>
            Admin
          </span>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="rounded-lg border border-neutral-800 p-2 text-neutral-300"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-72 max-w-[80vw] shadow-xl">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-3 z-10 rounded-lg p-2 text-neutral-400 hover:text-neutral-100"
              >
                <X size={18} />
              </button>
              <AdminSidebar onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        {/* Content */}
        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
