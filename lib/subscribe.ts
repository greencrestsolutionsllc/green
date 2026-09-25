// D-010: email provider is Build's choice and hasn't been made yet (see STATUS.md).
// Set NEXT_PUBLIC_SUBSCRIBE_ENDPOINT to a URL that accepts POST {"email"} to go live.
// Without it, subscribe() rejects, so the form never tells anyone they're subscribed when they aren't.

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/; // same check as the mockup

export const subscribeEnabled = Boolean(process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT);

export async function subscribe(email: string): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT;
  if (!url) throw new Error('No subscribe provider configured');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(`Subscribe failed: ${res.status}`);
}
