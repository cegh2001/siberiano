'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let animationId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = glowX + 'px';
        glowRef.current.style.top = glowY + 'px';
      }
      animationId = requestAnimationFrame(animateGlow);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateGlow();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} />;
}
