import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { contact } from '../data/site';
import { SERVICE_OPTIONS } from '../lib/types';
import { createEnquiry } from '../lib/enquiries';

const inputBase =
  'w-full rounded-xl border border-white/12 bg-white/[0.02] px-5 py-4 text-base text-chalk placeholder:text-muted/70 outline-none transition-colors duration-300 focus:border-violet-soft/60 focus:bg-white/[0.05]';
const labelBase =
  'mb-2.5 block font-mono text-xs uppercase tracking-[0.18em] text-muted';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Contact form. Stores the enquiry in Supabase when configured; otherwise
 * falls back to composing an email. Prevents duplicate submits.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending' || status === 'sent') return; // prevent duplicates

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      service: String(data.get('service') || '').trim(),
      message: String(data.get('message') || '').trim(),
    };

    setStatus('sending');
    setError('');
    try {
      const stored = await createEnquiry(payload);
      if (!stored) {
        // No backend configured — fall back to an email compose.
        const body = `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nService: ${payload.service}\n\n${payload.message}`;
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
          payload.service ? `${payload.service} — ${payload.name}` : `Enquiry — ${payload.name}`,
        )}&body=${encodeURIComponent(body)}`;
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-violet-soft/30 bg-violet-glow/[0.06] p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-glow/20 text-violet-light">
          <Check size={22} />
        </span>
        <h3 className="font-anton text-2xl uppercase tracking-tight text-chalk">
          Message sent.
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          Thanks for reaching out — I'll get back to you shortly. Want to send
          another?
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          data-cursor="link"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-light transition hover:text-violet-soft"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelBase}>
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputBase} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelBase}>
            Email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={inputBase} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-phone" className={labelBase}>
            Phone / WhatsApp
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 …" className={inputBase} />
        </div>
        <div>
          <label htmlFor="cf-service" className={labelBase}>
            Service
          </label>
          <select id="cf-service" name="service" defaultValue="" className={`${inputBase} appearance-none`}>
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-base-800 text-chalk">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelBase}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          required
          placeholder="Tell me about your footage and what you're going for."
          className={`${inputBase} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-red-400">
          {error}
        </p>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          data-cursor="action"
          data-cursor-label="Send"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet-glow px-7 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-glow transition-colors duration-300 hover:bg-violet-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={17} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
