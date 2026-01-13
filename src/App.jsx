import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Dashboard from './pages/TradingDashboard';
import Markets from './pages/Markets';
import Trade from './pages/Trade';
import Wallet from './pages/Wallet';
import Earn from './pages/Earn';
import Profile from './pages/Profile';
import NFTs from './pages/NFTs';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-dark-bg text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/trade/:pair" element={<Trade />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nfts" element={<NFTs />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fff',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
