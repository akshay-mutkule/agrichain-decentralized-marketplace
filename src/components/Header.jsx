import { useState } from 'react';

function Header({ onWalletConnect }) {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    if (isConnected) {
      // Disconnect logic (mockup)
      setIsConnected(false);
      setAccount('');
      onWalletConnect(false, null);
    } else {
      // --- Real DApp Logic ---
      // In a real DApp, you would use ethers.js or web3.js
      /*
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const userAccount = accounts[0];
          setAccount(userAccount);
          setIsConnected(true);
          onWalletConnect(true, userAccount);
        } catch (err) {
          console.error("Wallet connection failed:", err);
        }
      } else {
        alert("Please install MetaMask!");
      }
      */
      
      // --- Mockup Logic (for demonstration) ---
      const mockAccount = '0x1234...a1b2';
      setAccount(mockAccount);
      setIsConnected(true);
      onWalletConnect(true, mockAccount);
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>🌾 AgroChain</h1>
      </div>
      <nav>
        <button onClick={connectWallet} className={`connect-wallet-btn ${isConnected ? 'connected' : ''}`}>
          {isConnected ? `✅ Connected: ${account.substring(0, 6)}...` : 'Connect Wallet'}
        </button>
      </nav>
    </header>
  );
}

export default Header;