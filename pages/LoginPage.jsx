import { useState } from 'react';

function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <section className="page auth-page">
      <div className="section-heading narrow">
        <p className="section-tag">Login</p>
        <h1>Secure access for platform participants.</h1>
        <p>
          Login has its own page, with signup available as a secondary tab so account access is
          handled in one place instead of being scattered across the homepage.
        </p>
      </div>

      <section className="auth-shell">
        <div className="auth-tabs" role="tablist" aria-label="Authentication forms">
          <button
            type="button"
            className={activeTab === 'login' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={activeTab === 'signup' ? 'tab-button active' : 'tab-button'}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-card">
          {activeTab === 'signup' && (
            <label>
              Full name
              <input type="text" placeholder="Enter your full name" />
            </label>
          )}
          <label>
            Email
            <input type="email" placeholder="Enter your email" />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder={activeTab === 'login' ? 'Enter your password' : 'Create a password'}
            />
          </label>
          <button type="button" className="primary-button full-width">
            {activeTab === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>
      </section>
    </section>
  );
}

export default LoginPage;
