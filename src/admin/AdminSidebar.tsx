import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Film,
  Inbox,
  Settings as SettingsIcon,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/videos', label: 'Videos', icon: Film, end: false },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox, end: false },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon, end: false },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user, signOut } = useAuth();

  return (
    <div className="flex h-full flex-col bg-neutral-900">
      <div className="flex items-center gap-3 border-b border-neutral-800 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-violet-600 font-bold text-white">
          KI
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-neutral-100">Admin</p>
          <p className="text-[11px] text-neutral-500">Kevin Infant</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-violet-600/15 text-violet-300'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'
                }`
              }
            >
              <Icon size={18} /> {l.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-neutral-800 p-3">
        <p className="truncate px-3 pb-2 text-[11px] text-neutral-500">{user?.email}</p>
        <button
          onClick={() => void signOut()}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-red-300"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
