import { TradingPair, WalletAsset, Order, StakingOption, CopyTrader, OrderBookEntry, Trade } from '@/types/trading'

export const mockTradingPairs: TradingPair[] = [
  { id: '1', baseAsset: 'BTC', quoteAsset: 'INR', price: 4250234, change24h: 2.3, volume24h: 12000000, high24h: 4320000, low24h: 4180000 },
  { id: '2', baseAsset: 'ETH', quoteAsset: 'INR', price: 210500, change24h: 4.7, volume24h: 8500000, high24h: 215000, low24h: 205000 },
  { id: '3', baseAsset: 'USDT', quoteAsset: 'INR', price: 83.50, change24h: 0.1, volume24h: 50000000, high24h: 83.60, low24h: 83.40 },
  { id: '4', baseAsset: 'SOL', quoteAsset: 'INR', price: 12450, change24h: 8.2, volume24h: 3200000, high24h: 12800, low24h: 11900 },
  { id: '5', baseAsset: 'BNB', quoteAsset: 'INR', price: 35600, change24h: -1.5, volume24h: 2800000, high24h: 36200, low24h: 35400 },
  { id: '6', baseAsset: 'XRP', quoteAsset: 'INR', price: 62.30, change24h: 5.6, volume24h: 4500000, high24h: 64.20, low24h: 60.10 },
  { id: '7', baseAsset: 'ADA', quoteAsset: 'INR', price: 48.90, change24h: -2.1, volume24h: 1800000, high24h: 50.20, low24h: 48.50 },
  { id: '8', baseAsset: 'DOGE', quoteAsset: 'INR', price: 9.85, change24h: 12.5, volume24h: 6200000, high24h: 10.20, low24h: 9.20 },
]

export const mockWalletAssets: WalletAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.235, value: 100000, change24h: 2.3 },
  { symbol: 'ETH', name: 'Ethereum', amount: 5.2, value: 112000, change24h: 4.7 },
  { symbol: 'USDT', name: 'Tether', amount: 27500, value: 230000, change24h: 0.1 },
  { symbol: 'SOL', name: 'Solana', amount: 8.5, value: 100000, change24h: 8.2 },
]

export const mockOrders: Order[] = [
  { id: '1', pair: 'BTC/INR', type: 'limit', side: 'buy', amount: 0.25, price: 4250000, status: 'pending', timestamp: Date.now() - 3600000 },
  { id: '2', pair: 'ETH/INR', type: 'stop', side: 'sell', amount: 2.0, price: 210000, status: 'pending', timestamp: Date.now() - 7200000 },
  { id: '3', pair: 'SOL/INR', type: 'market', side: 'buy', amount: 5.0, price: 12450, status: 'filled', timestamp: Date.now() - 10800000 },
]

export const mockStakingOptions: StakingOption[] = [
  { id: '1', asset: 'ETH', apy: 8.5, duration: 'Flexible', minAmount: 5000, isFlexible: true },
  { id: '2', asset: 'SOL', apy: 12.2, duration: '30 Days', minAmount: 10000, isFlexible: false },
  { id: '3', asset: 'BNB', apy: 15.5, duration: '90 Days', minAmount: 25000, isFlexible: false },
  { id: '4', asset: 'DOT', apy: 18.0, duration: '180 Days', minAmount: 50000, isFlexible: false },
]

export const mockCopyTraders: CopyTrader[] = [
  { id: '1', username: '@ProTrader', avatar: '', pnl30d: 45, followers: 2300, aum: 45000000, winRate: 72 },
  { id: '2', username: '@CryptoKing', avatar: '', pnl30d: 38, followers: 1850, aum: 32000000, winRate: 68 },
  { id: '3', username: '@MoonShot', avatar: '', pnl30d: 52, followers: 3100, aum: 58000000, winRate: 75 },
]

export const generateOrderBook = (basePrice: number): { bids: OrderBookEntry[], asks: OrderBookEntry[] } => {
  const bids: OrderBookEntry[] = []
  const asks: OrderBookEntry[] = []
  
  for (let i = 0; i < 20; i++) {
    bids.push({
      price: basePrice - (i * basePrice * 0.0001),
      amount: Math.random() * 2,
      total: 0
    })
    asks.push({
      price: basePrice + (i * basePrice * 0.0001),
      amount: Math.random() * 2,
      total: 0
    })
  }
  
  return { bids, asks }
}

export const generateRecentTrades = (basePrice: number): Trade[] => {
  const trades: Trade[] = []
  
  for (let i = 0; i < 50; i++) {
    trades.push({
      id: `trade-${i}`,
      price: basePrice + (Math.random() - 0.5) * basePrice * 0.001,
      amount: Math.random() * 1,
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      timestamp: Date.now() - i * 10000
    })
  }
  
  return trades
}

export const platformStats = {
  dailyVolume: 2400000000,
  activeUsers: 1200000,
  totalMarkets: 500,
}
