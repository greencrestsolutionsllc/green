import Link from 'next/link';
import type { ArticleMeta } from '@/lib/content';
import { formatDate } from '@/lib/site';

// D-005: card shows only category, title, one sentence, date · read time.
// Never add counts, likes or comments here.
export default function ArticleCard({
  a, as: H = 'h2', showDesc = true, showMeta = true, className = '',
}: { a: ArticleMeta; as?: 'h2' | 'h3'; showDesc?: boolean; showMeta?: boolean; className?: string }) {
  return (
    <Link href={`/perspectives/${a.slug}/`} className={`card ${className}`}>
      <div className="cat">{a.categories.join(' · ')}</div>
      <H className="card__title">{a.title}</H>
      {showDesc && <p className="card__desc">{a.desc}</p>}
      {showMeta && <div className="meta">{formatDate(a.date)} · {a.readTime}</div>}
    </Link>
  );
}
