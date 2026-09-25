// D-008 Video page.
import type { Metadata } from 'next';
import { videos } from '@/lib/videos';
import VideoLibrary from '@/components/VideoLibrary';

export const metadata: Metadata = {
  title: 'Video',
  description: 'Greencrest Video presents selected research and perspectives through concise analysis, visual explanation and conversation.',
};

export default function VideoPage() {
  return (
    <div className="wrap page">
      <div className="label label--accent">VIDEO</div>
      <h1 className="h-page" style={{ fontSize: 'clamp(36px, 4.6vw, 60px)', lineHeight: 1.04 }}>Ideas explored through another medium.</h1>
      <p className="standfirst" style={{ marginTop: 20, maxWidth: '34em' }}>Greencrest Video presents selected research and perspectives through concise analysis, visual explanation and conversation.</p>
      <VideoLibrary videos={videos} />
    </div>
  );
}
