import './App.css';

const platformHighlights = [
  {
    title: 'Farm Traceability',
    description:
      'Track produce from field to buyer with transparent records, shipment milestones, and quality checkpoints.',
  },
  {
    title: 'Verified Marketplace',
    description:
      'Connect farmers, suppliers, and bulk buyers in one structured ecosystem designed for reliable agricultural trade.',
  },
  {
    title: 'Support Operations',
    description:
      'Handle onboarding, issue reporting, and buyer assistance through a dedicated support flow built into the platform.',
  },
];

const marketplaceListings = [
  {
    crop: 'Premium Wheat',
    location: 'Punjab',
    quantity: '120 tons',
    status: 'Verified lot',
  },
  {
    crop: 'Fresh Corn',
    location: 'Karnataka',
    quantity: '80 tons',
    status: 'Ready to ship',
  },
  {
    crop: 'Organic Rice',
    location: 'Andhra Pradesh',
    quantity: '200 tons',
    status: 'Quality checked',
  },
];

const workflowSteps = [
  'Farmer or supplier registers on the platform',
  'Produce details, traceability, and pricing are uploaded',
  'Buyers review listings and submit purchase requests',
  'Support and operations teams manage delivery and issue resolution',
];

const metrics = [
  { value: '250+', label: 'registered growers' },
  { value: '120+', label: 'active buyers' },
  { value: '99%', label: 'traceable listings' },
  { value: '24/7', label: 'support coverage' },
];

const supportItems = [
  '24/7 onboarding guidance for farmers and buyers',
  'Account recovery and profile verification help',
  'Order, logistics, and transaction issue support',
];

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="brand-kicker">AgriChain Platform</p>
          <h1 className="brand-name">Smart agriculture marketplace frontend</h1>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#marketplace">Marketplace</a>
          <a href="#workflow">Workflow</a>
          <a href="#support">Support</a>
          <a href="#login">Login</a>
          <a href="#signup" className="nav-cta">
            Sign Up
          </a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <p className="section-tag">Home</p>
            <h2>Digital modules for modern agricultural trade</h2>
            <p className="hero-text">
              AgriChain brings farmer onboarding, buyer access, support workflows,
              and marketplace visibility into one high-level frontend experience.
            </p>

            <div className="hero-actions">
              <a href="#signup" className="primary-button">
                Create account
              </a>
              <a href="#about" className="secondary-button">
                Explore modules
              </a>
            </div>
          </div>

          <div className="hero-card">
            <h3>Core frontend modules</h3>
            <ul>
              <li>Home page with product overview and calls to action</li>
              <li>About section explaining platform value and architecture</li>
              <li>Marketplace and operations modules for project scaling</li>
              <li>Support section for operational assistance</li>
              <li>Login and signup forms for user access</li>
            </ul>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Platform metrics">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </section>

        <section id="about" className="content-section">
          <div className="section-heading">
            <p className="section-tag">About</p>
            <h2>Built as a high-level project foundation</h2>
            <p>
              This frontend is structured as a clear starting point for your
              AgriChain project so you can extend it later with backend APIs,
              blockchain integration, dashboards, and role-based workflows.
            </p>
          </div>

          <div className="highlight-grid">
            {platformHighlights.map((item) => (
              <article className="info-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="marketplace" className="content-section marketplace-section">
          <div className="section-heading">
            <p className="section-tag">Marketplace</p>
            <h2>Listing preview for buyers and suppliers</h2>
            <p>
              This module gives your project a visible transaction layer where
              produce listings, regions, quantities, and verification states can
              be shown before you connect to a real backend.
            </p>
          </div>

          <div className="listing-grid">
            {marketplaceListings.map((listing) => (
              <article className="listing-card" key={listing.crop + listing.location}>
                <p className="listing-status">{listing.status}</p>
                <h3>{listing.crop}</h3>
                <dl>
                  <div>
                    <dt>Origin</dt>
                    <dd>{listing.location}</dd>
                  </div>
                  <div>
                    <dt>Quantity</dt>
                    <dd>{listing.quantity}</dd>
                  </div>
                </dl>
                <button type="button" className="secondary-button">
                  View details
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="workflow" className="content-section workflow-section">
          <div className="section-heading">
            <p className="section-tag">Workflow</p>
            <h2>Simple process flow for the AgriChain platform</h2>
            <p>
              This section acts as a project module for operations design. It
              shows how users move through onboarding, listing, purchase, and
              support stages inside the product.
            </p>
          </div>

          <div className="timeline">
            {workflowSteps.map((step, index) => (
              <article className="timeline-step" key={step}>
                <span className="timeline-index">0{index + 1}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="support" className="content-section support-section">
          <div className="section-heading">
            <p className="section-tag">Support</p>
            <h2>Help for users across the platform</h2>
            <p>
              Support is designed for both operational clarity and user trust.
              Teams can use this module as the starting point for ticketing,
              contact forms, or live help in later phases.
            </p>
          </div>

          <div className="support-layout">
            <div className="info-card">
              <h3>Support coverage</h3>
              <ul className="support-list">
                {supportItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <form className="contact-card">
              <h3>Quick contact</h3>
              <label>
                Name
                <input type="text" placeholder="Enter your name" />
              </label>
              <label>
                Email
                <input type="email" placeholder="Enter your email" />
              </label>
              <label>
                Message
                <textarea rows="4" placeholder="Describe your issue or request" />
              </label>
              <button type="button" className="primary-button full-width">
                Submit request
              </button>
            </form>
          </div>
        </section>

        <section className="auth-grid">
          <section id="login" className="content-section auth-section">
            <div className="section-heading">
              <p className="section-tag">Login</p>
              <h2>Access your account</h2>
            </div>

            <form className="auth-card">
              <label>
                Email
                <input type="email" placeholder="Enter your email" />
              </label>
              <label>
                Password
                <input type="password" placeholder="Enter your password" />
              </label>
              <button type="button" className="primary-button full-width">
                Login
              </button>
            </form>
          </section>

          <section id="signup" className="content-section auth-section">
            <div className="section-heading">
              <p className="section-tag">Signup</p>
              <h2>Create a new account</h2>
            </div>

            <form className="auth-card">
              <label>
                Full name
                <input type="text" placeholder="Enter your full name" />
              </label>
              <label>
                Email
                <input type="email" placeholder="Enter your email" />
              </label>
              <label>
                Password
                <input type="password" placeholder="Create a password" />
              </label>
              <button type="button" className="primary-button full-width">
                Sign Up
              </button>
            </form>
          </section>
        </section>
      </main>

      <footer className="site-footer">
        <p>Copyright (c) 2026 AgriChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
