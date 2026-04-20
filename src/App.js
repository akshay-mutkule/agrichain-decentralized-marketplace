import { useEffect, useMemo, useState } from 'react';
import './App.css';
import heroReference from './assets/reference/hero-reference.jpg';
import contactReference from './assets/reference/contact-reference.jpg';
import spotlightReference from './assets/reference/spotlight-reference.jpg';
import modulesReference from './assets/reference/modules-reference.jpg';
import logisticsReference from './assets/reference/logistics-reference.jpg';
import blogReference from './assets/reference/blog-reference.jpg';

const imageMap = {
  hero: heroReference,
  contact: contactReference,
  spotlight: spotlightReference,
  modules: modulesReference,
  logistics: logisticsReference,
  blog: blogReference,
};

const emptyDemoForm = {
  name: '',
  email: '',
  company: '',
  message: '',
};

const emptyContactForm = {
  name: '',
  email: '',
  company: '',
  message: '',
};

const emptyLoginForm = {
  email: '',
  password: '',
};

function App() {
  const [pageData, setPageData] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [activeModuleId, setActiveModuleId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [panel, setPanel] = useState(null);
  const [demoForm, setDemoForm] = useState(emptyDemoForm);
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [loginForm, setLoginForm] = useState(emptyLoginForm);
  const [demoStatus, setDemoStatus] = useState({ state: 'idle', message: '' });
  const [contactStatus, setContactStatus] = useState({ state: 'idle', message: '' });
  const [loginStatus, setLoginStatus] = useState({ state: 'idle', message: '' });
  const [signedInUser, setSignedInUser] = useState(null);

  async function loadHomepage() {
    setIsLoading(true);
    setLoadError('');

    try {
      const response = await fetch('/api/homepage');
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to load homepage content.');
      }

      setPageData(payload);
      setActiveTab((current) => current || payload.heroTabs?.[0] || '');
      setActiveModuleId((current) => current || payload.modules?.[0]?.id || '');
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadHomepage();
  }, []);

  const activeModule = useMemo(() => {
    if (!pageData?.modules?.length) {
      return null;
    }

    return (
      pageData.modules.find((module) => module.id === activeModuleId) || pageData.modules[0]
    );
  }, [activeModuleId, pageData]);

  async function submitJson(path, payload, setStatus, onSuccess) {
    setStatus({ state: 'loading', message: '' });

    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Request failed');
      }

      setStatus({ state: 'success', message: result.message });
      await loadHomepage();

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  }

  function handleDemoSubmit(event) {
    event.preventDefault();
    submitJson('/api/demo', demoForm, setDemoStatus, () => {
      setDemoForm(emptyDemoForm);
    });
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    submitJson('/api/contact', contactForm, setContactStatus, () => {
      setContactForm(emptyContactForm);
    });
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    submitJson('/api/login', loginForm, setLoginStatus, (result) => {
      setSignedInUser(result.user);
      setLoginForm(emptyLoginForm);
      setPanel(null);
    });
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <p className="eyebrow">AgriChain</p>
          <h1>Loading platform experience...</h1>
        </div>
      </div>
    );
  }

  if (loadError || !pageData) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <p className="eyebrow">Backend Required</p>
          <h1>{loadError || 'Unable to load application data.'}</h1>
          <button type="button" className="primary-button" onClick={loadHomepage}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span />
          </div>
          <div className="brand-copy">
            <strong>AGRICHAIN</strong>
          </div>
        </div>

        <nav className="main-nav" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#platform">About the Platform</a>
          <a href="#insights">Blog</a>
          <a href="#modules">Features</a>
          <a href="#contact">Users</a>
        </nav>

        <div className="header-actions">
          <a className="phone-link" href="tel:1300565005">
            1300 565 005
          </a>
          {signedInUser ? (
            <button type="button" className="ghost-button user-pill" onClick={() => setPanel('login')}>
              {signedInUser.name}
            </button>
          ) : (
            <button type="button" className="ghost-button" onClick={() => setPanel('login')}>
              Sign In
            </button>
          )}
          <button type="button" className="primary-button" onClick={() => setPanel('demo')}>
            Request Demo
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-inner">
            <div className="hero-topline">
              <div>
                <h1>Robust Features for Agriculture Value Chain Optimization</h1>
                <p className="hero-subtitle">
                  Designed by industry for industry, AgriChain is the world&apos;s most comprehensive
                  agriculture supply chain software solution.
                </p>
              </div>

              <div className="hero-stat-grid">
                <article className="hero-stat-card">
                  <strong>{pageData.stats.demoRequests}</strong>
                  <span>Demo requests received</span>
                </article>
                <article className="hero-stat-card">
                  <strong>{pageData.stats.contactMessages}</strong>
                  <span>Support messages captured</span>
                </article>
                <article className="hero-stat-card">
                  <strong>{pageData.stats.successfulLogins}</strong>
                  <span>Successful platform logins</span>
                </article>
              </div>
            </div>

            <div className="hero-tabs" aria-label="Feature categories">
              {pageData.heroTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={activeTab === tab ? 'hero-tab hero-tab-active' : 'hero-tab'}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <article className="feature-hero-card">
              <div className="feature-copy">
                <p className="eyebrow">Agribusiness Management Software</p>
                <h2>{activeModule?.headline}</h2>
                <p>{activeModule?.description}</p>
                <ul className="feature-list">
                  {activeModule?.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="feature-actions">
                  <button type="button" className="primary-button" onClick={() => setPanel('demo')}>
                    Explore More
                  </button>
                  <button
                    type="button"
                    className="ghost-button muted"
                    onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Browse Modules
                  </button>
                </div>
              </div>

              <div className="hero-reference-wrap">
                <img
                  src={imageMap[activeModule?.imageKey] || heroReference}
                  alt="AgriChain module preview"
                  className="hero-reference"
                />
              </div>
            </article>
          </div>
        </section>

        <section className="logo-strip" aria-label="Customer logos">
          {pageData.partners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </section>

        <section className="trust-banner">
          <p className="eyebrow">Modern Farm Business Management</p>
          <h2>From Paddock to Processor - Verified, Secure, and Fully Connected</h2>
          <p>
            We simplify management from production through delivery with integrated modules for
            contracts, logistics, inventory, compliance, and invoicing.
          </p>
        </section>

        <section className="contact-panel section-shell" id="contact">
          <div className="contact-card">
            <div className="contact-copy">
              <p className="eyebrow">Contact Us</p>
              <h2>Connect With Us for Supply Chain Innovation</h2>
              <p>
                Get to know us a little more and why we are your best choice to manage your supply
                chain.
              </p>

              <form className="inline-form" onSubmit={handleContactSubmit}>
                <div className="form-grid">
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, name: event.target.value }))
                      }
                      placeholder="Your name"
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, email: event.target.value }))
                      }
                      placeholder="team@company.com"
                    />
                  </label>
                  <label>
                    <span>Company</span>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, company: event.target.value }))
                      }
                      placeholder="Company name"
                    />
                  </label>
                  <label className="full-span">
                    <span>Message</span>
                    <textarea
                      value={contactForm.message}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, message: event.target.value }))
                      }
                      placeholder="Tell us about your supply chain workflow"
                      rows="4"
                    />
                  </label>
                </div>

                <div className="contact-actions">
                  <button
                    type="submit"
                    className="light-button"
                    disabled={contactStatus.state === 'loading'}
                  >
                    {contactStatus.state === 'loading' ? 'Sending...' : 'Contact Us'}
                  </button>
                  <button type="button" className="ghost-button muted" onClick={() => setPanel('demo')}>
                    About Us
                  </button>
                </div>
                {contactStatus.message ? (
                  <p
                    className={`status-message ${
                      contactStatus.state === 'error' ? 'status-error' : 'status-success'
                    }`}
                  >
                    {contactStatus.message}
                  </p>
                ) : null}
              </form>
            </div>

            <div className="contact-media-frame">
              <img src={contactReference} alt="Farmer working in a field" />
            </div>
          </div>
        </section>

        <section className="spotlight section-shell" id="platform">
          <div className="spotlight-copy">
            <p className="eyebrow">Platform Overview</p>
            <h2>Supply Chain Has Never Been Easier</h2>
            <p>
              AgriChain was purpose-built for agriculture operations that need one system across
              growers, mills, processors, and buyers.
            </p>
            <div className="spotlight-actions">
              <button type="button" className="primary-button" onClick={() => setPanel('demo')}>
                Request Demo
              </button>
              <button
                type="button"
                className="ghost-button muted"
                onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Modules
              </button>
            </div>
            <div className="enterprise-strip">
              <span>Trusted By The World&apos;s Leading Enterprises</span>
              <div className="enterprise-logos">
                {pageData.enterpriseLogos.map((logo) => (
                  <strong key={logo}>{logo}</strong>
                ))}
              </div>
            </div>
          </div>

          <div className="video-card">
            <img src={spotlightReference} alt="AgriChain website overview" />
            <div className="video-card-overlay">
              <span>See for yourself how AgriChain works</span>
              <button type="button" className="primary-button compact" onClick={() => setPanel('demo')}>
                Request Demo
              </button>
            </div>
          </div>
        </section>

        <section className="modules-section section-shell" id="modules">
          <aside className="modules-sidebar">
            <p className="eyebrow">Modules</p>
            <h2>Configured for every movement in the chain.</h2>
            <ul>
              {pageData.modules.map((module) => (
                <li
                  key={module.id}
                  className={module.id === activeModule?.id ? 'active-module' : ''}
                >
                  <button type="button" className="module-nav-button" onClick={() => setActiveModuleId(module.id)}>
                    {module.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="modules-content">
            <div className="module-spotlight">
              <img
                src={imageMap[activeModule?.imageKey] || modulesReference}
                alt={activeModule?.headline}
              />
              <div className="module-spotlight-copy">
                <p className="eyebrow">Selected Module</p>
                <h3>{activeModule?.headline}</h3>
                <p>{activeModule?.description}</p>
              </div>
            </div>

            <div className="module-grid">
              {pageData.modules.slice(1, 5).map((module) => (
                <article className="module-card" key={module.id}>
                  <img src={imageMap[module.imageKey] || modulesReference} alt={module.headline} />
                  <div className="module-card-body">
                    <h3>{module.headline}</h3>
                    <ul>
                      {module.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <blockquote className="testimonial-card">{pageData.testimonial}</blockquote>
          </div>
        </section>

        <section className="insights-section section-shell" id="insights">
          <div className="section-heading">
            <p className="eyebrow">Latest Insights</p>
            <h2>Operational guides for modern agriculture teams.</h2>
          </div>

          <div className="article-grid">
            {pageData.articles.map((article) => (
              <article className="article-card" key={article.id}>
                <img src={imageMap[article.imageKey] || blogReference} alt={article.title} />
                <div className="article-card-body">
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <a href="#home">Read more</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <span />
            </div>
            <div className="brand-copy">
              <strong>AGRICHAIN</strong>
            </div>
          </div>
          <p>We are B2C | Your Trusted Partner</p>
          <p className="footer-note">
            Demo credentials: <strong>admin@agrichain.demo</strong> / <strong>Demo@123</strong>
          </p>
        </div>

        <div className="footer-links">
          <span>Home</span>
          <span>About the Platform</span>
          <span>Features</span>
          <span>Users</span>
          <span>1300 565 005</span>
        </div>
      </footer>

      <button type="button" className="chat-bubble" aria-label="Open support chat" onClick={() => setPanel('contact')}>
        <span />
      </button>

      {panel ? (
        <div className="modal-overlay" onClick={() => setPanel(null)} role="presentation">
          <div className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
            <button type="button" className="modal-close" onClick={() => setPanel(null)}>
              x
            </button>

            {panel === 'demo' ? (
              <>
                <p className="eyebrow">Request Demo</p>
                <h2 className="modal-title">Book a live walkthrough</h2>
                <form className="stack-form" onSubmit={handleDemoSubmit}>
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      value={demoForm.name}
                      onChange={(event) =>
                        setDemoForm((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      value={demoForm.email}
                      onChange={(event) =>
                        setDemoForm((current) => ({ ...current, email: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Company</span>
                    <input
                      type="text"
                      value={demoForm.company}
                      onChange={(event) =>
                        setDemoForm((current) => ({ ...current, company: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Message</span>
                    <textarea
                      rows="4"
                      value={demoForm.message}
                      onChange={(event) =>
                        setDemoForm((current) => ({ ...current, message: event.target.value }))
                      }
                    />
                  </label>
                  <button type="submit" className="primary-button" disabled={demoStatus.state === 'loading'}>
                    {demoStatus.state === 'loading' ? 'Submitting...' : 'Submit request'}
                  </button>
                  {demoStatus.message ? (
                    <p
                      className={`status-message ${
                        demoStatus.state === 'error' ? 'status-error' : 'status-success'
                      }`}
                    >
                      {demoStatus.message}
                    </p>
                  ) : null}
                </form>
              </>
            ) : null}

            {panel === 'contact' ? (
              <>
                <p className="eyebrow">Support Chat</p>
                <h2 className="modal-title">Send a message to the operations team</h2>
                <form className="stack-form" onSubmit={handleContactSubmit}>
                  <label>
                    <span>Name</span>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, name: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, email: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Company</span>
                    <input
                      type="text"
                      value={contactForm.company}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, company: event.target.value }))
                      }
                    />
                  </label>
                  <label>
                    <span>Message</span>
                    <textarea
                      rows="4"
                      value={contactForm.message}
                      onChange={(event) =>
                        setContactForm((current) => ({ ...current, message: event.target.value }))
                      }
                    />
                  </label>
                  <button type="submit" className="primary-button" disabled={contactStatus.state === 'loading'}>
                    {contactStatus.state === 'loading' ? 'Sending...' : 'Send message'}
                  </button>
                  {contactStatus.message ? (
                    <p
                      className={`status-message ${
                        contactStatus.state === 'error' ? 'status-error' : 'status-success'
                      }`}
                    >
                      {contactStatus.message}
                    </p>
                  ) : null}
                </form>
              </>
            ) : null}

            {panel === 'login' ? (
              <>
                <p className="eyebrow">Platform Access</p>
                <h2 className="modal-title">Sign in to the demo backend</h2>
                {signedInUser ? (
                  <div className="signed-in-summary">
                    <p>
                      Signed in as <strong>{signedInUser.name}</strong>
                    </p>
                    <p>{signedInUser.role}</p>
                    <p>{signedInUser.email}</p>
                    <button type="button" className="ghost-button muted" onClick={() => setSignedInUser(null)}>
                      Sign out
                    </button>
                  </div>
                ) : (
                  <form className="stack-form" onSubmit={handleLoginSubmit}>
                    <label>
                      <span>Email</span>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(event) =>
                          setLoginForm((current) => ({ ...current, email: event.target.value }))
                        }
                      />
                    </label>
                    <label>
                      <span>Password</span>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(event) =>
                          setLoginForm((current) => ({ ...current, password: event.target.value }))
                        }
                      />
                    </label>
                    <button type="submit" className="primary-button" disabled={loginStatus.state === 'loading'}>
                      {loginStatus.state === 'loading' ? 'Signing in...' : 'Sign in'}
                    </button>
                    <p className="helper-text">
                      Demo account: <strong>admin@agrichain.demo</strong> / <strong>Demo@123</strong>
                    </p>
                    {loginStatus.message ? (
                      <p
                        className={`status-message ${
                          loginStatus.state === 'error' ? 'status-error' : 'status-success'
                        }`}
                      >
                        {loginStatus.message}
                      </p>
                    ) : null}
                  </form>
                )}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
