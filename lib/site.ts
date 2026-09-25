// Fixed site copy and taxonomy. All strings come word for word from
// design/briefs/2026-09-website-redesign.md.

export const AREAS = ['Energy', 'Technology', 'Economics', 'Infrastructure', 'Industry', 'Society'] as const;
export type Area = (typeof AREAS)[number];

export const NAV = [
  { label: 'Perspectives', href: '/perspectives/' },
  { label: 'Topics', href: '/topics/' },
  { label: 'Video', href: '/video/' },
  { label: 'About', href: '/about/' },
] as const;

export const TOPICS: Record<Area, string> = {
  Energy: 'Electricity, generation, storage, nuclear energy, natural gas, power markets, resources and changing patterns of energy demand.',
  Technology: 'Artificial intelligence, computation, automation, emerging technologies and the economic and physical systems supporting their development.',
  Economics: 'Growth, productivity, capital, markets, investment and the economic conditions influencing technological and industrial change.',
  Infrastructure: 'Energy systems, data centers, transportation, manufacturing and the physical foundations supporting economic activity.',
  Industry: 'Industrial capacity, manufacturing, supply chains, commercialization and the changing geography of production.',
  Society: 'Demographics, labor, institutions and the broader consequences of economic and technological change.',
};

export const QUESTIONS = [
  'What happens when intelligence becomes significantly cheaper?',
  'Can infrastructure development keep pace with technological change?',
  'How does access to energy alter economic possibility?',
  'What determines whether emerging technologies achieve widespread adoption?',
  'How might demographic change reshape economies built around population growth?',
  'What becomes more valuable when previously scarce capabilities become abundant?',
  'How do physical constraints shape seemingly digital industries?',
];

export const DESCRIPTOR = 'Independent research and perspectives on emerging economic, technological and societal change.';
export const SUPPORTING =
  'Greencrest explores developments across energy, technology, economics and society, with particular interest in the connections between them and their longer-term implications.';
export const AUTHOR_BIO =
  'Sarem Yousuf is the founder of Greencrest Solutions and an energy and infrastructure commercial executive. His writing examines developments across energy, technology, economics and infrastructure within their broader commercial and societal context.';

export const topicHref = (a: string) => `/perspectives/?topic=${a.toLowerCase()}`;

/** "2026-09-18" → "18 September 2026" (the mockup's date style). */
export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
