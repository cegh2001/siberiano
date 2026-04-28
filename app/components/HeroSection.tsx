'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const heroTitle = titleRef.current;
    if (!heroTitle) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroTitle.style.transform = `translateY(${rate}px)`;
      heroTitle.style.opacity = `${Math.max(0, 1 - scrolled / 600)}`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projects = document.getElementById('projects');
    if (projects) {
      projects.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <h1 className="hero-title" id="hero-title" ref={titleRef}>
          KIRILL<br />GROSHEV
        </h1>
        <p className="hero-subtitle" id="hero-subtitle">
          Director of Photography
        </p>
      </div>
      <div
        className="hero-scroll-indicator"
        id="scroll-indicator"
        onClick={scrollToProjects}
        style={{ cursor: 'pointer' }}
      >
        <span className="scroll-line"></span>
      </div>
    </section>
  );
}