'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { mockTradingPairs } from '@/lib/mockData'
import { formatCurrency, formatPercentage, getChangeColor, formatNumber } from '@/lib/utils'
import { Search, Star, TrendingUp, TrendingDown, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortFilter, setSortFilter] = useState('all')

  const filteredPairs = mockTradingPairs.filter(pair => {
    const matchesSearch = pair.baseAsset.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pair.quoteAsset.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false
    
    if (sortFilter === 'gainers') return pair.change24h > 0
    if (sortFilter === 'losers') return pair.change24h < 0
    
    return true
  })

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-light-text mb-2">Markets</h1>
          <p className="text-gray-400">Explore and trade 500+ cryptocurrency pairs</p>
        </div>

        {/* Filter Bar */}
        <Card className="mb-6">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search BTC, ETH, SOL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-2 flex-wrap">
                {['all', 'spot', 'futures'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      filter === f
                        ? 'bg-primary text-white'
                        : 'bg-dark-bg text-gray-400 hover:text-light-text'
                    }`}
                  >
                    {f}
                  </button>
                ))}
                
                <div className="relative">
                  <button
                    onClick={() => setSortFilter(sortFilter === 'all' ? 'gainers' : sortFilter === 'gainers' ? 'losers' : 'all')}
                    className="px-4 py-2 rounded-lg bg-dark-bg text-gray-400 hover:text-light-text transition-colors flex items-center gap-2"
                  >
                    {sortFilter === 'gainers' && <TrendingUp size={16} className="text-success" />}
                    {sortFilter === 'losers' && <TrendingDown size={16} className="text-danger" />}
                    <span className="capitalize">{sortFilter}</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Markets Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-bg">
                  <th className="text-left p-4 text-sm font-semibold text-gray-400"></th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Pair</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-400">Price</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-400">24h Change</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-400 hidden md:table-cell">24h High</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-400 hidden md:table-cell">24h Low</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-400 hidden lg:table-cell">24h Volume</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPairs.map((pair, index) => (
                  <motion.tr
                    key={pair.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-dark-bg hover:bg-dark-bg/50 transition-colors"
                  >
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-warning transition-colors">
                        <Star size={16} />
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {pair.baseAsset[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-light-text">
                            {pair.baseAsset}/{pair.quoteAsset}
                          </div>
                          <div className="text-xs text-gray-400">{pair.baseAsset}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="font-semibold text-light-text">
                        {formatCurrency(pair.price)}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className={`flex items-center justify-end space-x-1 ${getChangeColor(pair.change24h)}`}>
                        {pair.change24h >= 0 ? (
                          <TrendingUp size={16} />
                        ) : (
                          <TrendingDown size={16} />
                        )}
                        <span className="font-semibold">{formatPercentage(pair.change24h)}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right text-light-text hidden md:table-cell">
                      {formatCurrency(pair.high24h)}
                    </td>
                    <td className="p-4 text-right text-light-text hidden md:table-cell">
                      {formatCurrency(pair.low24h)}
                    </td>
                    <td className="p-4 text-right text-light-text hidden lg:table-cell">
                      {formatCurrency(pair.volume24h)}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link href={`/trade/${pair.baseAsset}${pair.quoteAsset}`}>
                          <Button size="sm" variant="primary">
                            Trade
                          </Button>
                        </Link>
                        <Button size="sm" variant="ghost" className="hidden sm:block">
                          Watch
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Load More */}
          <div className="p-6 text-center border-t border-dark-bg">
            <Button variant="outline">
              Load More Markets
            </Button>
          </div>
        </Card>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-success mb-2">
                {filteredPairs.filter(p => p.change24h > 0).length}
              </div>
              <div className="text-gray-400">Gainers (24h)</div>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-danger mb-2">
                {filteredPairs.filter(p => p.change24h < 0).length}
              </div>
              <div className="text-gray-400">Losers (24h)</div>
            </div>
          </Card>
          <Card>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                ${formatNumber(filteredPairs.reduce((sum, p) => sum + p.volume24h, 0))}
              </div>
              <div className="text-gray-400">Total Volume (24h)</div>
            </div>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
