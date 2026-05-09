export interface VideoData {
  slug: string;
  title: string;
  artist: string;
  fullTitle: string;
  date: string;
  dateISO: string;
  youtubeId: string;
  youtubeUrl: string;
  youtubeThumbnail: string;
  media: string[];
  description?: string;
}

export function hasSiberianoArtistCredit(artist: string): boolean {
  return artist.toLowerCase().includes('siberiano');
}

export const videos: VideoData[] = [
  {
    slug: 'ego-hades',
    title: 'EGO',
    artist: 'HADES',
    fullTitle: 'EGO — HADES',
    date: '8 de abril de 2026',
    dateISO: '2026-04-08',
    youtubeId: 'VotoQTOwvcM',
    youtubeUrl: 'https://www.youtube.com/watch?v=VotoQTOwvcM',
    youtubeThumbnail: 'https://img.youtube.com/vi/VotoQTOwvcM/maxresdefault.jpg',
    media: ['/VIDEOS/EGO.png', '/VIDEOS/EGO(1).png', '/VIDEOS/EGO(2).png'],
  },
  {
    slug: 'proverbios-jigsaw-mc',
    title: 'PROVERBIOS',
    artist: 'JIGSAW MC',
    fullTitle: 'PROVERBIOS — JIGSAW MC',
    date: '20 de marzo de 2026',
    dateISO: '2026-03-20',
    youtubeId: 'vJKHfgiKfuc',
    youtubeUrl: 'https://www.youtube.com/watch?v=vJKHfgiKfuc',
    youtubeThumbnail: 'https://img.youtube.com/vi/vJKHfgiKfuc/maxresdefault.jpg',
    media: ['/VIDEOS/PROVERBIOS.png', '/VIDEOS/PROVERBIOS(1).png'],
  },
  {
    slug: 'genetica-siberiano-ft-amerika',
    title: 'GENÉTICA',
    artist: 'SIBERIANO ft. AMERIKA',
    fullTitle: 'GENÉTICA — SIBERIANO ft. AMERIKA',
    date: '24 de septiembre de 2025',
    dateISO: '2025-09-24',
    youtubeId: 'GPIYwElmEk0',
    youtubeUrl: 'https://www.youtube.com/watch?v=GPIYwElmEk0',
    youtubeThumbnail: 'https://img.youtube.com/vi/GPIYwElmEk0/maxresdefault.jpg',
    media: ['/VIDEOS/GENETICA.png', '/VIDEOS/GENETICA(1).png', '/VIDEOS/GENETICA(2).png'],
  },
  {
    slug: 'la-guaira-aetherium-mob',
    title: 'LA GUAIRA',
    artist: 'AETHERIUM MOB (ft. T\'CHALLA, BOIKI, 187, HADES, RAMÉ, ROTWAILA, CHESTER, DELLAHWAIRA)',
    fullTitle: 'LA GUAIRA — AETHERIUM MOB',
    date: '15 de diciembre de 2024',
    dateISO: '2024-12-15',
    youtubeId: 'kRwblEtEm2M',
    youtubeUrl: 'https://www.youtube.com/watch?v=kRwblEtEm2M',
    youtubeThumbnail: 'https://img.youtube.com/vi/kRwblEtEm2M/maxresdefault.jpg',
    media: [
      '/VIDEOS/GUAIRA.png', '/VIDEOS/GUAIRA(1).png', '/VIDEOS/GUAIRA(2).png',
      '/VIDEOS/GUAIRA(3).png', '/VIDEOS/GUAIRA(4).png', '/VIDEOS/GUAIRA(5).png',
      '/VIDEOS/GUAIRA(6).png', '/VIDEOS/GUAIRA(7).png', '/VIDEOS/GUAIRA(8).png',
      '/VIDEOS/GUAIRA(9).png', '/VIDEOS/GUAIRA(10).png',
    ],
  },
  {
    slug: 'we-tha-mob-aetherium-mob',
    title: 'WE THA MOB',
    artist: 'AETHERIUM MOB',
    fullTitle: 'WE THA MOB — AETHERIUM MOB',
    date: '16 de noviembre de 2024',
    dateISO: '2024-11-16',
    youtubeId: 'gUnpCep8UMU',
    youtubeUrl: 'https://www.youtube.com/watch?v=gUnpCep8UMU',
    youtubeThumbnail: 'https://img.youtube.com/vi/gUnpCep8UMU/maxresdefault.jpg',
    media: [
      '/VIDEOS/WE THA MOB.png', '/VIDEOS/WE THA MOB(1).png',
      '/VIDEOS/WE THA MOB(2).png', '/VIDEOS/WE THA MOB(3).png',
      '/VIDEOS/WE THA MOB(4).png',
    ],
  },
  {
    slug: 'conflicto-aetherium-mob',
    title: 'CONFLICTO',
    artist: 'AETHERIUM MOB',
    fullTitle: 'CONFLICTO — AETHERIUM MOB (Visualizer)',
    date: '19 de julio de 2024',
    dateISO: '2024-07-19',
    youtubeId: 'fORYQ1mFUyk',
    youtubeUrl: 'https://www.youtube.com/watch?v=fORYQ1mFUyk',
    youtubeThumbnail: 'https://img.youtube.com/vi/fORYQ1mFUyk/maxresdefault.jpg',
    media: ['/VIDEOS/CONFLICTO.png'],
  },
  {
    slug: 'retrofuturista-aetherium-mob',
    title: 'RETROFUTURISTA',
    artist: 'AETHERIUM MOB (Siberiano & Jigsaw Mc)',
    fullTitle: 'RETROFUTURISTA — AETHERIUM MOB (Visualizer)',
    date: 'Marzo de 2024',
    dateISO: '2024-03-08',
    youtubeId: 'r4sOF8kHbHE',
    youtubeUrl: 'https://www.youtube.com/watch?v=r4sOF8kHbHE',
    youtubeThumbnail: 'https://img.youtube.com/vi/r4sOF8kHbHE/maxresdefault.jpg',
    media: ['/VIDEOS/RETROFUTURISTA.png'],
  },
];

export function getVideoBySlug(slug: string): VideoData | undefined {
  return videos.find((v) => v.slug === slug);
}
