'use client';

import { useState } from 'react';
import Link from 'next/link';
import { hasSiberianoArtistCredit, type VideoData } from '@/app/data/videos';

export default function VideoDetailClient({ video }: { video: VideoData }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <main className="video-detail" id="video-detail">
      {/* Hero video area */}
      <section className="video-hero" id="video-hero">
        <div className="video-hero-container">
          <div className="video-thumbnail-large">
            {showVideo && video.youtubeId ? (
              <iframe
                className="video-embed"
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.fullTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={video.youtubeThumbnail || video.media[0]}
                  alt={video.fullTitle}
                  className="video-poster"
                />
                {video.youtubeUrl && (
                  <div className="video-play-overlay">
                    <button
                      className="video-play-btn"
                      onClick={() => setShowVideo(true)}
                      aria-label={`Reproducir ${video.fullTitle}`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section className="video-info-bar" id="video-info-bar">
        <div className="video-info-bar-content">
          <div className="video-info-title-block">
            <h1 className="video-info-title">{video.fullTitle}</h1>
            <span className="video-info-date">{video.date}</span>
          </div>
          <div className="video-info-actions">
            {video.youtubeUrl && (
              <div className="video-action-badges">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-action-link"
                >
                  YOUTUBE ↗
                </a>
                {!hasSiberianoArtistCredit(video.artist) && (
                  <span className="media-badge media-badge-secondary">PROD</span>
                )}
              </div>
            )}
            <Link href="/#videos" className="video-action-link">
              VOLVER
            </Link>
          </div>
        </div>
      </section>

      {/* Credits / Description */}
      <section className="video-credits" id="video-credits">
        <div className="video-credits-grid">
          <div className="video-credits-col">
            <h3 className="video-credits-heading">DETALLES</h3>
            <div className="video-credits-body">
              <p>
                <strong>Artista:</strong> {video.artist}
              </p>
              <p>
                <strong>Fecha de publicación:</strong> {video.date}
              </p>
              {video.youtubeUrl ? (
                <p>
                  <strong>YouTube:</strong>{' '}
                  <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-link">
                    Ver en YouTube ↗
                  </a>
                </p>
              ) : (
                <p>
                  <strong>Plataformas:</strong> Próximamente
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Behind the scenes / Gallery */}
      {video.media.length > 1 && (
        <section className="video-gallery" id="video-gallery">
          <h2 className="video-gallery-heading">BEHIND THE SCENES</h2>
          <div className="video-gallery-grid">
            {video.media.map((src, i) => (
              <div key={i} className="video-gallery-item">
                <img src={src} alt={`${video.title} — ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="video-back-bottom">
        <Link href="/#videos" className="video-back-link">
          ← VOLVER A VIDEOS
        </Link>
      </div>
    </main>
  );
}
