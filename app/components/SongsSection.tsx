'use client';

import { hasSiberianoArtistCredit, publishedSongs } from '@/app/data/songs';
import { useCarouselScroll } from '@/app/hooks/useCarouselScroll';

export default function SongsSection() {
  const { viewportRef, trackRef, scroll, trackStyle, canScrollLeft, canScrollRight } = useCarouselScroll(publishedSongs.length);

  return (
    <section className="songs-section" id="canciones">
      <div className="section-header">
        <h2 className="section-title">CANCIONES</h2>
      </div>

      <div className="carousel-wrapper">
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => scroll('left')}
          aria-label="Anterior"
          disabled={!canScrollLeft}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="carousel-viewport" ref={viewportRef}>
          <div className="carousel-track" ref={trackRef} style={trackStyle}>
          {publishedSongs.map((song) => (
            <div key={song.slug} className="carousel-card song-carousel-card">
              {(() => {
                const showProdBadge = !hasSiberianoArtistCredit(song.artist);

                return (
                  <>
              {song.url ? (
                <a
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="carousel-thumb-link song-thumb-link"
                >
                  <div className="carousel-thumbnail song-thumbnail">
                    <img
                      src={song.albumCover}
                      alt={`${song.title} — ${song.artist}`}
                      loading="lazy"
                    />
                    <div className="carousel-overlay">
                      <span className="carousel-play-icon">▶</span>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="carousel-thumb-link song-thumb-link">
                  <div className="carousel-thumbnail song-thumbnail">
                    <img
                      src={song.albumCover}
                      alt={`${song.title} — ${song.artist}`}
                      loading="lazy"
                    />
                    <span className="song-platform-badge song-platform-pending">
                      PRÓXIMAMENTE
                    </span>
                  </div>
                </div>
              )}

              <div className="carousel-info">
                <span className="carousel-title">{song.title}</span>
                <span className="carousel-artist">{song.artist}</span>
                <div className="media-badges-row">
                  <span className="media-badge media-badge-platform">
                    {song.platform === 'spotify' ? 'SPOTIFY' : 'YOUTUBE'}
                  </span>
                  {showProdBadge && <span className="media-badge media-badge-secondary">PROD</span>}
                </div>
                <span className="carousel-date">{song.date}</span>
              </div>
                  </>
                );
              })()}
            </div>
          ))}
          </div>
        </div>

        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll('right')}
          aria-label="Siguiente"
          disabled={!canScrollRight}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
