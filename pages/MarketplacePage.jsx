import { useState } from 'react';
import { marketplaceListings } from '../content';

function MarketplacePage() {
  const [selectedListing, setSelectedListing] = useState(marketplaceListings[0]);

  return (
    <section className="page">
      <div className="section-heading narrow">
        <p className="section-tag">Marketplace</p>
        <h1>Browse verified listings with a clearer transaction view.</h1>
        <p>
          Buyers and suppliers can review visible lot information first, then expand into a single
          detail panel for focused decision making.
        </p>
      </div>

      <div className="listing-layout">
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
              <button
                type="button"
                className="secondary-button"
                onClick={() => setSelectedListing(listing)}
              >
                View details
              </button>
            </article>
          ))}
        </div>

        <article className="detail-panel" aria-live="polite">
          <div>
            <p className="section-tag">Selected listing</p>
            <h2>{selectedListing.crop}</h2>
            <p>{selectedListing.description}</p>
          </div>
          <dl className="detail-meta">
            <div>
              <dt>Origin</dt>
              <dd>{selectedListing.location}</dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>{selectedListing.quantity}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{selectedListing.status}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

export default MarketplacePage;
