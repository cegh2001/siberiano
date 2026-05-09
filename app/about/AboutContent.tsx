'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siberianoSongs } from '../data/songs';

type AboutMediaItem = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  meta: string;
};

const aboutMediaItems: AboutMediaItem[] = [
  ...siberianoSongs.map((song) => ({
    src: song.albumCover,
    alt: `Portada de ${song.title} por ${song.artist}`,
    eyebrow: 'Portada',
    title: song.title,
    meta: song.date || 'Catalogo de Siberiano',
  })),
];

const ABOUT_HERO_ROTATION_DELAY_MS = 7000;

function buildShuffledSequence(length: number, startIndex: number) {
  const indices = Array.from({ length }, (_, index) => index).filter(
    (index) => index !== startIndex
  );

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[randomIndex]] = [indices[randomIndex], indices[index]];
  }

  return [startIndex, ...indices];
}

export default function AboutContent() {
  const bioRef = useRef<HTMLDivElement | null>(null);
  const rotationSequenceRef = useRef<number[]>([]);
  const rotationStepRef = useRef(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const currentMedia = aboutMediaItems[currentMediaIndex] ?? aboutMediaItems[0];

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

  useEffect(() => {
    if (aboutMediaItems.length < 2) return;

    rotationSequenceRef.current = buildShuffledSequence(aboutMediaItems.length, 0);
    rotationStepRef.current = 0;

    const rotationInterval = window.setInterval(() => {
      const currentSequence = rotationSequenceRef.current;
      let nextStep = rotationStepRef.current + 1;

      if (nextStep >= currentSequence.length) {
        const lastMediaIndex = currentSequence[currentSequence.length - 1] ?? 0;
        rotationSequenceRef.current = buildShuffledSequence(
          aboutMediaItems.length,
          lastMediaIndex
        );
        nextStep = 1;
      }

      rotationStepRef.current = nextStep;
      setCurrentMediaIndex(rotationSequenceRef.current[nextStep] ?? 0);
    }, ABOUT_HERO_ROTATION_DELAY_MS);

    return () => window.clearInterval(rotationInterval);
  }, []);

  return (
    <>
      <section className="about-hero" id="about-hero">
        <div className="about-hero-image" style={{ position: 'relative' }}>
          <div
            className="about-hero-image-frame"
            key={currentMedia.src}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Image
              src={currentMedia.src}
              alt={currentMedia.alt}
              id="about-main-image"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="about-hero-copy">
            <p className="about-hero-kicker">La Guaira · 1162 · Hip hop venezolano</p>
            <h1 className="about-hero-title">SIBERIANO</h1>
            <p className="about-hero-description">
              Una mirada a la trayectoria, la vision y el sonido con los que
              Siberiano empuja el underground desde La Guaira.
            </p>
            <p className="about-hero-now" aria-live="polite">
              En foco: {currentMedia.title} · {currentMedia.meta}
            </p>
          </div>
        </div>
      </section>

      <section className="about-content" id="about-content">
        <h2 className="section-heading" id="biography-heading">
          BIOGRAFIA
        </h2>
        <div className="bio-text" id="bio-text" ref={bioRef}>
          <p>
            Siberiano es productor, artista y exponente del hip hop emergente en
            Venezuela, con raices profundamente ancladas en La Guaira. En su obra
            aparecen de forma recurrente el Centro Norte, la costa y la identidad
            1162 como coordenadas culturales que atraviesan tanto sus letras como
            su forma de construir atmosfera.
          </p>
          <p>
            Como parte de Aetherium Mob Records, ha empujado una vision independiente
            del rap venezolano que junta crudeza, concepto y estetica. Ese trabajo en
            colectivo dialoga con una idea de retrofuturismo: barras con peso de vieja
            escuela, produccion oscura y una presentacion moderna que no suelta la calle.
          </p>
          <p>
            Su escritura se mueve entre lo introspectivo, lo filosofico y lo contestatario.
            Hay orgullo costero, homenaje a referentes del rap venezolano y tambien una
            mirada frontal sobre el entorno: las fracturas sociales, la memoria de su gente
            y las batallas internas que atraviesan al individuo.
          </p>
          <p>
            <strong>Aetherium Mob y colaboraciones:</strong> Siberiano ha sido una pieza
            importante en lanzamientos como <strong>Retrofuturista</strong> junto a Jigsaw Mc,
            en temas como <strong>Genetica</strong> con Amerika Braun y en procesos creativos que
            lo conectan con nombres como HADES. Ese doble rol de productor y letrista hace
            que su firma se sienta incluso cuando la cancion no depende solo de su voz.
          </p>
          <p>
            <strong>Directo desde el Centro Norte y etapa reciente:</strong> trabajos como
            <strong> Directo desde el Centro Norte</strong>, <strong>Genetica</strong> y
            <strong> Torre de Babel</strong> consolidan una linea artistica cada vez mas clara:
            rap denso, identidad territorial marcada y una busqueda constante por expandir el
            underground guaireno. Su presencia tambien se cruza con el circuito cultural de
            <strong> 1162 Underground</strong>, reforzando su papel dentro de la escena que
            documenta y representa.
          </p>
        </div>
      </section>

      <section className="about-contacts" id="about-contacts">
        <div className="contacts-column" id="personal-contacts">
          <h3 className="contacts-heading">OBRA</h3>
          <div className="contacts-list">
            <Link
              href="/#songs"
              className="contact-link"
              id="contact-songs"
            >
              DISCOGRAFIA
            </Link>
            <Link
              href="/#videos"
              className="contact-link"
              id="contact-videos"
            >
              VISUALES
            </Link>
            <a
              href="https://www.youtube.com/@Siberianolg"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-youtube"
            >
              YOUTUBE
            </a>
          </div>
        </div>
        <div className="contacts-column" id="agency-contacts">
          <h3 className="contacts-heading">ENTORNO</h3>
          <div className="contacts-list">
            <a
              href="https://www.youtube.com/@AetheriumMob"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-aetherium-youtube"
            >
              AETHERIUM MOB
            </a>
            <a
              href="https://www.instagram.com/aetheriummobrecords/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              id="contact-aetherium-instagram"
            >
              AETHERIUM MOB RECORDS
            </a>
            <Link href="/1162-underground" className="contact-link" id="contact-1162-underground">
              1162 UNDERGROUND
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}