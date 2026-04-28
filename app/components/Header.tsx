'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <Link href="/" className="logo" id="logo">
          <span className="logo-text">SIBERIANO</span>
        </Link>
        <nav className="nav-links" id="nav-links">
          <Link href="/#canciones" className="nav-link" id="nav-canciones">CANCIONES</Link>
          <Link href="/#videos" className="nav-link" id="nav-videos">VIDEOS</Link>
          <Link href="/1162-underground" className={`nav-link${pathname === '/1162-underground' ? ' active' : ''}`} id="nav-1162">1162 UNDERGROUND</Link>
          <Link href="/aetherium-mob" className={`nav-link${pathname === '/aetherium-mob' ? ' active' : ''}`} id="nav-aetherium">AETHERIUM MOB</Link>
          <Link
            href="/about"
            className={`nav-link${pathname === '/about' ? ' active' : ''}`}
            id="nav-about"
          >
            ACERCA DE
          </Link>
        </nav>
        <button
          className="menu-toggle"
          id="menu-toggle"
          aria-label="Toggle menu"
          onClick={toggleMenu}
        >
          <span>{menuOpen ? '[CLOSE]' : '[MENU]'}</span>
        </button>
      </header>

      <div className={`menu-overlay${menuOpen ? ' open' : ''}`} id="menu-overlay">
        <div className="menu-overlay-content">
          <Link href="/#canciones" className="menu-overlay-link" id="menu-link-canciones" onClick={closeMenu}>CANCIONES</Link>
          <Link href="/#videos" className="menu-overlay-link" id="menu-link-videos" onClick={closeMenu}>VIDEOS</Link>
          <Link href="/1162-underground" className={`menu-overlay-link${pathname === '/1162-underground' ? ' active' : ''}`} id="menu-link-1162" onClick={closeMenu}>1162 UNDERGROUND</Link>
          <Link href="/aetherium-mob" className={`menu-overlay-link${pathname === '/aetherium-mob' ? ' active' : ''}`} id="menu-link-aetherium" onClick={closeMenu}>AETHERIUM MOB</Link>
          <Link
            href="/about"
            className={`menu-overlay-link${pathname === '/about' ? ' active' : ''}`}
            id="menu-link-about"
            onClick={closeMenu}
          >
            ACERCA DE
          </Link>
        </div>
      </div>
    </>
  );
}