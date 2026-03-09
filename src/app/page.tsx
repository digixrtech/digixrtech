import { HeroSection } from '@/components/sections/HeroSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Placeholder sections — will be replaced by real components in later steps */}
      <section
        id="services"
        style={{ minHeight: '50vh', background: 'var(--dark-bg)', padding: '80px 64px' }}
      >
        <div className="section-header">
          <div className="section-label">Our GenAI Services</div>
          <h2 className="section-title">
            Context. Build. Secure. <span className="gradient">Assure.</span>
          </h2>
          <p className="section-subtitle">
            Four stages of the AI agent lifecycle — context first, secure by design, assured at scale.
          </p>
        </div>
      </section>

      <section id="cta" style={{ minHeight: '50vh', background: 'var(--dark-bg)', padding: '80px 64px' }}>
        <div className="section-header">
          <div className="section-label">Challenge Us</div>
          <h2 className="section-title">
            Tell our agent what you&apos;re trying to <span className="gradient">solve.</span>
          </h2>
          <p className="section-subtitle">
            Tell us what you&apos;re solving — our agent will map it to an architecture before you finish your coffee.
          </p>
        </div>
      </section>
    </>
  );
}
