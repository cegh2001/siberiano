'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { hasSiberianoArtistCredit, videos } from '@/app/data/videos';

export default function VideosSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

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
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="carousel-track" ref={scrollRef}>
          {videos.map((video) => (
            <div key={video.slug} className="carousel-card">
              <div className="carousel-thumbnail">
                {/* YouTube link on thumbnail */}
                {video.youtubeUrl ? (
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carousel-thumb-link"
                  >
                    <img
                      src={video.youtubeThumbnail || video.media[0]}
                      alt={video.fullTitle}
                      loading="lazy"
                    />
                    <div className="carousel-overlay">
                      <span className="carousel-play-icon">▶</span>
                    </div>
                  </a>
                ) : (
                  <div className="carousel-thumb-link">
                    <img
                      src={video.media[0]}
                      alt={video.fullTitle}
                      loading="lazy"
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

        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => scroll('right')}
          aria-label="Siguiente"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
