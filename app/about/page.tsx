import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About — Carlos Gonzalez',
  description: 'Music Producer — Biography and Contact',
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutContent />
    </div>
  );
}