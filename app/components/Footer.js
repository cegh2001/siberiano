'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="footer" id="footer">
      <div className="footer-nav">
        <Link
          href="/"
          className={`footer-link${pathname === '/' ? ' active' : ''}`}
          id="footer-narrative"
        >
          NARRATIVE
        </Link>
        <Link
          href="/about"
          className={`footer-link${pathname === '/about' ? ' active' : ''}`}
          id="footer-about"
        >
          ABOUT
        </Link>
      </div>
      <div className="footer-credit">
        <a
          href="https://naau.studio/"
          target="_blank"
          rel="noopener"
          id="footer-credit-link"
        >
          design by naau studio
        </a>
      </div>
    </footer>
  );
}
