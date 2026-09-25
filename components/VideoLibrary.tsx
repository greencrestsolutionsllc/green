'use client';
import { useEffect, useRef, useState } from 'react';
import type { Video } from '@/lib/videos';
import { formatDate } from '@/lib/site';

// D-008: self-hosted video with a custom player UI. No counts, no platform branding.

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, '0')}`;
};

function Player({ v }: { v: Video }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(0);
  const [cc, setCc] = useState(false);

  // Reset when a different video is selected.
  useEffect(() => { setStarted(false); setPlaying(false); setT(0); setD(0); }, [v.id]);
  useEffect(() => {
    const track = ref.current?.textTracks[0];
    if (track) track.mode = cc ? 'showing' : 'hidden';
  }, [cc, v.id]);

  const available = Boolean(v.src);
  const toggle = () => {
    const el = ref.current;
    if (!el || !available) return;
    setStarted(true);
    if (el.paused) void el.play(); else el.pause();
  };

  return (
    <div className="player">
      <div className="poster">
        {available && (
          <video
            ref={ref} key={v.id} src={v.src} preload="metadata" playsInline crossOrigin="anonymous"
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
            onTimeUpdate={e => setT(e.currentTarget.currentTime)}
            onLoadedMetadata={e => setD(e.currentTarget.duration)}
            onClick={toggle}
          >
            {v.captions && <track kind="captions" src={v.captions} srcLang="en" label="English" />}
          </video>
        )}
        {!started && (
          <>
            <div className="player__title">
              <div className="player__cats">{v.categories.join(' · ').toUpperCase()}</div>
              <div className="player__h">{v.title}</div>
            </div>
            <button
              type="button" className="play player__big" onClick={toggle} disabled={!available}
              aria-label={available ? `Play: ${v.title}` : `${v.title}: video not yet published`}
            />
          </>
        )}
        <div className="player__bar">
          <button type="button" className="player__pp" onClick={toggle} disabled={!available} aria-label={playing ? 'Pause' : 'Play'}>
            <span className={playing ? 'ico-pause' : 'ico-play'} aria-hidden="true" />
          </button>
          <input
            type="range" className="player__seek" min={0} max={d || 1} step={0.1} value={t} disabled={!available}
            aria-label="Seek" aria-valuetext={`${fmt(t)} of ${d ? fmt(d) : v.duration}`}
            style={{ ['--p' as string]: `${d ? (t / d) * 100 : 0}%` }}
            onChange={e => { const el = ref.current; if (el) el.currentTime = Number(e.target.value); }}
          />
          <span className="player__time num">{fmt(t)} / {d ? fmt(d) : v.duration}</span>
          <button
            type="button" className="player__cc" aria-pressed={cc} onClick={() => setCc(c => !c)}
            disabled={!v.captions} aria-label="CC (captions)"
          >CC</button>
        </div>
      </div>
      <div className="player__info">
        <p>{v.desc}</p>
        <span className="num" style={{ fontSize: 13, color: 'var(--night-label)' }}>
          {v.sample && <span className="player__sample">SAMPLE</span>}
          {formatDate(v.date)} · {v.duration}
        </span>
      </div>
    </div>
  );
}

export default function VideoLibrary({ videos }: { videos: Video[] }) {
  const [i, setI] = useState(0);
  const top = useRef<HTMLDivElement>(null);
  const v = videos[i];
  if (!v) return null;

  return (
    <>
      <div ref={top} style={{ marginTop: 48, scrollMarginTop: 96 }}>
        <Player v={v} />
      </div>
      <ul className="vgrid">
        {videos.map((x, k) => (
          <li key={x.id}>
            <button
              type="button" className="vcard" aria-current={k === i ? 'true' : undefined}
              onClick={() => { setI(k); top.current?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <span className="poster" aria-hidden="true">
                <span className="vcard__ptitle">{x.title}</span>
                <span className="vcard__dur num">{x.duration}</span>
              </span>
              <span className="vcard__title">{x.title}</span>
              <span className="vcard__desc">{x.desc}</span>
              <span className="meta" style={{ marginTop: 12 }}>{formatDate(x.date)} · {x.duration}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
