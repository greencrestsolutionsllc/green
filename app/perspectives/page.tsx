// D-005 Perspectives archive.
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getArticles } from '@/lib/content';
import PerspectivesArchive, { ArchiveView } from '@/components/PerspectivesArchive';

export const metadata: Metadata = {
  title: 'Perspectives',
  description: 'Research and commentary examining economic, technological and societal change through a broader lens.',
};

export default async function PerspectivesPage() {
  const articles = await getArticles();
  return (
    <div className="wrap page">
      <div className="label label--accent">PERSPECTIVES</div>
      <h1 className="h-page" style={{ maxWidth: '20ch' }}>Research and commentary examining economic, technological and societal change through a broader lens.</h1>
      <p className="standfirst">Greencrest Perspectives focuses on developments whose significance extends beyond the immediate event, market or technology.</p>
      {/* The static HTML shows the unfiltered archive; ?topic= applies once the page hydrates. */}
      <Suspense fallback={<ArchiveView articles={articles} active="All" />}>
        <PerspectivesArchive articles={articles} />
      </Suspense>
    </div>
  );
}
