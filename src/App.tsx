import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import HomePage from './HomePage';
import ProtectedRoute from './admin/ProtectedRoute';

// Admin is lazy-loaded so its code (and dnd-kit) stays out of the public bundle.
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/pages/Login'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const VideosAdmin = lazy(() => import('./admin/pages/Videos'));
const EnquiriesAdmin = lazy(() => import('./admin/pages/Enquiries'));
const SettingsAdmin = lazy(() => import('./admin/pages/Settings'));

function AdminFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-500">
      <Loader2 className="animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<AdminFallback />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="videos" element={<VideosAdmin />} />
          <Route path="enquiries" element={<EnquiriesAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
