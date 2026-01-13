export const mockTradingPairs = [
  { id: 'BTCINR', baseAsset: 'BTC', quoteAsset: 'INR', price: 3625000, change24h: 2.5, volume24h: 1250000000, high24h: 3650000, low24h: 3500000 },
  { id: 'ETHINR', baseAsset: 'ETH', quoteAsset: 'INR', price: 185000, change24h: 1.8, volume24h: 850000000, high24h: 188000, low24h: 182000 },
  { id: 'USDTINR', baseAsset: 'USDT', quoteAsset: 'INR', price: 83.5, change24h: 0.1, volume24h: 500000000, high24h: 83.6, low24h: 83.4 },
  { id: 'SOLINR', baseAsset: 'SOL', quoteAsset: 'INR', price: 8250, change24h: -1.2, volume24h: 320000000, high24h: 8400, low24h: 8100 },
  { id: 'BNBINR', baseAsset: 'BNB', quoteAsset: 'INR', price: 28500, change24h: 0.8, volume24h: 280000000, high24h: 29000, low24h: 28200 },
  { id: 'XRPINR', baseAsset: 'XRP', quoteAsset: 'INR', price: 45.5, change24h: -0.5, volume24h: 180000000, high24h: 46.2, low24h: 45.0 },
  { id: 'ADAINR', baseAsset: 'ADA', quoteAsset: 'INR', price: 35.8, change24h: 1.2, volume24h: 150000000, high24h: 36.5, low24h: 35.2 },
  { id: 'DOGEINR', baseAsset: 'DOGE', quoteAsset: 'INR', price: 6.75, change24h: -2.1, volume24h: 120000000, high24h: 7.0, low24h: 6.6 },
];

export const mockWalletAssets = [
  { symbol: 'BTC', name: 'Bitcoin', amount: 0.235, price: 3625000, change24h: 2.5, value: 851875 },
  { symbol: 'ETH', name: 'Ethereum', amount: 5.2, price: 185000, change24h: 1.8, value: 962000 },
  { symbol: 'USDT', name: 'Tether', amount: 27500, price: 83.5, change24h: 0.1, value: 2296250 },
  { symbol: 'SOL', name: 'Solana', amount: 8.5, price: 8250, change24h: -1.2, value: 70125 },
];

export const mockOrders = [
  { id: '1', pair: 'BTCINR', type: 'limit', side: 'buy', amount: 0.05, price: 3620000, status: 'open', timestamp: new Date(Date.now() - 3600000) },
  { id: '2', pair: 'ETHINR', type: 'market', side: 'sell', amount: 1.2, price: 185000, status: 'filled', timestamp: new Date(Date.now() - 7200000) },
  { id: '3', pair: 'SOLINR', type: 'limit', side: 'buy', amount: 10, price: 8200, status: 'open', timestamp: new Date(Date.now() - 1800000) },
];

export const mockStakingOptions = [
  { symbol: 'ETH', name: 'Ethereum 2.0', apy: 8.5, minAmount: 0.1, lockPeriod: '30 days', totalStaked: 1250000000 },
  { symbol: 'SOL', name: 'Solana', apy: 12.2, minAmount: 1, lockPeriod: 'Flexible', totalStaked: 850000000 },
  { symbol: 'BNB', name: 'BNB Staking', apy: 15.5, minAmount: 0.5, lockPeriod: '60 days', totalStaked: 650000000 },
  { symbol: 'DOT', name: 'Polkadot', apy: 18.0, minAmount: 5, lockPeriod: '90 days', totalStaked: 450000000 },
];

export const mockCopyTraders = [
  { id: '1', name: 'CryptoKing', avatar: '👑', followers: 2500, aum: 125000000, pnl30d: 45.2, winRate: 78, trades: 245 },
  { id: '2', name: 'TradeGuru', avatar: '🎯', followers: 1800, aum: 95000000, pnl30d: 38.5, winRate: 72, trades: 189 },
  { id: '3', name: 'WhaleWatch', avatar: '🐋', followers: 3200, aum: 185000000, pnl30d: 52.8, winRate: 81, trades: 312 },
];

export function generateOrderBook(pair, depth = 10) {
  const basePrice = mockTradingPairs.find(p => p.id === pair)?.price || 3625000;
  const bids = [];
  const asks = [];
  
  for (let i = 0; i < depth; i++) {
    const bidPrice = basePrice - (i + 1) * (basePrice * 0.0001);
    const askPrice = basePrice + (i + 1) * (basePrice * 0.0001);
    const amount = (Math.random() * 2 + 0.1).toFixed(4);
    
    bids.push({ price: bidPrice, amount: parseFloat(amount), total: bidPrice * amount });
    asks.push({ price: askPrice, amount: parseFloat(amount), total: askPrice * amount });
  }
  
  return { bids, asks };
}

export function generateRecentTrades(pair, count = 50) {
  const basePrice = mockTradingPairs.find(p => p.id === pair)?.price || 3625000;
  const trades = [];
  
  for (let i = 0; i < count; i++) {
    const variation = (Math.random() - 0.5) * 0.002;
    trades.push({
      price: basePrice * (1 + variation),
      amount: (Math.random() * 2 + 0.05).toFixed(4),
      timestamp: new Date(Date.now() - i * 10000),
      side: Math.random() > 0.5 ? 'buy' : 'sell'
    });
  }
  
  return trades;
}

export const platformStats = {
  dailyVolume: 2400000000,
  activeUsers: 1200000,
  totalMarkets: 500,
  totalGainers: 5,
  totalLosers: 3,
};
