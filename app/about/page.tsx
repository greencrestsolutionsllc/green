// D-009 About page.
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Greencrest Solutions is an independent research and media platform focused on emerging economic, technological and societal change.',
};

export default function AboutPage() {
  return (
    <div className="wrap page">
      <div className="split">
        <h1 className="label label--accent" style={{ flex: '0 1 280px', margin: 0, paddingTop: 10 }}>ABOUT GREENCREST</h1>
        <div style={{ flex: '1 1 480px', maxWidth: 760 }}>
          <p className="serif" style={{ fontSize: 'clamp(28px, 3.2vw, 42px)', lineHeight: 1.18, letterSpacing: '-0.014em', margin: 0 }}>Greencrest Solutions is an independent research and media platform focused on emerging economic, technological and societal change.</p>
          <p className="about__p" style={{ marginTop: 28 }}>Its work examines developments across energy, technology, economics, infrastructure, industry and society, with particular interest in how changes across these areas interact.</p>
          <p className="about__p">Greencrest publishes research, perspectives and video intended to place individual developments within a broader context and examine their longer-term implications.</p>
        </div>
      </div>
      <section className="split" style={{ borderTop: '1px solid var(--ink)', marginTop: 'clamp(56px, 7vw, 96px)', paddingTop: 28 }} aria-labelledby="h-sarem">
        <div style={{ flex: '0 1 280px' }}>
          <h2 id="h-sarem" className="label" style={{ margin: 0 }}>SAREM YOUSUF</h2>
          <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6 }}>Founder</div>
        </div>
        <div style={{ flex: '1 1 480px', maxWidth: 760 }}>
          <p className="about__p" style={{ marginTop: 0 }}>Sarem Yousuf is an energy and infrastructure commercial executive whose experience spans power markets, energy storage, distributed energy, grid technologies and commercial energy markets.</p>
          <p className="about__p">His research and writing extend beyond individual technologies to examine their relationship with infrastructure, economics, industrial development and broader societal change.</p>
        </div>
      </section>
    </div>
  );
}
