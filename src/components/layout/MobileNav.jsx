import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, TrendingUp, BarChart3, Wallet, User } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/markets', icon: TrendingUp, label: 'Markets' },
    { path: '/trade/BTCINR', icon: BarChart3, label: 'Trade', badge: true },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-dark-card border-t border-gray-800 z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <div className="relative">
                <Icon
                  size={24}
                  className={active ? 'text-primary' : 'text-gray-400'}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
                )}
              </div>
              <span
                className={`text-xs mt-1 ${
                  active ? 'text-primary' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {active && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
