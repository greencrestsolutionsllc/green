'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';

// D-011: full-colour mark at 32px; the logo file is unchanged.
export default function Header() {
  const path = usePathname() ?? '/';
  return (
    <header className="site-header">
      <div className="wrap site-header__in">
        <Link href="/" className="brand">
          <img src="/brand/logo-256.png" alt="" width={32} height={32} />
          <span>GREENCREST SOLUTIONS</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href.replace(/\/$/, '')) ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
