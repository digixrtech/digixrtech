export default function HomePage() {
  return (
    <>
      {/* Section components will be added here in build steps 2-7 */}
      <section
        id="heroSection"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '80px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 600 }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 16 }}>
            Empowering Businesses with{' '}
            <span className="gradient">AI Powered Innovation</span>
          </h1>
          <p style={{ fontSize: 18, color: '#718096', lineHeight: 1.6 }}>
            Agentic AI Services &middot; ERP Services &middot; Next-gen App Services
          </p>
        </div>
      </section>

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
