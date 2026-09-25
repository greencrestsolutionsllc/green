'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import type { ArticleMeta } from '@/lib/content';
import { AREAS } from '@/lib/site';
import ArticleCard from '@/components/ArticleCard';

// D-005: filters use ?topic=<area>, which /topics and the homepage link to.
export default function PerspectivesArchive({ articles }: { articles: ArticleMeta[] }) {
  const router = useRouter();
  const q = useSearchParams()?.get('topic')?.toLowerCase();
  const active = AREAS.find(a => a.toLowerCase() === q) ?? 'All';
  const shown = active === 'All' ? articles : articles.filter(a => a.categories.includes(active));

  const pick = (f: string) =>
    router.replace(f === 'All' ? '/perspectives/' : `/perspectives/?topic=${f.toLowerCase()}`, { scroll: false });

  return <ArchiveView articles={shown} active={active} onPick={pick} />;
}

export function ArchiveView({ articles, active, onPick }: { articles: ArticleMeta[]; active: string; onPick?: (f: string) => void }) {
  return (
    <>
      <div className="filters" role="group" aria-label="Filter by topic">
        {['All', ...AREAS].map(f => (
          <button key={f} type="button" className="chip" aria-pressed={active === f} onClick={() => onPick?.(f)}>
            {f.toUpperCase()}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {articles.length > 0 ? (
          <div className="grid-cards" style={{ marginTop: 28 }}>
            {articles.map(a => <ArticleCard key={a.slug} a={a} />)}
          </div>
        ) : (
          <p className="empty" style={{ marginTop: 28 }}>No perspectives in {active.toLowerCase()} yet.</p>
        )}
      </div>
    </>
  );
}
