'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Bell, ChevronDown, Sun, Moon } from 'lucide-react'
import { useTradingStore } from '@/store/tradingStore'
import { formatCurrency } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const pathname = usePathname()
  const { walletBalance, theme, toggleTheme } = useTradingStore()

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Markets', href: '/markets' },
    { label: 'Trade', href: '/trade/BTCINR' },
    { label: 'Wallet', href: '/wallet' },
    { label: 'Earn', href: '/earn' },
    { label: 'NFTs', href: '/nfts' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-dark-card border-b border-dark-bg backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg" />
            <span className="text-xl font-bold text-light-text hidden sm:block">TradePro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-dark-bg hover:text-light-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-light-text transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-light-text transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
            </button>

            {/* Wallet Balance - Desktop */}
            <div className="hidden md:flex items-center space-x-2 bg-dark-bg px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-400">Balance:</span>
              <span className="font-semibold text-light-text">{formatCurrency(walletBalance)}</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 text-light-text hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-full" />
                <ChevronDown size={16} className="hidden lg:block" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-dark-card rounded-lg shadow-modal overflow-hidden"
                  >
                    <Link href="/profile" className="block px-4 py-3 hover:bg-dark-bg transition-colors text-light-text">
                      Profile
                    </Link>
                    <Link href="/profile?tab=security" className="block px-4 py-3 hover:bg-dark-bg transition-colors text-light-text">
                      Security
                    </Link>
                    <Link href="/profile?tab=settings" className="block px-4 py-3 hover:bg-dark-bg transition-colors text-light-text">
                      Settings
                    </Link>
                    <button className="w-full text-left px-4 py-3 hover:bg-dark-bg transition-colors text-danger">
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-light-text"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-primary text-white'
                        : 'text-gray-300 hover:bg-dark-bg'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-4 py-2 text-sm text-gray-400">
                  Balance: <span className="font-semibold text-light-text">{formatCurrency(walletBalance)}</span>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
