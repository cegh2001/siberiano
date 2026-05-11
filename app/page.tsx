import type { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import SongsSection from './components/SongsSection';
import VideosSection from './components/VideosSection';

export const metadata: Metadata = {
  title: 'SIBERIANO | Productor/Artista',
  description: 'Sitio oficial de SIBERIANO con música, videos y proyectos visuales.',
  keywords: ['SIBERIANO', 'Carlos Gonzalez', 'música', 'videos', 'productor', 'artista'],
  authors: [{ name: 'Carlos Gonzalez' }],
  openGraph: {
    title: 'SIBERIANO | Productor/Artista',
    description: 'Sitio oficial de SIBERIANO con música, videos y proyectos visuales.',
    siteName: 'SIBERIANO',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'SIBERIANO | Productor/Artista',
    description: 'Sitio oficial de SIBERIANO con música, videos y proyectos visuales.',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <SongsSection />
      <VideosSection />
    </>
  );
}
