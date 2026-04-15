import { useState } from 'react';

function BidModal({ auction, onClose, onSubmit }) {
  const minBid = auction.currentBid + 0.1;
  const [bidAmount, setBidAmount] = useState(minBid.toFixed(1));

  const handleSubmit = (e) => {
    e.preventDefault();
    const bid = parseFloat(bidAmount);
    if (bid < minBid) {
      alert(`Your bid must be at least ${minBid.toFixed(1)} ETH.`);
      return;
    }
    onSubmit(bid);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
            <h3>Place Bid for:<br/>{auction.name}</h3>
            <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <p>Current High Bid: <strong>{auction.currentBid} ETH</strong></p>
        
        <form onSubmit={handleSubmit}>
          <div className="bid-input">
            <label htmlFor="bidAmount">Your Bid:</label>
            <input 
              type="number" 
              id="bidAmount" 
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              step="0.1" 
              min={minBid.toFixed(1)}
            />
            <span>ETH</span>
          </div>
          <button type="submit" className="submit-bid-btn">
            Submit Bid
          </button>
        </form>

      </div>
    </div>
  );
}

export default BidModal;