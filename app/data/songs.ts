export interface SongData {
  slug: string;
  title: string;
  artist: string;
  albumCover: string;
  date: string;
  dateISO: string;
  platform: 'youtube' | 'spotify';
  url: string;
  youtubeId?: string;
  published: boolean;
}

export function hasSiberianoArtistCredit(artist: string): boolean {
  return artist.toLowerCase().includes('siberiano');
}

function compareByDateDesc(a: { dateISO: string }, b: { dateISO: string }) {
  return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
}

export const songs: SongData[] = [
  {
    slug: 'retrofuturista',
    title: 'RETROFUTURISTA',
    artist: 'AETHERIUM MOB (Siberiano & Jigsaw Mc)',
    albumCover: '/ALBUM-COVER/AETHEIRUM MOB - RETROFUTURISTA.png',
    date: '8 de marzo de 2024',
    dateISO: '2024-03-08',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=r4sOF8kHbHE',
    youtubeId: 'r4sOF8kHbHE',
    published: true,
  },
  {
    slug: 'conflicto',
    title: 'CONFLICTO',
    artist: 'AETHERIUM MOB',
    albumCover: '/ALBUM-COVER/AETHERIUM MOB - CONFLICTO.png',
    date: '19 de julio de 2024',
    dateISO: '2024-07-19',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/7hHGEHt9fx8OYiKswJZmNP?si=1b331589c2bb4961',
    published: true,
  },
  {
    slug: 'horizonte',
    title: 'HORIZONTE',
    artist: 'AETHERIUM MOB',
    albumCover: '/ALBUM-COVER/AETHERIUM MOB - HORIZONTE.png',
    date: '23 de agosto de 2024',
    dateISO: '2024-08-23',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/23FEyTW1jGNz2NutqzwLz5?si=340f7db4bf234958',
    published: true,
  },
  {
    slug: 'despierta',
    title: 'DESPIERTA',
    artist: 'AETHERIUM MOB',
    albumCover: '/ALBUM-COVER/AETHERIUM MOB - DESPIERTA.png',
    date: '31 de mayo de 2024',
    dateISO: '2024-05-31',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/73q4HjeFOFLMmxmpxPqJtR?si=ab5197f70a0147ed',
    published: true,
  },
  {
    slug: 'we-tha-mob-song',
    title: 'WE THA MOB',
    artist: 'AETHERIUM MOB',
    albumCover: '/ALBUM-COVER/AETHERIUM MOB - WE THA MOB.png',
    date: '16 de noviembre de 2024',
    dateISO: '2024-11-16',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/album/37OpBNrj0Aq2n5tNIT6ONi',
    published: true,
  },
  {
    slug: 'ego-hades-song',
    title: 'EGO',
    artist: 'HADES',
    albumCover: '/ALBUM-COVER/EGO - HADES.png',
    date: '8 de abril de 2026',
    dateISO: '2026-04-08',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/4AhAXw5Fsxh9wvaV0DJGgy?si=b76babb02f9c49fa',
    published: true,
  },
  {
    slug: 'guaira-song',
    title: 'LA GUAIRA',
    artist: 'AETHERIUM MOB',
    albumCover: '/ALBUM-COVER/GUAIRA - AETHERIUM MOB.png',
    date: '15 de diciembre de 2024',
    dateISO: '2024-12-15',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/244AAhBmjwM6GgGsmyO872?si=302b18e7bda94ba6',
    published: true,
  },
  {
    slug: 'proverbios-song',
    title: 'PROVERBIOS',
    artist: 'JIGSAW MC',
    albumCover: '/ALBUM-COVER/JIGSAW MC - PROVERBIOS.png',
    date: '20 de marzo de 2026',
    dateISO: '2026-03-20',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/0sJYzrKECH3QjGsyOPu28A?si=fd240674b0fc4bb3',
    published: true,
  },
  {
    slug: 'directo-desde-el-centro-norte',
    title: 'DIRECTO DESDE EL CENTRO NORTE',
    artist: 'SIBERIANO',
    albumCover: '/ALBUM-COVER/SIBERIANO - DIRECTO DESDE EL CENTRO NORTE.png',
    date: '27 de noviembre de 2025',
    dateISO: '2025-11-27',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=cSY2yt5PbqM',
    youtubeId: 'cSY2yt5PbqM',
    published: true,
  },
  {
    slug: 'genetica-song',
    title: 'GENÉTICA',
    artist: 'SIBERIANO ft. AMERIKA',
    albumCover: '/ALBUM-COVER/SIBERIANO - GENETICA.png',
    date: '24 de septiembre de 2025',
    dateISO: '2025-09-24',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/17ZcUlVHSmRrnkAyxPKbsU?si=a6812dfde8b04306',
    published: true,
  },
  {
    slug: 'torre-de-babel',
    title: 'TORRE DE BABEL',
    artist: 'SIBERIANO',
    albumCover: '/ALBUM-COVER/SIBERIANO - TORRE DE BABEL.png',
    date: '24 de abril de 2026',
    dateISO: '2026-04-24',
    platform: 'spotify',
    url: 'https://open.spotify.com/intl-es/track/4y1M1QbfEYB6ezvDMKRdaW?si=f434bc634c5e48f8',
    published: true,
  },
  /* === Covers sin enlace (pendientes) === */
  {
    slug: 'beck-annie',
    title: 'ANNIE',
    artist: 'BECK',
    albumCover: '/ALBUM-COVER/BECK - ANNIE.jpg',
    date: '',
    dateISO: '',
    platform: 'spotify',
    url: '',
    published: false,
  },
  {
    slug: 'eclipse',
    title: 'ECLIPSE',
    artist: 'BM Y LENCIA',
    albumCover: '/ALBUM-COVER/BM Y LENCIA - ECLIPSE.jpg',
    date: '',
    dateISO: '',
    platform: 'spotify',
    url: '',
    published: false,
  },
  {
    slug: 'the-mashup-tree',
    title: 'THE MASHUP TREE',
    artist: 'C4 VS ANST',
    albumCover: '/ALBUM-COVER/C4 VS ANST_ THE MASHUP TREE.png',
    date: '',
    dateISO: '',
    platform: 'youtube',
    url: '',
    published: false,
  },
  {
    slug: 'the-mashup-2',
    title: 'THE MASHUP',
    artist: 'C4 VS ZWART',
    albumCover: '/ALBUM-COVER/C4 VS ZWART_ THE MASHUP.jpg',
    date: '',
    dateISO: '',
    platform: 'youtube',
    url: '',
    published: false,
  },
  {
    slug: 'genesis-unochosiete',
    title: 'GENESIS',
    artist: 'UNOCHOSIETE',
    albumCover: '/ALBUM-COVER/GENESIS - UNOCHOSIETE.png',
    date: '',
    dateISO: '',
    platform: 'spotify',
    url: '',
    published: false,
  },
  {
    slug: 'nft',
    title: 'NFT',
    artist: 'ICY MONTANA, LORD VIE, POST LOVE',
    albumCover: '/ALBUM-COVER/ICY MONTANA, LORD VIE, POST LOVE - NFT.jpg',
    date: '',
    dateISO: '',
    platform: 'spotify',
    url: '',
    published: false,
  },
  {
    slug: 'prieto-gang-drill',
    title: 'DRILL',
    artist: 'PRIETO GANG',
    albumCover: '/ALBUM-COVER/PRIETO GANG - DRILL.png',
    date: '',
    dateISO: '',
    platform: 'youtube',
    url: '',
    published: false,
  },
  {
    slug: 'the-mashup-too',
    title: 'THE MASHUP TOO',
    artist: 'C4 VS DARKO',
    albumCover: '/ALBUM-COVER/THE MASHUP TOO_ C4 VS DARKO.jpg',
    date: '',
    dateISO: '',
    platform: 'youtube',
    url: '',
    published: false,
  },
];

const publishedSongsBase = songs.filter((song) => song.published);

export const siberianoSongs = publishedSongsBase
  .filter((song) => hasSiberianoArtistCredit(song.artist))
  .sort(compareByDateDesc);

export const otherPublishedSongs = publishedSongsBase
  .filter((song) => !hasSiberianoArtistCredit(song.artist))
  .sort(compareByDateDesc);

export const publishedSongs = [...siberianoSongs, ...otherPublishedSongs];
