'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  const sectionLink = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  const scrollToCta = () => {
    if (isHome) {
      document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#cta';
    }
  };

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Services', hash: 'services' },
    { label: 'Clients', hash: 'clients' },
    { label: 'Blueprints', hash: 'blueprints' },
    { label: 'Insights', hash: 'insights' },
    { label: 'Purpose', hash: 'purpose' },
  ];

  return (
    <>
      <nav className="navbar" id="navbar">
        <a
          href="/"
          className="logo-wrap"
          style={{ textDecoration: 'none' }}
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
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
        </a>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.hash}><a href={sectionLink(item.hash)}>{item.label}</a></li>
          ))}
          <li>
            <a
              href={sectionLink('cta')}
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
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`hamburger-icon ${mobileOpen ? 'open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={closeMobile}
      >
        <div className="mobile-nav-menu" onClick={(e) => e.stopPropagation()}>
          <ul className="mobile-nav-links">
            {navItems.map((item) => (
              <li key={item.hash}>
                <a href={sectionLink(item.hash)} onClick={closeMobile}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={sectionLink('cta')}
                className="nav-cta"
                onClick={(e) => {
                  e.preventDefault();
                  closeMobile();
                  scrollToCta();
                }}
              >
                Challenge Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
