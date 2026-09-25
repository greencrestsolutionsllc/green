import Link from 'next/link';
import { NAV } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__in">
        <div className="wordmark">GREENCREST SOLUTIONS</div>
        <nav aria-label="Footer">
          {NAV.map(n => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        <div className="meta">© 2026 Greencrest Solutions</div>
      </div>
    </footer>
  );
}
