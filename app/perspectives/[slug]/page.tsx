// D-006 article template; D-012 placeholder marks.
import Link from 'next/link';
import type { Metadata } from 'next';
import { getArticle, getArticles, getRelated } from '@/lib/content';
import { AUTHOR_BIO, formatDate } from '@/lib/site';
import ArticleCard from '@/components/ArticleCard';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getArticles()).map(a => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta } = await getArticle((await params).slug);
  return {
    title: meta.title,
    description: meta.desc,
    authors: [{ name: 'Sarem Yousuf' }],
    // Placeholder articles must not be indexed (D-012).
    robots: meta.placeholder ? { index: false } : undefined,
    openGraph: { title: meta.title, description: meta.desc, type: 'article', publishedTime: meta.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { meta, content } = await getArticle((await params).slug);
  const related = await getRelated(meta);

  return (
    <>
      <article className="article">
        <Link href="/perspectives/" className="article__back">← Perspectives</Link>
        <div className="cat" style={{ marginTop: 40 }}>{meta.categories.join(' · ')}</div>
        <h1 className="article__title">{meta.title}</h1>
        <p className="article__standfirst">{meta.desc}</p>
        <div className="byline">
          <span>By Sarem Yousuf</span>
          <span className="num" style={{ color: 'var(--muted)' }}><time dateTime={meta.date}>{formatDate(meta.date)}</time> · {meta.readTime}</span>
        </div>

        {meta.placeholder && (
          <div className="ph-box" role="note">
            <span className="ph-tag">PLACEHOLDER TEXT</span>
            <span className="ph-note">Article body in preparation. The copy below shows structure and typography only.</span>
          </div>
        )}

        <div className="prose">{content}</div>

        {meta.showAuthorBio && (
          <section className="bio" aria-labelledby="h-bio">
            <h2 id="h-bio" className="notes__label">ABOUT THE AUTHOR</h2>
            <p>{AUTHOR_BIO}</p>
          </section>
        )}
      </article>

      {related.length > 0 && (
        <section className="wrap" style={{ paddingTop: 'clamp(56px, 7vw, 96px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }} aria-labelledby="h-related">
          <h2 id="h-related" className="label" style={{ borderTop: '1px solid var(--ink)', paddingTop: 18, margin: 0 }}>RELATED PERSPECTIVES</h2>
          <div className="grid-cards grid-cards--related" style={{ marginTop: 20 }}>
            {related.map(a => <ArticleCard key={a.slug} a={a} as="h3" showDesc={false} />)}
          </div>
        </section>
      )}
    </>
  );
}
