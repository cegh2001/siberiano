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
            alt="Carlos Gonzalez en el estudio"
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.
          </p>
          <p>
            Maecenas id malesuada ante, nec volutpat tellus. Phasellus sed tristique nisi. Morbi accumsan a mi eget condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla pulvinar diam ut hendrerit accumsan. Suspendisse sagittis mauris in arcu bibendum, efficitur commodo neque sodales.
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