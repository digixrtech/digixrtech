'use client';

import { useRef, useEffect } from 'react';
import { initElixirAnimation } from '@/lib/canvas/elixir-animation';

const BELIEFS = [
  {
    key: 'vision',
    label: 'Our Vision',
    headline: (
      <>
        A <span className="belief-highlight">Digital Elixir</span> for all.
      </>
    ),
    text: (
      <>
        We envision a world where AI solves humanity&apos;s open challenges — not just the
        profitable ones. From transforming how businesses operate in the new AI era to ensuring
        that <span className="belief-highlight">the impact of AI is equitable to all</span> — not
        exclusive to a privileged few.
      </>
    ),
  },
  {
    key: 'mission',
    label: 'Our Mission',
    headline: 'Build safe. Build trusted. Build right.',
    text: (
      <>
        Every agent we ship goes through Context, Build, Secure, and Assure — because cutting
        corners on AI isn&apos;t just bad engineering, it&apos;s irresponsible. We build safe,
        trusted AI with <span className="belief-highlight">engineering excellence</span> at every
        stage.
      </>
    ),
  },
  {
    key: 'intent',
    label: 'Our Intent',
    headline: 'Why we started Digixr.',
    text: (
      <>
        AI as a healing, transformative force. We exist to solve humanity&apos;s open challenges
        and ensure the benefits of AI reach everyone. Wherever there&apos;s a problem worth
        solving, we want AI there — built right, and{' '}
        <span className="belief-highlight">accessible to all.</span>
      </>
    ),
  },
] as const;

export function PurposeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const cleanup = initElixirAnimation(canvasRef.current);
    return cleanup;
  }, []);

  return (
    <section className="belief-section" id="purpose">
      <div className="section-header reveal">
        <div className="section-label">Our Purpose</div>
        <h2 className="section-title">
          Digixr.{' '}
          <span className="gradient">
            <em>Digital Elixir.</em>
          </span>
        </h2>
        <p className="section-subtitle">
          We believe AI should be a transformative, healing force — built right, and equitable to
          all.
        </p>
      </div>

      <div className="purpose-layout">
        {/* Left: Elixir Core Canvas */}
        <div className="elixir-visual reveal">
          <canvas ref={canvasRef} className="elixir-canvas" />
          <div className="elixir-quote">
            AI must be a transformative, healing force, <em>equitable to all.</em>
          </div>
        </div>

        {/* Right: Vision / Mission / Intent */}
        <div className="belief-blocks">
          {BELIEFS.map((belief) => (
            <div key={belief.key} className="belief-block reveal" data-belief={belief.key}>
              <span className="belief-label">{belief.label}</span>
              <p className="belief-text belief-headline">{belief.headline}</p>
              <p className="belief-text">{belief.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
