'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useTradingStore } from '@/store/tradingStore'
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils'
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react'
import { mockTradingPairs, generateOrderBook, generateRecentTrades } from '@/lib/mockData'

export default function DashboardContent() {
  const { walletBalance, totalPnL, selectedPair, setSelectedPair } = useTradingStore()
  const [tradeAmount, setTradeAmount] = useState(10000)
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market')
  
  const orderBook = generateOrderBook(selectedPair?.price || 4250234)
  const recentTrades = generateRecentTrades(selectedPair?.price || 4250234)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
      {/* LEFT SIDEBAR - 20% */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Balance</div>
              <div className="text-2xl font-bold text-light-text">
                {formatCurrency(walletBalance)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">Total P&L</div>
              <div className={`text-xl font-bold ${getChangeColor(totalPnL)}`}>
                {formatPercentage(totalPnL)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full bg-dark-bg border border-dark-card rounded-lg px-3 py-2 text-sm text-light-text mb-3"
              onChange={(e) => {
                const pair = mockTradingPairs.find(p => p.id === e.target.value)
                if (pair) setSelectedPair(pair)
              }}
            >
              {mockTradingPairs.slice(0, 5).map(pair => (
                <option key={pair.id} value={pair.id}>
                  {pair.baseAsset}/{pair.quoteAsset}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Activity size={12} className="text-success" />
                  <span className="text-gray-400">Buy BTC</span>
                </div>
                <Clock size={12} className="text-gray-500" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* MAIN CONTENT - 60% */}
      <div className="lg:col-span-7 space-y-4">
        {/* Trading Pair Header */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-light-text">
                    {selectedPair?.baseAsset}/{selectedPair?.quoteAsset}
                  </h2>
                  <div className={`flex items-center ${getChangeColor(selectedPair?.change24h || 0)}`}>
                    {(selectedPair?.change24h || 0) >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span className="ml-1 font-semibold">
                      {formatPercentage(selectedPair?.change24h || 0)}
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-light-text mt-2">
                  {formatCurrency(selectedPair?.price || 0)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">24h High</div>
                  <div className="font-semibold text-light-text">
                    {formatCurrency(selectedPair?.high24h || 0)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">24h Low</div>
                  <div className="font-semibold text-light-text">
                    {formatCurrency(selectedPair?.low24h || 0)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">24h Volume</div>
                  <div className="font-semibold text-light-text">
                    {formatCurrency(selectedPair?.volume24h || 0)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Placeholder */}
        <Card>
          <CardContent className="p-0">
            <div className="h-[400px] flex items-center justify-center bg-gradient-to-br from-dark-bg to-dark-card">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <div className="text-xl font-semibold text-light-text mb-2">
                  TradingView Chart
                </div>
                <div className="text-gray-400">
                  Candlestick chart with 50+ indicators
                </div>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  {['1m', '5m', '15m', '1h', '4h', '1D', '1W'].map(tf => (
                    <button
                      key={tf}
                      className="px-3 py-1 bg-dark-card hover:bg-primary rounded text-sm transition-colors"
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Trade Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Amount (INR)</label>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-light-text font-semibold">{formatCurrency(tradeAmount)}</span>
                  <button className="text-primary hover:underline">Max</button>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Order Type</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setOrderType('market')}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      orderType === 'market' ? 'bg-primary text-white' : 'bg-dark-bg text-gray-400'
                    }`}
                  >
                    Market
                  </button>
                  <button
                    onClick={() => setOrderType('limit')}
                    className={`flex-1 py-2 rounded-lg transition-colors ${
                      orderType === 'limit' ? 'bg-primary text-white' : 'bg-dark-bg text-gray-400'
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button variant="success" size="lg" className="w-full">
                BUY {selectedPair?.baseAsset}
              </Button>
              <Button variant="danger" size="lg" className="w-full">
                SELL {selectedPair?.baseAsset}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT PANEL - 20% */}
      <div className="lg:col-span-3 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Portfolio Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">P&L Today</span>
              <span className={`font-semibold ${getChangeColor(2.3)}`}>
                +2.3%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">P&L 24h</span>
              <span className={`font-semibold ${getChangeColor(4.7)}`}>
                +4.7%
              </span>
            </div>
            <div className="h-32 flex items-center justify-center bg-dark-bg rounded-lg">
              <div className="text-center text-xs text-gray-500">
                Portfolio Chart
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Price</span>
                <span>Amount</span>
              </div>
              {orderBook.asks.slice(0, 5).reverse().map((ask, i) => (
                <div key={`ask-${i}`} className="flex justify-between text-xs">
                  <span className="text-danger">{ask.price.toFixed(2)}</span>
                  <span className="text-gray-400">{ask.amount.toFixed(4)}</span>
                </div>
              ))}
              <div className="border-t border-dark-bg my-2" />
              {orderBook.bids.slice(0, 5).map((bid, i) => (
                <div key={`bid-${i}`} className="flex justify-between text-xs">
                  <span className="text-success">{bid.price.toFixed(2)}</span>
                  <span className="text-gray-400">{bid.amount.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Price</span>
                <span>Amount</span>
              </div>
              {recentTrades.slice(0, 10).map((trade) => (
                <div key={trade.id} className="flex justify-between text-xs">
                  <span className={trade.side === 'buy' ? 'text-success' : 'text-danger'}>
                    {trade.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400">{trade.amount.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
