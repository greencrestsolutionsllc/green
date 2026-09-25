import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx';

const DIR = path.join(process.cwd(), 'content/perspectives');

export interface ArticleMeta {
  slug: string;
  title: string;
  desc: string;          // one-sentence standfirst / card description
  categories: string[];  // from AREAS
  date: string;          // ISO yyyy-mm-dd
  readTime: string;      // "14 min read"
  showAuthorBio?: boolean;
  related?: string[];    // slugs
  placeholder?: boolean; // D-012: body is structural placeholder text
}

type Frontmatter = Omit<ArticleMeta, 'slug'>;

async function compile(slug: string) {
  const source = await readFile(path.join(DIR, `${slug}.mdx`), 'utf8');
  // Content is our own repo files, so JS expressions in MDX props (chart data) are allowed.
  return compileMDX<Frontmatter>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true, blockJS: false },
  });
}

export const getArticle = cache(async (slug: string) => {
  const { content, frontmatter } = await compile(slug);
  return { meta: { slug, ...frontmatter } as ArticleMeta, content };
});

/** All articles, newest first. */
export const getArticles = cache(async (): Promise<ArticleMeta[]> => {
  const files = (await readdir(DIR)).filter(f => f.endsWith('.mdx'));
  const all = await Promise.all(files.map(f => getArticle(f.replace(/\.mdx$/, ''))));
  return all.map(a => a.meta).sort((a, b) => b.date.localeCompare(a.date));
});

/** Up to 3 related: the frontmatter list first, then most recent sharing a category, then most recent. */
export async function getRelated(meta: ArticleMeta, n = 3): Promise<ArticleMeta[]> {
  const others = (await getArticles()).filter(a => a.slug !== meta.slug);
  const picked: ArticleMeta[] = [];
  const add = (a?: ArticleMeta) => { if (a && !picked.includes(a) && picked.length < n) picked.push(a); };
  (meta.related ?? []).forEach(s => add(others.find(a => a.slug === s)));
  others.filter(a => a.categories.some(c => meta.categories.includes(c))).forEach(add);
  others.forEach(add);
  return picked;
}
