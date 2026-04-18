import { useEffect, useState } from 'react';
import './App.css';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MarketplacePage from './pages/MarketplacePage';
import SupportPage from './pages/SupportPage';
import WorkflowPage from './pages/WorkflowPage';

const validPages = ['home', 'about', 'marketplace', 'workflow', 'support', 'login'];

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '');
  return validPages.includes(hash) ? hash : 'home';
}

const pageMeta = {
  home: { label: 'Home', component: HomePage },
  about: { label: 'About', component: AboutPage },
  marketplace: { label: 'Marketplace', component: MarketplacePage },
  workflow: { label: 'Workflow', component: WorkflowPage },
  support: { label: 'Support', component: SupportPage },
  login: { label: 'Login', component: LoginPage },
};

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    const nextPage = validPages.includes(page) ? page : 'home';
    window.location.hash = nextPage === 'home' ? '' : nextPage;
    setCurrentPage(nextPage);
  };

  const ActivePage = pageMeta[currentPage].component;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <p className="brand-kicker">AgriChain Platform</p>
          <p className="brand-name">Smart agriculture marketplace frontend</p>
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {validPages.map((page) => (
            <button
              key={page}
              type="button"
              className={currentPage === page ? 'nav-link-button active' : 'nav-link-button'}
              onClick={() => navigateTo(page)}
            >
              {pageMeta[page].label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main-content">
        <ActivePage navigateTo={navigateTo} />
      </main>

      <footer className="site-footer">
        <p>Copyright (c) 2026 AgriChain. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
