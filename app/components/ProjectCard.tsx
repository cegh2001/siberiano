'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type ProjectCardProps = {
  id: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  artist: string;
  title: string;
  index: number;
};

export default function ProjectCard({
  id,
  href,
  imageSrc,
  imageAlt,
  artist,
  title,
  index,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [index]);

  return (
    <Link href={href} className="project-card" id={id} ref={cardRef}>
      <div className="project-thumbnail">
        <Image src={imageSrc} alt={imageAlt} width={800} height={600} loading="lazy" style={{ objectFit: 'cover' }} />
        <div className="project-overlay"></div>
      </div>
      <div className="project-info">
        <span className="project-artist">{artist}</span>
        <span className="project-title-text">{title}</span>
      </div>
    </Link>
  );
}