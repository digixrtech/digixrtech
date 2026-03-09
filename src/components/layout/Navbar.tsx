'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;

    const LIGHT = { r: 250, g: 252, b: 253 };
    const DARK = { r: 10, g: 10, b: 18 };

    let rafId: number;

    function updateScroll() {
      const heroSection = document.getElementById('heroSection');
      if (!heroSection || !navbar) {
        rafId = requestAnimationFrame(updateScroll);
        return;
      }

      const heroRect = heroSection.getBoundingClientRect();
      const heroH = heroRect.height;
      const scrolled = Math.max(0, -heroRect.top);
      const rawProgress = Math.min(1, scrolled / heroH);
      const eased = rawProgress * rawProgress;

      const bgR = lerp(LIGHT.r, DARK.r, eased);
      const bgG = lerp(LIGHT.g, DARK.g, eased);
      const bgB = lerp(LIGHT.b, DARK.b, eased);
      const na = 0.88 + eased * 0.04;

      navbar.style.background = `rgba(${bgR},${bgG},${bgB},${na})`;

      if (eased < 0.33) {
        navbar.style.borderBottomColor = `rgba(226,232,240,${Math.max(0, 0.6 * (1 - eased * 3))})`;
      } else {
        navbar.style.borderBottomColor = `rgba(255,255,255,${Math.min(0.06, (eased - 0.3) * 0.09)})`;
      }

      const links = navbar.querySelectorAll<HTMLAnchorElement>('.nav-links a:not(.nav-cta)');
      links.forEach((link) => {
        link.style.color = `rgba(${lerp(74, 255, eased)},${lerp(85, 255, eased)},${lerp(104, 255, eased)},${eased > 0.5 ? 0.6 : 0.55 + eased * 0.1})`;
      });

      rafId = requestAnimationFrame(updateScroll);
    }

    rafId = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const scrollToCta = () => {
    document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar" id="navbar" ref={navRef}>
      <Link href="/" className="logo-wrap" style={{ textDecoration: 'none' }}>
        <Image
          src="/images/logo/logo-symbol-dark.png"
          alt="Digixr"
          className="logo-icon"
          width={40}
          height={40}
        />
        <div>
          <div className="logo-text">DIGIXR</div>
          <div className="logo-sub">TECHNOLOGIES</div>
        </div>
      </Link>
      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#clients">Clients</a></li>
        <li><a href="#blueprints">Blueprints</a></li>
        <li><a href="#insights">Insights</a></li>
        <li><a href="#purpose">Purpose</a></li>
        <li>
          <a
            href="#cta"
            className="nav-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToCta();
            }}
          >
            Challenge Us
          </a>
        </li>
      </ul>
    </nav>
  );
}
