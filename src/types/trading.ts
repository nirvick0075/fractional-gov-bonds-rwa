export interface Asset {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
  marketCap: number
  supply: number
}

export interface TradingPair {
  id: string
  baseAsset: string
  quoteAsset: string
  price: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

export interface Order {
  id: string
  pair: string
  type: 'market' | 'limit' | 'stop' | 'stop-limit'
  side: 'buy' | 'sell'
  amount: number
  price: number
  status: 'pending' | 'filled' | 'cancelled' | 'partial'
  timestamp: number
}

export interface WalletAsset {
  symbol: string
  name: string
  amount: number
  value: number
  change24h: number
}

export interface StakingOption {
  id: string
  asset: string
  apy: number
  duration: string
  minAmount: number
  isFlexible: boolean
}

export interface CopyTrader {
  id: string
  username: string
  avatar: string
  pnl30d: number
  followers: number
  aum: number
  winRate: number
}

export interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

export interface Trade {
  id: string
  price: number
  amount: number
  side: 'buy' | 'sell'
  timestamp: number
}
