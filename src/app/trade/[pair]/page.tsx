'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { mockTradingPairs, generateOrderBook, mockOrders } from '@/lib/mockData'
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils'
import { ChevronDown, Maximize2, X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TradePage({ params }: { params: { pair: string } }) {
  const [orderType, setOrderType] = useState('market')
  const [side, setSide] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState(10000)
  const [leverage, setLeverage] = useState(1)
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const pair = mockTradingPairs[0]
  const orderBook = generateOrderBook(pair.price)

  const leverageOptions = [1, 3, 5, 10, 20]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* CHART SECTION - 70% */}
          <div className="lg:col-span-8 space-y-4">
            {/* Pair Info */}
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-light-text">
                      <span className="text-2xl font-bold">{pair.baseAsset}/{pair.quoteAsset}</span>
                      <ChevronDown size={20} />
                    </button>
                    <div>
                      <div className="text-3xl font-bold text-light-text">
                        {formatCurrency(pair.price)}
                      </div>
                      <div className={`text-sm ${getChangeColor(pair.change24h)}`}>
                        {formatPercentage(pair.change24h)} (24h)
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">24h High</div>
                      <div className="font-semibold text-light-text">{formatCurrency(pair.high24h)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">24h Low</div>
                      <div className="font-semibold text-light-text">{formatCurrency(pair.low24h)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">24h Volume</div>
                      <div className="font-semibold text-light-text">{formatCurrency(pair.volume24h)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card>
              <CardContent className="p-0 relative">
                <div className="absolute top-4 right-4 z-10">
                  <button className="p-2 bg-dark-card rounded-lg hover:bg-dark-bg transition-colors">
                    <Maximize2 size={20} className="text-gray-400" />
                  </button>
                </div>
                <div className="h-[500px] flex items-center justify-center bg-gradient-to-br from-dark-bg to-dark-card">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <div className="text-xl font-semibold text-light-text mb-2">
                      Advanced TradingView Chart
                    </div>
                    <div className="text-gray-400 mb-4">
                      Real-time candlestick data with 50+ indicators
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      {['1m', '5m', '15m', '1h', '4h', '1D', '1W'].map(tf => (
                        <button
                          key={tf}
                          className="px-3 py-1.5 bg-dark-card hover:bg-primary rounded-lg text-sm transition-colors"
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-dark-bg">
                        <th className="text-left p-2 text-gray-400">Pair</th>
                        <th className="text-left p-2 text-gray-400">Type</th>
                        <th className="text-right p-2 text-gray-400">Amount</th>
                        <th className="text-right p-2 text-gray-400">Price</th>
                        <th className="text-right p-2 text-gray-400">Status</th>
                        <th className="text-right p-2 text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map(order => (
                        <tr key={order.id} className="border-b border-dark-bg">
                          <td className="p-2 text-light-text">{order.pair}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.side === 'buy' ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
                            }`}>
                              {order.side.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-2 text-right text-light-text">{order.amount}</td>
                          <td className="p-2 text-right text-light-text">{formatCurrency(order.price)}</td>
                          <td className="p-2 text-right">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === 'filled' ? 'bg-success/20 text-success' :
                              order.status === 'pending' ? 'bg-warning/20 text-warning' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            <button className="text-danger hover:underline text-xs">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ORDER PANEL - 30% */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Trade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Buy/Sell Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSide('buy')}
                    className={`py-3 rounded-lg font-semibold transition-colors ${
                      side === 'buy'
                        ? 'bg-success text-white'
                        : 'bg-dark-bg text-gray-400'
                    }`}
                  >
                    BUY LONG
                  </button>
                  <button
                    onClick={() => setSide('sell')}
                    className={`py-3 rounded-lg font-semibold transition-colors ${
                      side === 'sell'
                        ? 'bg-danger text-white'
                        : 'bg-dark-bg text-gray-400'
                    }`}
                  >
                    SELL SHORT
                  </button>
                </div>

                {/* Order Type */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Order Type</label>
                  <div className="flex space-x-2">
                    {['market', 'limit', 'stop'].map(type => (
                      <button
                        key={type}
                        onClick={() => setOrderType(type)}
                        className={`flex-1 py-2 rounded-lg capitalize transition-colors ${
                          orderType === type
                            ? 'bg-primary text-white'
                            : 'bg-dark-bg text-gray-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Slider */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label className="text-gray-400">Amount (INR)</label>
                    <button className="text-primary hover:underline">Max</button>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="1000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-right font-semibold text-light-text mt-2">
                    {formatCurrency(amount)}
                  </div>
                </div>

                {/* Execute Button */}
                <Button
                  variant={side === 'buy' ? 'success' : 'danger'}
                  size="lg"
                  className="w-full"
                >
                  {side === 'buy' ? 'BUY' : 'SELL'} {pair.baseAsset}
                </Button>
              </CardContent>
            </Card>

            {/* Advanced Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Advanced Orders</CardTitle>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-primary hover:underline text-sm"
                  >
                    {showAdvanced ? 'Hide' : 'Show'}
                  </button>
                </div>
              </CardHeader>
              {showAdvanced && (
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Leverage</label>
                    <div className="flex space-x-2">
                      {leverageOptions.map(lev => (
                        <button
                          key={lev}
                          onClick={() => setLeverage(lev)}
                          className={`flex-1 py-2 rounded-lg transition-colors ${
                            leverage === lev
                              ? 'bg-primary text-white'
                              : 'bg-dark-bg text-gray-400'
                          }`}
                        >
                          {lev}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-2 bg-dark-bg hover:bg-dark-card rounded-lg text-left px-4 text-sm text-light-text transition-colors">
                      Stop Limit Order
                    </button>
                    <button className="w-full py-2 bg-dark-bg hover:bg-dark-card rounded-lg text-left px-4 text-sm text-light-text transition-colors">
                      OCO Order
                    </button>
                    <button className="w-full py-2 bg-dark-bg hover:bg-dark-card rounded-lg text-left px-4 text-sm text-light-text transition-colors">
                      Trailing Stop
                    </button>
                    <button className="w-full py-2 bg-dark-bg hover:bg-dark-card rounded-lg text-left px-4 text-sm text-light-text transition-colors">
                      Bracket Order
                    </button>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Order Book Mini */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Order Book</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-xs">
                  {orderBook.asks.slice(0, 5).reverse().map((ask, i) => (
                    <div key={`ask-${i}`} className="flex justify-between">
                      <span className="text-danger">{ask.price.toFixed(2)}</span>
                      <span className="text-gray-400">{ask.amount.toFixed(4)}</span>
                    </div>
                  ))}
                  <div className="border-t border-dark-bg my-2" />
                  {orderBook.bids.slice(0, 5).map((bid, i) => (
                    <div key={`bid-${i}`} className="flex justify-between">
                      <span className="text-success">{bid.price.toFixed(2)}</span>
                      <span className="text-gray-400">{bid.amount.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
