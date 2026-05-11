'use client';

import Image from 'next/image';
import Link from 'next/link';
import { hasSiberianoArtistCredit, videos } from '@/app/data/videos';
import { useCarouselScroll } from '@/app/hooks/useCarouselScroll';

export default function VideosSection() {
  const { viewportRef, trackRef, scroll, trackStyle, canScrollLeft, canScrollRight } = useCarouselScroll(videos.length);

  return (
    <section className="videos-section" id="videos">
      <div className="section-header">
        <h2 className="section-title">VIDEOS</h2>
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
          {videos.map((video) => (
            <div key={video.slug} className="carousel-card">
              <div className="carousel-thumbnail">
                {/* YouTube link on thumbnail */}
                {video.youtubeUrl ? (
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carousel-thumb-link carousel-video-thumb-link"
                  >
                    <Image
                      src={video.youtubeThumbnail || video.media[0]}
                      alt={video.fullTitle}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 420px"
                      className="carousel-media"
                    />
                    <div className="carousel-overlay">
                      <span className="carousel-play-icon">▶</span>
                    </div>
                  </a>
                ) : (
                  <div className="carousel-thumb-link carousel-video-thumb-link">
                    <Image
                      src={video.media[0]}
                      alt={video.fullTitle}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 420px"
                      className="carousel-media"
                    />
                  </div>
                )}

                {/* Detail button on hover */}
                <Link
                  href={`/videos/${video.slug}`}
                  className="carousel-detail-btn"
                >
                  DETALLES
                </Link>
              </div>

              <div className="carousel-info">
                <Link href={`/videos/${video.slug}`} className="carousel-title">
                  {video.title}
                </Link>
                <span className="carousel-artist">{video.artist}</span>
                <div className="media-badges-row">
                  <span className="media-badge media-badge-platform">YOUTUBE</span>
                  {!hasSiberianoArtistCredit(video.artist) && (
                    <span className="media-badge media-badge-secondary">PROD</span>
                  )}
                </div>
                <span className="carousel-date">{video.date}</span>
              </div>
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
