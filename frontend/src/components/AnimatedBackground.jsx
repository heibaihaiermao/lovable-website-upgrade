import React, { useEffect } from 'react';
import { startParticles } from './blob';

export default function AnimatedBackground() {
  useEffect(() => {
    const canvas = document.getElementById('blob-canvas');
    if (!canvas) return;

    // 1) Size the canvas to fill the viewport
    function updateSize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    updateSize();

    // 2) Start the blob animation now that canvas is sized
    startParticles(canvas);

    // 3) Keep the canvas resized on window changes
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <canvas
      id="blob-canvas"
      className="fixed inset-0 z-10 pointer-events-none"
      style={{ mixBlendMode: 'overlay' }}
    />
  );
}
