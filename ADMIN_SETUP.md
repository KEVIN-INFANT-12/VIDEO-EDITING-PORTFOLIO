# Admin & Backend Setup (Supabase)

The public site works immediately using the bundled fallback videos. To enable the
dynamic portfolio, contact-form storage, and the admin panel, connect Supabase.

## 1. Create a Supabase project
1. Go to https://supabase.com → New project (free tier is fine).
2. Once created, open **Project Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 2. Add environment variables
Create `.env.local` in the project root (copy from `.env.example`):

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
VITE_ADMIN_EMAILS=kevininfant12@gmail.com
```

Restart the dev server after saving (`npm run dev`). `.env.local` is git-ignored.

> Only the **anon** key goes in the browser. Never put the **service_role** key in
> frontend code or `.env.local`.

## 3. Create the database
In Supabase Studio → **SQL Editor**, run the contents of:
- `supabase/migrations/0001_init.sql`  (tables, indexes, RLS policies)
- `supabase/seed.sql`  (optional — loads the current 17 videos)

## 4. Create your admin account
1. Supabase → **Authentication → Users → Add user** → enter your email + a password
   (tick "Auto confirm user").
2. Authorize that email in the database — SQL Editor:
   ```sql
   insert into public.admins (email) values ('kevininfant12@gmail.com')
     on conflict (email) do nothing;
   ```
   Use the **same** email you set in `VITE_ADMIN_EMAILS`.

## 5. Log in
- Visit `/admin` → you'll be redirected to `/admin/login`.
- Sign in with the email/password from step 4.

## Routes
| Route | Access |
| --- | --- |
| `/` `/portfolio` `/contact` | Public |
| `/admin/login` | Public (login) |
| `/admin` | Dashboard (admin only) |
| `/admin/videos` | Manage videos — add/edit/delete, publish, feature, drag-reorder |
| `/admin/enquiries` | Contact submissions |
| `/admin/settings` | Account info |

## How security works
- **RLS is the real gate** (enforced by Postgres, not the browser):
  - Public visitors can only `SELECT` videos where `is_published = true`.
  - Only emails in `public.admins` can insert/update/delete videos or read enquiries.
  - Anyone can `INSERT` an enquiry (contact form); only admins can read them.
- `VITE_ADMIN_EMAILS` is a client-side convenience check; even if bypassed, the
  database rejects unauthorized writes.

## Deployment note
This is a client-side routed SPA. On your host (Netlify/Vercel/etc.) add a rewrite
so all paths serve `index.html` (e.g. Netlify `/* /index.html 200`). Set the same
`VITE_*` env vars in the host's dashboard.

## Contact form → Supabase Auth email note
The contact form writes to the `enquiries` table (no auth needed). If Supabase is
not configured, it falls back to opening the visitor's email client.
