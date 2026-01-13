import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Activity, ChevronDown, Maximize2 } from 'lucide-react';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import useTradingStore from '../store/tradingStore';
import { mockTradingPairs, mockOrders, generateOrderBook } from '../lib/mockData';
import { formatCurrency, formatPercentage, getChangeColor } from '../lib/utils';

const Trade = () => {
  const { pair: pairId } = useParams();
  const { orders, addOrder, cancelOrder } = useTradingStore();
  const [orderType, setOrderType] = useState('market');
  const [side, setSide] = useState('long');
  const [amount, setAmount] = useState(50000);
  const [leverage, setLeverage] = useState(1);
  
  const currentPair = mockTradingPairs.find(p => p.id === pairId) || mockTradingPairs[0];
  const orderBook = generateOrderBook(currentPair.id, 10);
  
  const handlePlaceOrder = () => {
    addOrder({
      pair: currentPair.id,
      type: orderType,
      side: side === 'long' ? 'buy' : 'sell',
      amount: amount / currentPair.price,
      price: currentPair.price
    });
  };
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart Section - 70% */}
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-dark-bg rounded-lg text-white">
                      <span className="font-bold">{currentPair.baseAsset}/{currentPair.quoteAsset}</span>
                      <ChevronDown size={16} />
                    </button>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {formatCurrency(currentPair.price)}
                      </div>
                      <div className={`text-sm ${getChangeColor(currentPair.change24h)}`}>
                        {formatPercentage(currentPair.change24h)}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Maximize2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-dark-bg rounded-lg p-8 flex items-center justify-center h-96">
                  <div className="text-center">
                    <Activity size={64} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Trading Chart</p>
                    <p className="text-sm text-gray-500 mt-2">TradingView integration ready</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 flex-wrap">
                  {['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'].map((tf) => (
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
            
            {/* Active Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No active orders</p>
                ) : (
                  <div className="space-y-2">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 bg-dark-bg rounded-lg"
                      >
                        <div>
                          <div className="font-semibold text-white">
                            {order.side === 'buy' ? 'Buy' : 'Sell'} {order.amount.toFixed(4)} {currentPair.baseAsset}
                          </div>
                          <div className="text-sm text-gray-400">
                            {order.type} @ {formatCurrency(order.price)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => cancelOrder(order.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Order Panel - 30% */}
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSide('long')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                      side === 'long'
                        ? 'bg-success text-white'
                        : 'bg-dark-bg text-gray-400'
                    }`}
                  >
                    Buy Long
                  </button>
                  <button
                    onClick={() => setSide('short')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                      side === 'short'
                        ? 'bg-danger text-white'
                        : 'bg-dark-bg text-gray-400'
                    }`}
                  >
                    Sell Short
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultTab={0}
                  tabs={[
                    {
                      label: 'Market',
                      content: (
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-400 mb-2 block">Amount (INR)</label>
                            <input
                              type="range"
                              min="1000"
                              max="1000000"
                              value={amount}
                              onChange={(e) => setAmount(Number(e.target.value))}
                              className="w-full"
                            />
                            <div className="flex justify-between mt-2">
                              <span className="text-sm text-gray-400">₹1K</span>
                              <span className="text-white font-semibold">{formatCurrency(amount)}</span>
                              <span className="text-sm text-gray-400">₹1M</span>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm text-gray-400 mb-2 block">Leverage: {leverage}x</label>
                            <input
                              type="range"
                              min="1"
                              max="20"
                              value={leverage}
                              onChange={(e) => setLeverage(Number(e.target.value))}
                              className="w-full"
                            />
                            <div className="flex justify-between mt-2 text-sm text-gray-400">
                              <span>1x</span>
                              <span>20x</span>
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-800 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">You'll Get</span>
                              <span className="text-white font-semibold">
                                {((amount * leverage) / currentPair.price).toFixed(6)} {currentPair.baseAsset}
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            variant={side === 'long' ? 'success' : 'danger'}
                            className="w-full"
                            size="lg"
                            onClick={handlePlaceOrder}
                          >
                            {side === 'long' ? 'Buy' : 'Sell'} {currentPair.baseAsset}
                          </Button>
                        </div>
                      ),
                    },
                    {
                      label: 'Limit',
                      content: <div className="text-gray-400 py-4 text-center">Limit order panel</div>,
                    },
                    {
                      label: 'Stop',
                      content: <div className="text-gray-400 py-4 text-center">Stop order panel</div>,
                    },
                  ]}
                />
              </CardContent>
            </Card>
            
            {/* Order Book Mini */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Order Book</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {orderBook.asks.slice(0, 5).reverse().map((ask, i) => (
                    <div key={i} className="text-xs grid grid-cols-2 gap-2">
                      <span className="text-danger">{formatCurrency(ask.price)}</span>
                      <span className="text-right text-gray-400">{ask.amount}</span>
                    </div>
                  ))}
                  <div className="py-2 text-center font-bold text-white border-y border-gray-800 text-sm">
                    {formatCurrency(currentPair.price)}
                  </div>
                  {orderBook.bids.slice(0, 5).map((bid, i) => (
                    <div key={i} className="text-xs grid grid-cols-2 gap-2">
                      <span className="text-success">{formatCurrency(bid.price)}</span>
                      <span className="text-right text-gray-400">{bid.amount}</span>
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

export default Trade;
