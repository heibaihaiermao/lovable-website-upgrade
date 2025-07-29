// src/particles.js

export function startParticles(canvas) {
  const ctx = canvas.getContext('2d');
  const W   = () => canvas.width;
  const H   = () => canvas.height;

  // 1) Particle definition
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x     = Math.random() * W();
      this.y     = Math.random() * H();
      this.r     = 3 + Math.random() * 5;      // radius 3–8px
      this.vx    = (Math.random() - 0.5) * 0.2; // very slow horizontal drift
      this.vy    = (Math.random() - 0.5) * 0.2; // very slow vertical drift
      this.alpha = 0.1 + Math.random() * 0.2;  // opacity 0.1–0.3
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // wrap around
      if (this.x < 0)   this.x = W();
      if (this.x > W()) this.x = 0;
      if (this.y < 0)   this.y = H();
      if (this.y > H()) this.y = 0;
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
      ctx.fill();
    }
  }

  // 2) Setup
  const particles = Array.from({ length: 50 }, () => new Particle());

  // 3) Resize handler
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // 4) Animation loop
  function animate() {
    ctx.clearRect(0, 0, W(), H());
    for (const p of particles) {
      p.update();
      p.draw(ctx);
    }
    requestAnimationFrame(animate);
  }
  animate();
}
