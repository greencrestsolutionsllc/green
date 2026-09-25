'use client';
import { useState, type FormEvent } from 'react';
import { EMAIL_RE, subscribe } from '@/lib/subscribe';

type State = 'idle' | 'error' | 'sending' | 'done' | 'failed';

// D-010: idle / error / done. "sending" and "failed" are Build additions for the network call.
export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) return setState('error');
    setState('sending');
    try { await subscribe(v); setEmail(v); setState('done'); }
    catch { setState('failed'); }
  }

  return (
    <div className="subscribe">
      <div style={{ flex: '1 1 360px' }}>
        <h2 className="label label--accent" style={{ margin: 0 }}>NEW PERSPECTIVES</h2>
        <p className="serif" style={{ fontSize: 'clamp(24px, 2.4vw, 32px)', lineHeight: 1.18, margin: '14px 0 0' }}>
          Occasional research and analysis from Greencrest Solutions.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)', margin: '10px 0 0' }}>No daily updates. No news digest.</p>
      </div>
      <div style={{ flex: '1 1 380px', maxWidth: 500 }} aria-live="polite">
        {state === 'done' ? (
          <p className="done">Subscribed as {email}.</p>
        ) : (
          <>
            <form onSubmit={onSubmit} noValidate>
              <input
                type="email" name="email" autoComplete="email" placeholder="Email address" aria-label="Email address"
                value={email}
                onChange={e => { setEmail(e.target.value); if (state === 'error' || state === 'failed') setState('idle'); }}
                aria-invalid={state === 'error'}
                aria-describedby={state === 'error' || state === 'failed' ? 'sub-msg' : undefined}
              />
              <button type="submit" className="btn btn--solid" style={{ padding: '14px 22px' }} disabled={state === 'sending'}>Subscribe</button>
            </form>
            {state === 'error' && <p id="sub-msg" className="err">Enter a valid email address.</p>}
            {state === 'failed' && <p id="sub-msg" className="err">Subscription is not available yet. Please try again later.</p>}
          </>
        )}
      </div>
    </div>
  );
}
