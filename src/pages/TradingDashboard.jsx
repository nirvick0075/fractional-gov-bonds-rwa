import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Activity, Star } from 'lucide-react';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useTradingStore from '../store/tradingStore';
import { mockTradingPairs, generateOrderBook, generateRecentTrades } from '../lib/mockData';
import { formatCurrency, formatPercentage, getChangeColor } from '../lib/utils';

const TradingDashboard = () => {
  const { walletBalance, totalPnL, selectedPair } = useTradingStore();
  const [amount, setAmount] = useState(50000);
  const orderBook = generateOrderBook(selectedPair.id, 10);
  const recentTrades = generateRecentTrades(selectedPair.id, 15);
  
  const quickPairs = mockTradingPairs.slice(0, 4);
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - 20% */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Wallet Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">
                  {formatCurrency(walletBalance)}
                </div>
                <div className={`text-sm ${getChangeColor(totalPnL)}`}>
                  {formatPercentage(totalPnL)} (24h)
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Pairs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickPairs.map((pair) => (
                  <Link
                    key={pair.id}
                    to={`/trade/${pair.id}`}
                    className="flex justify-between items-center hover:bg-white/5 p-2 rounded transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-white text-sm">{pair.baseAsset}</div>
                      <div className="text-xs text-gray-400">{formatCurrency(pair.price)}</div>
                    </div>
                    <div className={`text-sm font-semibold ${getChangeColor(pair.change24h)}`}>
                      {formatPercentage(pair.change24h)}
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <TrendingUp size={14} className="text-success" />
                  <span className="text-gray-400">Bought 0.05 BTC</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <TrendingDown size={14} className="text-danger" />
                  <span className="text-gray-400">Sold 1.2 ETH</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Activity size={14} className="text-primary" />
                  <span className="text-gray-400">Staked 10 SOL</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content - 60% */}
          <div className="lg:col-span-7 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedPair.baseAsset}/{selectedPair.quoteAsset}</CardTitle>
                    <div className="text-2xl font-bold text-white mt-2">
                      {formatCurrency(selectedPair.price)}
                    </div>
                    <div className={`text-sm ${getChangeColor(selectedPair.change24h)}`}>
                      {formatPercentage(selectedPair.change24h)}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Star size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-dark-bg rounded-lg p-6 flex items-center justify-center h-64">
                  <div className="text-center">
                    <Activity size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Chart Placeholder</p>
                    <p className="text-sm text-gray-500 mt-2">TradingView chart integration ready</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  {['1m', '5m', '15m', '1h', '4h', '1d', '1w'].map((tf) => (
                    <button
                      key={tf}
                      className="px-3 py-1 text-sm bg-dark-bg rounded hover:bg-primary/20 text-gray-400 hover:text-primary transition-colors"
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Amount (INR)</label>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-400">₹1K</span>
                      <span className="text-white font-semibold">{formatCurrency(amount)}</span>
                      <span className="text-sm text-gray-400">₹100K</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="success" className="w-full">Buy {selectedPair.baseAsset}</Button>
                    <Button variant="danger" className="w-full">Sell {selectedPair.baseAsset}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Sidebar - 20% */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Portfolio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Total Balance</span>
                  <span className="font-semibold text-white">{formatCurrency(walletBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">24h P&L</span>
                  <span className={`font-semibold ${getChangeColor(totalPnL)}`}>
                    {formatPercentage(totalPnL)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Available</span>
                  <span className="font-semibold text-white">{formatCurrency(walletBalance * 0.8)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Order Book</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="text-xs text-gray-400 grid grid-cols-3 gap-2 mb-2">
                    <span>Price</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">Total</span>
                  </div>
                  {orderBook.asks.slice(0, 5).reverse().map((ask, i) => (
                    <div key={i} className="text-xs grid grid-cols-3 gap-2">
                      <span className="text-danger">{formatCurrency(ask.price)}</span>
                      <span className="text-right text-gray-400">{ask.amount}</span>
                      <span className="text-right text-gray-400">{formatCurrency(ask.total)}</span>
                    </div>
                  ))}
                  <div className="py-2 text-center font-bold text-white border-y border-gray-800">
                    {formatCurrency(selectedPair.price)}
                  </div>
                  {orderBook.bids.slice(0, 5).map((bid, i) => (
                    <div key={i} className="text-xs grid grid-cols-3 gap-2">
                      <span className="text-success">{formatCurrency(bid.price)}</span>
                      <span className="text-right text-gray-400">{bid.amount}</span>
                      <span className="text-right text-gray-400">{formatCurrency(bid.total)}</span>
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
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {recentTrades.slice(0, 10).map((trade, i) => (
                    <div key={i} className="text-xs grid grid-cols-3 gap-2">
                      <span className={trade.side === 'buy' ? 'text-success' : 'text-danger'}>
                        {formatCurrency(trade.price)}
                      </span>
                      <span className="text-right text-gray-400">{trade.amount}</span>
                      <span className="text-right text-gray-500">
                        {new Date(trade.timestamp).toLocaleTimeString('en-IN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <MobileNav />
    </>
  );
};

export default TradingDashboard;
