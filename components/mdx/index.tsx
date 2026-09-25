// D-006 article components, available in every MDX file without imports.
import type { ReactNode } from 'react';

/* ---------- Evidence block ---------- */

const KINDS = {
  fact: { label: 'FACT', def: 'What available evidence establishes.', color: 'var(--ink)' },
  interpretation: { label: 'INTERPRETATION', def: 'What the evidence may imply.', color: 'var(--ink)' },
  uncertainty: { label: 'UNCERTAINTY', def: 'What remains unknown or contested.', color: 'var(--caution)' },
  perspective: { label: 'PERSPECTIVE', def: 'The argument or interpretation being advanced.', color: 'var(--accent)' },
} as const;
type Kind = keyof typeof KINDS;

/** <Evidence><Fact>…</Fact><Interpretation>…</Interpretation>…</Evidence> */
export function Evidence({ children }: { children: ReactNode }) {
  return <dl className="evidence">{children}</dl>;
}
function Claim({ kind, children }: { kind: Kind; children: ReactNode }) {
  const k = KINDS[kind];
  return (
    <div className="evidence__row">
      <dt style={{ color: k.color }}>{k.label}</dt>
      <dd>
        <div className="evidence__def">{k.def}</div>
        <div className="evidence__text">{children}</div>
      </dd>
    </div>
  );
}
export const Fact = ({ children }: { children: ReactNode }) => <Claim kind="fact">{children}</Claim>;
export const Interpretation = ({ children }: { children: ReactNode }) => <Claim kind="interpretation">{children}</Claim>;
export const Uncertainty = ({ children }: { children: ReactNode }) => <Claim kind="uncertainty">{children}</Claim>;
export const Perspective = ({ children }: { children: ReactNode }) => <Claim kind="perspective">{children}</Claim>;

/* ---------- Pull quote ---------- */

export function PullQuote({ children }: { children: ReactNode }) {
  return <blockquote className="pullquote"><p>{children}</p></blockquote>;
}

/* ---------- Figure (bar chart) ---------- */

interface FigureProps {
  n: number;
  title: string;        // stated as a finding
  meta: string;         // unit of measure, geography, period
  source: string;       // required under every chart
  data: number[];
  labels?: string[];
  highlight?: number;   // index drawn in accent; defaults to the last bar
  unit?: string;
  placeholder?: boolean; // D-012: "PLACEHOLDER DATA"
}

export function Figure({ n, title, meta, source, data, labels, highlight, unit = '', placeholder }: FigureProps) {
  if (!source?.trim()) throw new Error(`Figure ${n} "${title}" has no source line (design/README.md §3)`);
  const max = Math.max(...data) || 1;
  const hi = highlight ?? data.length - 1;
  const lab = labels ?? data.map((_, i) => `T${i + 1}`);
  const summary = data.map((v, i) => `${lab[i]}: ${v}${unit}`).join(', ');
  return (
    <figure className="fig">
      <div className="fig__head">
        <figcaption>Figure {n}. {title}</figcaption>
        {placeholder && <span className="ph-tag">PLACEHOLDER DATA</span>}
      </div>
      <div className="fig__meta">{meta}</div>
      <div className="fig__plot" role="img" aria-label={`${title}. ${summary}.`}>
        <div className="fig__grid" style={{ top: '25%' }} />
        <div className="fig__grid" style={{ top: '50%' }} />
        <div className="fig__grid" style={{ top: '75%' }} />
        {data.map((v, i) => (
          <div key={i} className="fig__bar" style={{ height: `${(v / max) * 100}%`, background: i === hi ? 'var(--accent)' : 'var(--series)' }} />
        ))}
      </div>
      <div className="fig__labels" aria-hidden="true">
        {lab.map((l, i) => <div key={i}>{l}</div>)}
      </div>
      <div className="fig__source">Source: {source}</div>
    </figure>
  );
}

/* ---------- Footnotes ---------- */

/** Marker in the text: <Fn n={1} /> */
export function Fn({ n }: { n: number }) {
  return (
    <sup className="fn">
      <a href={`#note-${n}`} id={`ref-${n}`} aria-label={`Note ${n}`}>{n}</a>
    </sup>
  );
}

/** <Notes><Note n={1}>…</Note></Notes> at the end of the article. */
export function Notes({ children }: { children: ReactNode }) {
  return (
    <section className="notes" aria-label="Notes">
      <div className="notes__label">NOTES</div>
      <ol>{children}</ol>
    </section>
  );
}
export function Note({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li id={`note-${n}`} value={n}>
      {children} <a href={`#ref-${n}`} aria-label={`Back to note ${n} in text`}>↩</a>
    </li>
  );
}

export const mdxComponents = { Evidence, Fact, Interpretation, Uncertainty, Perspective, PullQuote, Figure, Fn, Notes, Note };
