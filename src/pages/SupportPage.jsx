import { useState } from 'react';
import { supportItems } from '../content';

function SupportPage() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <section className="page">
      <div className="section-heading narrow">
        <p className="section-tag">Support</p>
        <h1>Dedicated help access for onboarding, orders, and account issues.</h1>
        <p>
          Support now lives on its own page so the main experience stays focused while assistance
          remains immediately available when needed.
        </p>
      </div>

      <div className="support-layout">
        <article className="info-card">
          <h3>Support coverage</h3>
          <ul className="support-list">
            {supportItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button
            type="button"
            className="primary-button support-trigger"
            onClick={() => setIsFormVisible((current) => !current)}
          >
            {isFormVisible ? 'Hide contact form' : 'Contact support'}
          </button>
        </article>

        {isFormVisible && (
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
        )}
      </div>
    </section>
  );
}

export default SupportPage;
