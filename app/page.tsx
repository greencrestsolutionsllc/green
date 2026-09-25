// D-004 homepage. Copy is word for word from the brief; layout follows the mockup.
import Link from 'next/link';
import { getArticles } from '@/lib/content';
import { videos } from '@/lib/videos';
import { AREAS, DESCRIPTOR, QUESTIONS, SUPPORTING, topicHref } from '@/lib/site';
import ArticleCard from '@/components/ArticleCard';
import Subscribe from '@/components/Subscribe';

export default async function Home() {
  const [lead, ...rest] = (await getArticles()).slice(0, 4);
  const fv = videos[0];

  return (
    <>
      <section className="wrap" style={{ paddingTop: 'clamp(56px, 9vw, 120px)', paddingBottom: 'clamp(56px, 7vw, 96px)' }}>
        <div className="label label--accent">GREENCREST SOLUTIONS</div>
        <h1 className="h-hero">{DESCRIPTOR}</h1>
        <p className="serif" style={{ fontSize: 'clamp(19px, 1.6vw, 22px)', lineHeight: 1.5, color: 'var(--text-2)', margin: '30px 0 0', maxWidth: '36em' }}>{SUPPORTING}</p>
        <div style={{ marginTop: 38 }}>
          <Link href="/perspectives/" className="btn btn--solid">Explore Perspectives <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(64px, 8vw, 112px)' }} aria-labelledby="h-persp">
        <div style={{ borderTop: '1px solid var(--ink)', paddingTop: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '8px 28px' }}>
          <h2 id="h-persp" className="label" style={{ margin: 0 }}>PERSPECTIVES</h2>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--muted)', margin: 0, maxWidth: '44em' }}>Research, analysis and commentary on developments with implications beyond the immediate.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 56px', marginTop: 40 }}>
          {/* Lead card is text-only until a documentary photo exists (README §3 Imagery). */}
          {lead && (
            <Link href={`/perspectives/${lead.slug}/`} className="card" style={{ flex: '1.35 1 460px', borderTop: 0, display: 'block' }}>
              <div className="cat">{lead.categories.join(' · ')}</div>
              <h3 className="card__title" style={{ fontSize: 'clamp(32px, 3.6vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.015em' }}>{lead.title}</h3>
              <p className="serif" style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--text-2)', margin: '16px 0 0', maxWidth: '34em' }}>{lead.desc}</p>
            </Link>
          )}
          <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column' }}>
            {rest.map(a => (
              <ArticleCard key={a.slug} a={a} as="h3" showMeta={false} className="card--list" />
            ))}
            <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 22 }}>
              <Link href="/perspectives/" className="btn btn--line">View all perspectives</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section--ruled" aria-labelledby="h-areas">
        <div className="wrap section" style={{ display: 'flex', flexWrap: 'wrap', gap: '36px 72px' }}>
          <div style={{ flex: '1.2 1 440px' }}>
            <h2 id="h-areas" className="label" style={{ margin: 0 }}>AREAS OF INTEREST</h2>
            <ul className="areas">
              {AREAS.map((a, i) => (
                <li key={a}>
                  <Link href={topicHref(a)}>{a}</Link>
                  {i < AREAS.length - 1 && <span aria-hidden="true">&nbsp;·&nbsp;</span>}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: '1 1 360px', display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 4 }}>
            <p className="serif" style={{ fontSize: 21, lineHeight: 1.45, margin: 0 }}>Greencrest follows developments across these areas without treating them as isolated subjects.</p>
            <p className="body-ui">Technological change affects energy demand. Energy availability influences industrial development. Infrastructure constrains economic possibility. Demographic and institutional changes alter how societies respond.</p>
            <p className="body-ui">The intersections are often as consequential as the individual developments themselves.</p>
          </div>
        </div>
      </section>

      <section className="section--ruled" aria-labelledby="h-q">
        <div className="wrap section">
          <h2 id="h-q" className="label" style={{ margin: 0 }}>QUESTIONS</h2>
          <ol className="questions">
            {QUESTIONS.map((q, i) => (
              <li key={q}>
                <span className="questions__n num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="questions__q">{q}</span>
              </li>
            ))}
          </ol>
          <p className="questions__coda">These questions are not predictions. They are starting points for examining structural change.</p>
        </div>
      </section>

      <section style={{ background: 'var(--night)', color: '#EDEBE4' }} aria-labelledby="h-video">
        <div className="wrap section" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px 64px' }}>
          <div style={{ flex: '1 1 340px' }}>
            <h2 id="h-video" className="label" style={{ margin: 0, color: 'var(--night-label)' }}>GREENCREST VIDEO</h2>
            <p className="serif" style={{ fontSize: 'clamp(26px, 2.6vw, 36px)', lineHeight: 1.16, letterSpacing: '-0.01em', margin: '20px 0 0', color: 'var(--paper)' }}>Selected perspectives presented through short-form analysis and conversation.</p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--night-text)', margin: '18px 0 0', maxWidth: '30em' }}>Video provides another format for examining the ideas, evidence and competing interpretations behind Greencrest research.</p>
            <div style={{ marginTop: 30 }}>
              <Link href="/video/" className="btn btn--night">Watch <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          {fv && (
            <Link href="/video/" className="poster" style={{ flex: '1.3 1 420px', display: 'block' }} aria-label={`Watch: ${fv.title}`}>
              <span className="play play--sm" style={{ position: 'absolute', top: 24, left: 28, width: 52, height: 52 }} aria-hidden="true" />
              <span className="num" style={{ position: 'absolute', top: 26, right: 28, fontSize: 13, color: 'var(--night-text)' }}>{fv.duration}</span>
              <span style={{ position: 'absolute', left: 28, right: 28, bottom: 26 }}>
                <span style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', color: 'var(--night-label)' }}>{fv.categories.join(' · ').toUpperCase()}</span>
                <span className="serif" style={{ display: 'block', fontSize: 'clamp(22px, 2.4vw, 32px)', lineHeight: 1.1, marginTop: 8, maxWidth: '16em' }}>{fv.title}</span>
              </span>
            </Link>
          )}
        </div>
      </section>

      <section aria-labelledby="h-about">
        <div className="wrap section split">
          <h2 id="h-about" className="label" style={{ flex: '0 1 280px', margin: 0, paddingTop: 6 }}>ABOUT GREENCREST</h2>
          <div style={{ flex: '1 1 440px', maxWidth: 720 }}>
            <p className="serif" style={{ fontSize: 'clamp(22px, 2vw, 27px)', lineHeight: 1.38, margin: 0 }}>Greencrest Solutions is an independent platform for research, analysis and perspectives on emerging economic, technological and societal change.</p>
            <p className="body-ui" style={{ marginTop: 18 }}>Its areas of interest span energy, technology, economics, infrastructure, industry and society, with particular attention to the relationships between them.</p>
            <div style={{ marginTop: 26 }}>
              <Link href="/about/" className="link-under">About Greencrest</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(64px, 8vw, 112px)' }}>
        <Subscribe />
      </section>
    </>
  );
}
