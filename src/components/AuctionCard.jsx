function AuctionCard({ auction, onBidClick }) {
  return (
    <div className="product-card">
      <img src={auction.imageUrl} alt={auction.name} />
      <h3>{auction.name}</h3>
      <p className="description">{auction.description}</p>
      
      <div className="card-info">
        <span className="info-label">Current Bid:</span>
        <span className="info-value">{auction.currentBid} ETH</span>
      </div>
      
      <div className="card-info">
        <span className="info-label">Time Left:</span>
        <span className="info-value">{auction.timeLeft}</span>
      </div>

      <button className="bid-btn" onClick={() => onBidClick(auction)}>
        Place Bid
      </button>
    </div>
  );
}

export default AuctionCard;