import data from '@/content/video/videos.json';

export interface Video {
  id: string;
  title: string;
  desc: string;
  categories: string[];
  date: string;      // ISO
  duration: string;  // m:ss
  src?: string;      // D-008: self-hosted stream (Mux / Cloudflare Stream); absent = not published yet
  captions?: string; // WebVTT for the CC control
  sample?: boolean;
}

export const videos: Video[] = data.videos;
