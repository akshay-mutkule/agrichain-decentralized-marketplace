import { platformHighlights } from '../content';

function AboutPage() {
  return (
    <section className="page">
      <div className="section-heading narrow">
        <p className="section-tag">About</p>
        <h1>Built as a professional foundation for AgriChain.</h1>
        <p>
          This frontend is structured to support future APIs, dashboards, identity checks,
          marketplace logic, and traceability workflows without overloading the first release.
        </p>
      </div>

      <div className="card-grid">
        {platformHighlights.map((item) => (
          <article className="info-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutPage;
