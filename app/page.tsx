import HeroSection from './components/HeroSection';
import VideosSection from './components/VideosSection';

const songs = [
  {
    id: 'song-1',
    title: 'First Track',
    cover: 'https://placehold.co/500x500/111/ffd500?text=TRACK',
    audioSrc: '#',
  },
  {
    id: 'song-2',
    title: 'Second Track',
    cover: 'https://placehold.co/500x500/111/ffd500?text=TRACK',
    audioSrc: '#',
  },
  {
    id: 'song-3',
    title: 'Third Track',
    cover: 'https://placehold.co/500x500/111/ffd500?text=TRACK',
    audioSrc: '#',
  },
  {
    id: 'song-4',
    title: 'Fourth Track',
    cover: 'https://placehold.co/500x500/111/ffd500?text=TRACK',
    audioSrc: '#',
  },
] as const;

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="songs-section" id="canciones">
        <div className="section-header">
          <h2 className="section-title">CANCIONES</h2>
        </div>
        <div className="songs-grid" id="songs-grid">
          {songs.map((song) => (
            <div key={song.id} className="song-card" id={song.id}>
              <a href={song.audioSrc} className="song-cover">
                <img 
                  src={song.cover} 
                  alt={song.title}
                  style={{ objectFit: 'cover' }}
                />
                <div className="song-overlay">
                  <span className="play-icon">▶</span>
                </div>
              </a>
              <h3 className="song-title">{song.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <VideosSection />
    </>
  );
}
