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
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
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
      {/* Header / Navigation */}
      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <Link href="/" className="logo" id="logo">
          <span className="logo-text">GROSHEV</span>
        </Link>
        <nav className="nav-links" id="nav-links">
          <Link
            href="/"
            className={`nav-link${pathname === '/' ? ' active' : ''}`}
            id="nav-narrative"
          >
            narrative
          </Link>
          <Link
            href="/about"
            className={`nav-link${pathname === '/about' ? ' active' : ''}`}
            id="nav-about"
          >
            about
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

      {/* Mobile Menu Overlay */}
      <div className={`menu-overlay${menuOpen ? ' open' : ''}`} id="menu-overlay">
        <div className="menu-overlay-content">
          <Link
            href="/"
            className={`menu-overlay-link${pathname === '/' ? ' active' : ''}`}
            id="menu-link-narrative"
            onClick={closeMenu}
          >
            NARRATIVE
          </Link>
          <Link
            href="/about"
            className={`menu-overlay-link${pathname === '/about' ? ' active' : ''}`}
            id="menu-link-about"
            onClick={closeMenu}
          >
            ABOUT
          </Link>
        </div>
      </div>
    </>
  );
}
