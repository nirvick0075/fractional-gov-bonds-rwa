'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Download, Zap, Shield, TrendingUp, Users, BarChart3, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatNumber } from '@/lib/utils'
import { platformStats } from '@/lib/mockData'

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: 'INSTANT TRADING',
      description: 'Execute trades in milliseconds with our ultra-fast matching engine',
      cta: 'Start Trading'
    },
    {
      icon: Shield,
      title: 'SECURE WALLET',
      description: 'Military-grade encryption and multi-signature security for your assets',
      cta: 'Learn More'
    },
    {
      icon: TrendingUp,
      title: 'SMART TOOLS',
      description: 'Advanced charts, indicators, and AI-powered trading insights',
      cta: 'Explore Tools'
    }
  ]

  const stats = [
    { label: 'Daily Volume', value: `$${formatNumber(platformStats.dailyVolume)}` },
    { label: 'Active Users', value: formatNumber(platformStats.activeUsers) },
    { label: 'Markets', value: `${platformStats.totalMarkets}+` },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Simple Header for Landing */}
      <header className="fixed top-0 w-full z-50 bg-dark-card/80 backdrop-blur-lg border-b border-dark-bg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-lg" />
              <span className="text-xl font-bold text-light-text">TradePro</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Download size={16} className="mr-2" />
                Download App
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="primary" size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-h1-desktop font-bold text-light-text mb-6 leading-tight">
              TRADE ANYWHERE, ANYTIME
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Real-time crypto & stocks · Advanced charts · Zero downtime
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/dashboard">
                <Button variant="success" size="lg" className="w-full sm:w-auto">
                  Start Trading Now
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Play className="mr-2" size={20} />
                Watch Demo Video
              </Button>
            </div>

            {/* QR Code Section */}
            <div className="inline-flex items-center space-x-4 bg-dark-card px-6 py-3 rounded-lg">
              <Download size={20} className="text-gray-400" />
              <span className="text-sm text-gray-400">Download App</span>
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                <Globe size={32} className="text-gray-400" />
              </div>
            </div>
          </motion.div>

          {/* Quick Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <div className="text-3xl font-bold text-light-text mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="h-full">
                    <div className="flex flex-col items-center text-center p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center mb-6">
                        <Icon size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-light-text mb-4">{feature.title}</h3>
                      <p className="text-gray-400 mb-6 flex-grow">{feature.description}</p>
                      <Button variant="outline" className="w-full">
                        {feature.cta}
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-success rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join millions of traders worldwide. Sign up in seconds and start trading instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white text-primary border-white hover:bg-white/90">
                  Sign Up Free
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-white border-2 border-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-card border-t border-dark-bg py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-light-text mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/markets" className="hover:text-light-text">Spot Trading</Link></li>
                <li><Link href="/markets" className="hover:text-light-text">Futures</Link></li>
                <li><Link href="/earn" className="hover:text-light-text">Staking</Link></li>
                <li><Link href="/wallet" className="hover:text-light-text">Wallet</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-light-text mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-light-text">About Us</a></li>
                <li><a href="#" className="hover:text-light-text">Careers</a></li>
                <li><a href="#" className="hover:text-light-text">Blog</a></li>
                <li><a href="#" className="hover:text-light-text">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-light-text mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-light-text">Help Center</a></li>
                <li><a href="#" className="hover:text-light-text">Contact Us</a></li>
                <li><a href="#" className="hover:text-light-text">API Docs</a></li>
                <li><a href="#" className="hover:text-light-text">Fees</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-light-text mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-light-text">Terms</a></li>
                <li><a href="#" className="hover:text-light-text">Privacy</a></li>
                <li><a href="#" className="hover:text-light-text">Cookies</a></li>
                <li><a href="#" className="hover:text-light-text">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-bg pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 TradePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
