import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Wallet2, Home } from "lucide-react";
import skibidiLogo from "./assets/skibidi-removebg-preview.png";

// Contract Addresses
const USDT_CONTRACT_ADDRESS = "0x3Fe3ad838059a254e5AAD551a2231f61a76a2554";
const PRESALE_CONTRACT_ADDRESS = "0x4843473451e7554533e0Fafe28e665533743Eac4 ";

// ABIs
const USDT_ABI = [
  "function approve(address spender, uint256 value) public returns (bool)",
];
const PRESALE_ABI = ["function buyTokens(uint256 usdtAmount) public"];

function App() {
  const [amount, setAmount] = useState<string>("");
  const [skibidiAmount, setSkibidiAmount] = useState<string>("0");
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [isBuying, setIsBuying] = useState<boolean>(false);

  // Calculate SKIBIDI amount (1 USDT = 1000 SKIBIDI)
  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    setSkibidiAmount((numAmount * 1000).toLocaleString());
  }, [amount]);

  // Handle input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value) || 0;
      if (numValue <= 1000) {
        setAmount(value);
      }
    }
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    return numAmount >= 10 && numAmount <= 1000;
  };

  // Connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setProvider(provider);
        setSigner(signer);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask not found. Please install MetaMask.");
    }
  };

  // Approve USDT spending & Buy Tokens
  const handleBuy = async () => {
    if (!isValidAmount() || !signer) {
      alert("Invalid amount or wallet not connected");
      return;
    }

    try {
      setIsBuying(true); // Disable button during transaction
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        USDT_ABI,
        signer
      );

      const amountInWei = ethers.parseUnits(amount, 6);
      console.log("Approving USDT:", amountInWei.toString());

      // Approve exact amount
      const approveTx = await usdtContract.approve(
        PRESALE_CONTRACT_ADDRESS,
        amountInWei
      );
      await approveTx.wait();
      console.log("USDT Approved:", approveTx.hash);

      // Call buyTokens on the presale contract
      const presaleContract = new ethers.Contract(
        PRESALE_CONTRACT_ADDRESS,
        PRESALE_ABI,
        signer
      );

      const buyTx = await presaleContract.buyTokens(amountInWei);
      await buyTx.wait();
      alert("Token purchase successful!");
      console.log("Tokens Purchased:", buyTx.hash);
    } catch (error) {
      console.error("Transaction error:", error);
      alert("Transaction failed. Check console for details.");
    } finally {
      setIsBuying(false); // Re-enable button after transaction
    }
  };

  // Trimmed Wallet Address Display
  const displayAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white">
      {/* Navigation */}
      <nav className="bg-[#12123a]/50 backdrop-blur-md border-b border-[#2a2a5a] fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src={skibidiLogo} alt="Logo" className="h-10 w-10 mr-2" />
              <span className="text-xl font-bold text-white">SKIBIDI</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">


              {walletAddress ? (
                <button className="bg-gradient-to-r from-[#00f0ff] to-[#0066ff] text-black font-semibold px-6 py-2 rounded-lg flex items-center">
                  {displayAddress(walletAddress)}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-[#00f0ff] to-[#0066ff] text-black font-semibold px-6 py-2 rounded-lg flex items-center"
                >
                  <Wallet2 className="mr-2" size={20} />
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#12123a]/50 backdrop-blur-md border border-[#2a2a5a] rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Skibidi Toilet Coin Presale
            </h2>

            <div className="space-y-4">
              <div className="bg-[#0a0a1f] rounded-xl p-4 border border-[#2a2a5a]">
                <span className="text-gray-400">You Pay (USDT)</span>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.0"
                  className="bg-transparent text-2xl outline-none w-full"
                />
              </div>

              <div className="bg-[#0a0a1f] rounded-xl p-4 border border-[#2a2a5a]">
                <span className="text-gray-400">You Receive (SKIBIDI)</span>
                <input
                  type="text"
                  value={skibidiAmount}
                  readOnly
                  className="bg-transparent text-2xl outline-none w-full"
                />
              </div>

              <button
                disabled={!isValidAmount() || !walletAddress || isBuying}
                onClick={handleBuy}
                className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-[#00f0ff] to-[#0066ff] text-black"
              >
                {isBuying ? "Processing..." : "Buy Tokens"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
