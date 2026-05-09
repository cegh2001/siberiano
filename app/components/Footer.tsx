'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-brand" id="footer-brand" aria-label="Siberiano">
        <span className="footer-brand-mark">
          <Image
            src="/SIBERIANO.png"
            alt=""
            fill
            sizes="(max-width: 600px) 140px, 180px"
            style={{ objectFit: 'contain' }}
          />
        </span>
      </div>
      <div className="footer-credit" id="footer-credit">
        diseñado por Carlos Gonzalez &mdash; cargonzalez0601@gmail.com
      </div>
    </footer>
  );
}