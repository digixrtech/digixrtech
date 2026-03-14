'use client';

import { useEffect, useRef } from 'react';
import { initAgentNetwork } from '@/lib/canvas/agent-network';
import { initScrollTransition } from '@/lib/scroll-transition';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanupCanvas = initAgentNetwork(canvas);
    const cleanupScroll = initScrollTransition();
    return () => {
      cleanupCanvas();
      cleanupScroll();
    };
  }, []);

  return (
    <section className="hero" id="heroSection">
      <canvas id="heroCanvas" ref={canvasRef} />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          Context → Build → Secure → Assure
        </div>
        <h1 className="hero-headline">
          AI should be a{' '}
          <span className="gradient">transformative, healing force</span>
          {' '}— equitable to all.
        </h1>
        <p className="hero-sub">
          We engineer agents that are context-rich, secure by design, fair by
          default, and continuously assured — so you can deploy AI with
          confidence.
        </p>
        <div className="hero-ctas">
          <button
            className="btn-primary"
            onClick={() =>
              document
                .getElementById('cta')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Challenge Us →
          </button>
          <button
            className="btn-secondary"
            onClick={() =>
              document
                .getElementById('blueprints')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            See It In Action
          </button>
        </div>
      </div>
    </section>
  );
}
