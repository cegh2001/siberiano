'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState(0); 

  const typeText = 'PROYECTO';

  useEffect(() => {
    // Phase 0: Type "PROYECTO"
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= typeText.length) {
        setDisplayText(typeText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        // Phase 1: show SIBERIANO & POR CARLOS GONZALEZ
        setTimeout(() => setPhase(1), 300);
        
        // Phase 2: Fade out PROYECTO and change subtitle to PRODUCER & ARTIST
        setTimeout(() => setPhase(2), 3500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const heroTitle = titleRef.current;
    if (!heroTitle) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      // Parallax effect on scroll
      if (phase >= 1) {
        heroTitle.style.transform = `translateY(${rate}px)`;
        heroTitle.style.opacity = `${Math.max(0, 1 - scrolled / 600)}`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phase]);

  const scrollToProjects = () => {
    const projects = document.getElementById('canciones');
    if (projects) {
      projects.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TOP: Streaming text "PROYECTO" */}
        <div 
          className="streaming-text" 
          id="streaming-text" 
          style={{ 
            marginTop: 0, 
            marginBottom: '24px',
            animation: 'none', 
            opacity: phase < 2 ? 1 : 0, 
            transition: 'opacity 1s ease',
            height: '30px'
          }}
        >
          <span className="streaming-content">{displayText}</span>
          <span className="streaming-cursor" style={{ opacity: phase < 2 ? 1 : 0, transition: 'opacity 0.5s ease' }}></span>
        </div>

        {/* MIDDLE: SIBERIANO */}
        <h1 
          className="hero-title" 
          id="hero-title" 
          ref={titleRef}
          style={{
            animation: 'none',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1.2s ease, transform 1s ease'
          }}
        >
          SIBERIANO
        </h1>

        {/* BOTTOM: POR CARLOS GONZALEZ -> PRODUCER & ARTIST */}
        <div style={{ position: 'relative', height: '30px', marginTop: '24px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <p 
            className="hero-subtitle" 
            style={{ 
              animation: 'none',
              marginTop: 0,
              position: 'absolute',
              opacity: phase === 1 ? 1 : 0,
              transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
          >
            POR CARLOS GONZALEZ
          </p>
          <p 
            className="hero-subtitle" 
            style={{ 
              animation: 'none',
              marginTop: 0,
              position: 'absolute',
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s'
            }}
          >
            PRODUCER &amp; ARTIST
          </p>
        </div>

      </div>
      
      <div
        className="hero-scroll-indicator"
        id="scroll-indicator"
        onClick={scrollToProjects}
        style={{ cursor: 'pointer', animation: phase >= 2 ? 'fadeInUp 0.6s ease forwards' : 'none', opacity: 0 }}
      >
        <span className="scroll-line"></span>
      </div>
    </section>
  );
}
