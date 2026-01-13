import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, User, Moon, Sun } from 'lucide-react';
import Button from '../ui/Button';
import useTradingStore from '../../store/tradingStore';
import { formatCurrency } from '../../lib/utils';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { walletBalance, theme, toggleTheme } = useTradingStore();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/markets', label: 'Markets' },
    { path: '/trade/BTCINR', label: 'Trade' },
    { path: '/wallet', label: 'Wallet' },
    { path: '/earn', label: 'Earn' },
    { path: '/nfts', label: 'NFTs' },
  ];
  
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);
  
  return (
    <header className="sticky top-0 z-40 bg-dark-card/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Trade<span className="text-primary">Pro</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 hover:text-white transition-colors hidden lg:block"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="p-2 text-gray-300 hover:text-white transition-colors hidden lg:block relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
            </button>
            
            <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-dark-bg rounded-lg">
              <span className="text-sm text-gray-400">Balance:</span>
              <span className="font-semibold text-white">{formatCurrency(walletBalance)}</span>
            </div>
            
            <Link to="/profile" className="hidden lg:block">
              <Button variant="outline" size="sm">
                <User size={16} className="mr-1" />
                Profile
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4"
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-gray-300'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
