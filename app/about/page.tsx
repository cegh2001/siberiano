import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About — Siberiano',
  description: 'Biografia, catalogo y ecosistema creativo de Siberiano en La Guaira.',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutContent />
    </div>
  );
}