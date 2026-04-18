import { homeHighlights, metrics } from '../content';

function HomePage({ navigateTo }) {
  return (
    <section className="page page-home">
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="section-tag">Home</p>
          <h1 className="hero-title">A cleaner front door for agricultural trade operations.</h1>
          <p className="hero-text">
            AgriChain gives your project a professional starting point for verified onboarding,
            marketplace visibility, and coordinated support workflows.
          </p>

          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => navigateTo('login')}>
              Login
            </button>
            <button type="button" className="secondary-button" onClick={() => navigateTo('about')}>
              View platform
            </button>
          </div>
        </div>

        <aside className="hero-note">
          <p className="section-tag">Platform focus</p>
          <h2>Designed for clarity</h2>
          <p>
            The homepage now stays intentionally compact and directs users into dedicated screens
            for each major module.
          </p>
        </aside>
      </div>

      <section className="metrics-strip" aria-label="Platform metrics">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="preview-section">
        <div className="section-heading">
          <p className="section-tag">Modules</p>
          <h2>Each product area now has its own page.</h2>
        </div>

        <div className="card-grid">
          {homeHighlights.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button
                type="button"
                className="inline-link"
                onClick={() => navigateTo(item.page)}
              >
                Open page
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default HomePage;
