import type { Metadata } from 'next';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DESCRIPTOR } from '@/lib/site';

export const metadata: Metadata = {
  title: { default: 'Greencrest Solutions', template: '%s · Greencrest Solutions' },
  description: DESCRIPTOR,
  icons: { icon: '/brand/logo-256.png' },
  openGraph: { title: 'Greencrest Solutions', description: DESCRIPTOR, type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
