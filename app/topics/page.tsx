// D-007 Topics page.
import Link from 'next/link';
import type { Metadata } from 'next';
import { AREAS, TOPICS, topicHref } from '@/lib/site';

export const metadata: Metadata = { title: 'Topics', description: 'Greencrest research crosses conventional subject boundaries.' };

export default function TopicsPage() {
  return (
    <div className="wrap page">
      <div className="label label--accent">TOPICS</div>
      <h1 className="h-page" style={{ fontSize: 'clamp(30px, 3.8vw, 50px)', lineHeight: 1.1, letterSpacing: '-0.016em', maxWidth: '24ch' }}>
        Greencrest research crosses conventional subject boundaries, with recurring areas of interest including:
      </h1>
      <div className="topics">
        {AREAS.map(a => (
          <section key={a} className="topics__row" aria-labelledby={`t-${a}`}>
            <h2 id={`t-${a}`} className="topics__name">{a}</h2>
            <p className="topics__text">{TOPICS[a]}</p>
            <Link href={topicHref(a)} className="topics__link" aria-label={`Perspectives on ${a}`}>Perspectives <span aria-hidden="true">→</span></Link>
          </section>
        ))}
      </div>
    </div>
  );
}
