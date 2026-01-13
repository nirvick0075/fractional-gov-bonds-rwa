import { create } from 'zustand'
import { WalletAsset, Order, TradingPair } from '@/types/trading'
import { mockWalletAssets, mockOrders, mockTradingPairs } from '@/lib/mockData'

interface TradingStore {
  // Wallet
  walletBalance: number
  walletAssets: WalletAsset[]
  totalPnL: number
  
  // Trading
  selectedPair: TradingPair | null
  orders: Order[]
  
  // UI
  theme: 'dark' | 'light'
  
  // Actions
  setSelectedPair: (pair: TradingPair) => void
  addOrder: (order: Order) => void
  cancelOrder: (orderId: string) => void
  toggleTheme: () => void
}

export const useTradingStore = create<TradingStore>((set) => ({
  // Initial state
  walletBalance: 542300,
  walletAssets: mockWalletAssets,
  totalPnL: 2.3,
  selectedPair: mockTradingPairs[0],
  orders: mockOrders,
  theme: 'dark',
  
  // Actions
  setSelectedPair: (pair) => set({ selectedPair: pair }),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  cancelOrder: (orderId) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' as const } : order
    )
  })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}))
