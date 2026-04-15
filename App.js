import { useState } from 'react';
import Header from './components/Header';
import AuctionList from './components/AuctionList';
import BidModal from './components/BidModal';

// Mock data for the auctions
const MOCK_AUCTIONS = [
  {
    id: 1,
    name: '100 Ton Lot - Organic Wheat',
    description: 'High-quality organic wheat, harvested last week. Verified farm-to-table traceability.',
    currentBid: 5.2,
    timeLeft: '2d 4h 10m',
    imageUrl: 'https://m.media-amazon.com/images/I/714xCG6CxKL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    id: 2,
    name: '50 Ton Lot - Fresh Corn',
    description: 'Non-GMO sweet corn, ready for immediate shipment. IoT sensor data available.',
    currentBid: 2.8,
    timeLeft: '1d 8h 30m',
    imageUrl: 'https://chefsmandala.com/wp-content/uploads/2018/03/corn.jpg'
  },
  {
    id: 3,
    name: '20 Ton Lot - Gala Apples',
    description: 'Crisp Gala apples, grade A. Stored in temperature-controlled units.',
    currentBid: 1.5,
    timeLeft: '18h 15m',
    imageUrl: 'https://img.lb.wbmdstatic.com/vim/live/webmd/consumer_assets/site_images/articles/health_tools/healing_foods_slideshow/1800ss_getty_rf_apples.jpg?resize=750px:*&output-quality=75'
  }
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  // --- Modal Handlers ---
  const handleOpenModal = (auction) => {
    if (!isWalletConnected) {
      alert("Please connect your wallet first to place a bid.");
      return;
    }
    setSelectedAuction(auction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAuction(null);
  };

  // --- Bid Submission Handler ---
  const handleSubmitBid = (bidAmount) => {
    // This is where you would call your smart contract
    console.log(`Submitting bid of ${bidAmount} ETH for ${selectedAuction.name}`);
    
    // --- MOCKUP LOGIC ---
    // In a real app, you would wait for the transaction to be mined
    // then update the state or re-fetch data.
    alert(`Your bid of ${bidAmount} ETH for "${selectedAuction.name}" has been submitted!`);
    handleCloseModal();
  };
  
  // --- Wallet Connection Handler ---
  const handleWalletConnect = (connected, account) => {
      setIsWalletConnected(connected);
      if(connected) {
        console.log("Wallet connected:", account);
      } else {
        console.log("Wallet disconnected.");
      }
  };


  return (
    <div className="App">
      <Header onWalletConnect={handleWalletConnect} />
      <main>
        <h2>Active Auctions</h2>
        <AuctionList 
          auctions={MOCK_AUCTIONS} 
          onBidClick={handleOpenModal} 
        />
      </main>

      {isModalOpen && (
        <BidModal
          auction={selectedAuction}
          onClose={handleCloseModal}
          onSubmit={handleSubmitBid}
        />
      )}
    </div>
  );
}

export default App;