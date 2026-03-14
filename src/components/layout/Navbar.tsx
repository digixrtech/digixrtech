'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const sectionLink = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  const scrollToCta = () => {
    if (isHome) {
      document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#cta';
    }
  };

  return (
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
        <li><a href={sectionLink('services')}>Services</a></li>
        <li><a href={sectionLink('clients')}>Clients</a></li>
        <li><a href={sectionLink('blueprints')}>Blueprints</a></li>
        <li><a href={sectionLink('insights')}>Insights</a></li>
        <li><a href={sectionLink('purpose')}>Purpose</a></li>
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
    </nav>
  );
}
