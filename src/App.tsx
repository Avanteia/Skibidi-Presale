import React, { useState, useEffect } from 'react';
import { Wallet2, Menu, X, ArrowRightLeft, FileText, Home } from 'lucide-react';
import skibidiLogo from "./assets/skibidi-removebg-preview.png";


function App() {
  const [amount, setAmount] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [skibidiAmount, setSkibidiAmount] = useState<string>('0');

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    setSkibidiAmount((numAmount * 1000).toLocaleString());
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value) || 0;
      if (numValue <= 10000) {
        setAmount(value);
      }
    }
  };

  const isValidAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    return numAmount >= 10 && numAmount <= 10000;
  };

  return (
    <div className="min-h-screen bg-[#0a0a1f] text-white">
      {/* Navigation */}
      <nav className="bg-[#12123a]/50 backdrop-blur-md border-b border-[#2a2a5a] fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center">
            <img src={skibidiLogo} alt="Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-bold text-white">SKIBIDI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://meme-coin-five.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-[#00f0ff]"
            >
              <Home size={20} className="mr-1" /> Home
            </a>
            <a href="/presale" className="flex items-center text-white hover:text-[#00f0ff]">
              <ArrowRightLeft size={20} className="mr-1" /> Presale
            </a>
            <a href="/whitepaper" className="flex items-center text-white hover:text-[#00f0ff]">
              <FileText size={20} className="mr-1" /> Whitepaper
            </a>
            <button className="bg-gradient-to-r from-[#00f0ff] to-[#0066ff] text-black font-semibold px-6 py-2 rounded-lg flex items-center">
              <Wallet2 className="mr-2" size={20} />
              Connect Wallet
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#12123a]/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="https://meme-coin-five.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-[#00f0ff] py-2"
            >
              <Home size={20} className="mr-2" /> Home
            </a>
            <a href="/presale" className="flex items-center text-white hover:text-[#00f0ff] py-2">
              <ArrowRightLeft size={20} className="mr-2" /> Presale
            </a>
            <a href="/whitepaper" className="flex items-center text-white hover:text-[#00f0ff] py-2">
              <FileText size={20} className="mr-2" /> Whitepaper
            </a>
            <button className="w-full bg-gradient-to-r from-[#00f0ff] to-[#0066ff] text-black font-semibold px-6 py-2 rounded-lg flex items-center justify-center">
              <Wallet2 className="mr-2" size={20} />
              Connect Wallet
            </button>
          </div>
        </div>
      )}
    </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-[#12123a]/50 backdrop-blur-md border border-[#2a2a5a] rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Skibidi Toilet Coin Presale</h2>
            
            {/* Swap Interface */}
            <div className="space-y-4">
              <div className="bg-[#0a0a1f] rounded-xl p-4 border border-[#2a2a5a]">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">You Pay</span>
                  <span className="text-gray-400">Balance: 0 USDT</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.0"
                    className="bg-transparent text-2xl outline-none w-full"
                  />
                  <div className="flex items-center bg-[#2a2a5a] px-3 py-1 rounded-lg">
                    <img
                      src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=029"
                      alt="USDT"
                      className="w-6 h-6 mr-2"
                    />
                    <span>USDT</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <ArrowRightLeft className="rotate-90 text-[#00f0ff]" />
              </div>

              <div className="bg-[#0a0a1f] rounded-xl p-4 border border-[#2a2a5a]">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">You Receive</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={skibidiAmount}
                    readOnly
                    className="bg-transparent text-2xl outline-none w-full"
                  />
                  <div className="flex items-center bg-[#2a2a5a] px-3 py-1 rounded-lg">
                    <ArrowRightLeft className="w-6 h-6 mr-2 text-[#00f0ff]" />
                    <span>SKIBIDI</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <p>• Minimum purchase: 10 USDT</p>
                <p>• Maximum purchase: 10,000 USDT</p>
                <p>• Rate: 1 USDT = 1000 SKIBIDI</p>
              </div>

              <button
                disabled={!isValidAmount()}
                className={`w-full py-3 rounded-xl font-semibold ${
                  isValidAmount()
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#0066ff] text-black'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center px-4 py-2 rounded-lg ${
        active ? 'bg-[#2a2a5a] text-[#00f0ff]' : 'text-gray-300 hover:text-white hover:bg-[#2a2a5a]/50'
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
}

function MobileNavButton({ icon, text, active = false }: { icon: React.ReactNode; text: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex items-center px-4 py-2 rounded-lg ${
        active ? 'bg-[#2a2a5a] text-[#00f0ff]' : 'text-gray-300 hover:text-white hover:bg-[#2a2a5a]/50'
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default App;