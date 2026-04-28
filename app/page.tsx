import HeroSection from './components/HeroSection';

const songs = [
  {
    id: 'song-1',
    title: 'First Track',
    cover: 'https://placehold.co/500x500/111/e84b1c?text=TRACK',
    audioSrc: '#',
  },
  {
    id: 'song-2',
    title: 'Second Track',
    cover: 'https://placehold.co/500x500/111/e84b1c?text=TRACK',
    audioSrc: '#',
  },
  {
    id: 'song-3',
    title: 'Third Track',
    cover: 'https://placehold.co/500x500/111/e84b1c?text=TRACK',
    audioSrc: '#',
  },
  {
    id: 'song-4',
    title: 'Fourth Track',
    cover: 'https://placehold.co/500x500/111/e84b1c?text=TRACK',
    audioSrc: '#',
  },
] as const;

const videos = [
  {
    id: 'video-1',
    title: 'First Video',
    thumbnail: 'https://placehold.co/600x400/111/e84b1c?text=VIDEO',
    videoSrc: '#',
    gifPreview: 'https://placehold.co/600x400/111/e84b1c?text=VIDEO',
  },
  {
    id: 'video-2',
    title: 'Second Video',
    thumbnail: 'https://placehold.co/600x400/111/e84b1c?text=VIDEO',
    videoSrc: '#',
    gifPreview: 'https://placehold.co/600x400/111/e84b1c?text=VIDEO',
  },
  {
    id: 'video-3',
    title: 'Third Video',
    thumbnail: 'https://placehold.co/600x400/111/e84b1c?text=VIDEO',
    videoSrc: '#',
    gifPreview: 'https://placehold.co/600x400/111/e84b1c?text=VIDEO',
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

      <section className="videos-section" id="videos">
        <div className="section-header">
          <h2 className="section-title">VIDEOS</h2>
        </div>
        <div className="videos-grid" id="videos-grid">
          {videos.map((video) => (
            <a key={video.id} href={video.videoSrc} className="video-card" id={video.id}>
              <div className="video-thumbnail">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  style={{ objectFit: 'cover' }}
                />
                <div className="video-preview-gif" style={{
                  backgroundImage: `url('${video.gifPreview}')`
                }}></div>
                <div className="video-overlay">
                  <span className="play-button">▶</span>
                </div>
              </div>
              <h3 className="video-title">{video.title}</h3>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
