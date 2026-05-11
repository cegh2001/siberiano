import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-primary',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SIBERIANO',
  description: 'Sitio oficial de SIBERIANO, productor y artista.',
  applicationName: 'SIBERIANO',
  creator: 'Carlos Gonzalez',
  publisher: 'SIBERIANO',
  icons: {
    icon: '/SIBERIANO-FAVICON.png',
    shortcut: '/SIBERIANO-FAVICON.png',
    apple: '/SIBERIANO-FAVICON.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`} data-scroll-behavior="smooth">
      <body>
        <CursorGlow />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}