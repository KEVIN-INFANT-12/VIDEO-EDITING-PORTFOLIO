import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client — created only when env vars are present.
 * When absent, `supabase` is null and the app falls back to local data,
 * so the public site keeps working before the backend is configured.
 *
 * Configure in `.env.local`:
 *   VITE_SUPABASE_URL=...
 *   VITE_SUPABASE_ANON_KEY=...
 *   VITE_ADMIN_EMAILS=you@example.com   (comma-separated allowlist)
 */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/** Admin allowlist from env (defence-in-depth; RLS is the real gate). */
export const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS as string | undefined ?? '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  // If no allowlist is configured, any authenticated user is treated as admin
  // (RLS still enforces server-side). Configure VITE_ADMIN_EMAILS to restrict.
  if (ADMIN_EMAILS.length === 0) return true;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
