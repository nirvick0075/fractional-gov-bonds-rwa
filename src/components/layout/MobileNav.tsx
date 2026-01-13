'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, Zap, Wallet, User } from 'lucide-react'
import { motion } from 'framer-motion'

export const MobileNav: React.FC = () => {
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'Markets', href: '/markets', icon: TrendingUp },
    { label: 'Trade', href: '/trade/BTCINR', icon: Zap },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
    { label: 'Profile', href: '/profile', icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-card border-t border-dark-bg lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-full h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary/10"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <Icon
                size={24}
                className={`relative z-10 ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              />
              <span
                className={`relative z-10 text-xs mt-1 ${
                  isActive ? 'text-primary font-semibold' : 'text-gray-400'
                }`}
              >
                {item.label}
              </span>
              {item.label === 'Trade' && (
                <span className="absolute top-2 right-1/4 w-2 h-2 bg-success rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
