'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutContent() {
  const bioRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bioParagraphs = bioRef.current?.querySelectorAll('p');
    if (!bioParagraphs || bioParagraphs.length === 0) return;

    const bioObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            bioObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -30px 0px' }
    );

    bioParagraphs.forEach((paragraph, index) => {
      paragraph.style.transitionDelay = `${index * 0.15}s`;
      bioObserver.observe(paragraph);
    });

    return () => bioObserver.disconnect();
  }, []);

  return (
    <>
      <section className="about-hero" id="about-hero">
        <div className="about-hero-image" style={{ position: 'relative' }}>
          <Image
            src="https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=1200&q=80"
            alt="Kirill Groshev behind the camera"
            id="about-main-image"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      <section className="about-content" id="about-content">
        <h2 className="section-heading" id="biography-heading">
          BIOGRAPHY
        </h2>
        <div className="bio-text" id="bio-text" ref={bioRef}>
          <p>
            Kirill Groshev was born on 17 May, 1996. From an early childhood he
            preferred learning through his personal experience rather than theory.
            Kirill went through the path of becoming a director of photography
            through direct experience. Therefore, after graduating from school, he
            began to work in film crews, initially as a lighting technician. Then as
            a gaffer and later as a camera assistant. After six years of working with
            a large number of talented directors of photography, Kirill moved to the
            position of a Director of Photography.
          </p>
          <p>
            Working as a DP for over 5 years, Kirill has shot a significant number
            of music videos, fashion films, short films, and commercials, working
            with international brands and artists.
          </p>
          <p>
            Kirill&apos;s approach to cinematography is deeply rooted in visual
            storytelling. He believes that every frame should serve the narrative,
            creating an emotional connection with the viewer through light,
            composition, and movement.
          </p>
        </div>
      </section>

      <section className="about-contacts" id="about-contacts">
        <div className="contacts-column" id="personal-contacts">
          <h3 className="contacts-heading">PERSONAL CONTACTS</h3>
          <div className="contacts-list">
            <a
              href="https://vimeo.com/kirillgroshev"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-vimeo"
            >
              VIMEO
            </a>
            <a
              href="https://www.instagram.com/kirill.groshev/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-instagram"
            >
              INSTAGRAM
            </a>
            <a
              href="mailto:dpkirillgroshev@gmail.com"
              className="contact-link"
              id="contact-email"
            >
              EMAIL
            </a>
          </div>
        </div>
        <div className="contacts-column" id="agency-contacts">
          <h3 className="contacts-heading">AGENCY</h3>
          <div className="contacts-list">
            <a
              href="https://www.mymanagement.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-agency"
            >
              MY MANAGEMENT
            </a>
            <a
              href="mailto:zoe@mymanagement.co.uk"
              className="contact-link"
              id="contact-agency-email"
            >
              EMAIL
            </a>
          </div>
        </div>
      </section>
    </>
  );
}