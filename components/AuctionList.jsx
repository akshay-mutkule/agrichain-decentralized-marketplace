import AuctionCard from './AuctionCard';

function AuctionList({ auctions, onBidClick }) {
  return (
    <div className="auction-listings">
      {auctions.map(auction => (
        <AuctionCard 
          key={auction.id} 
          auction={auction} 
          onBidClick={onBidClick} 
        />
      ))}
    </div>
  );
}

export default AuctionList;