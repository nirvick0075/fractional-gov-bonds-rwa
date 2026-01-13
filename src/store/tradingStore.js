import { create } from 'zustand';
import { mockTradingPairs, mockWalletAssets, mockOrders } from '../lib/mockData';

const useTradingStore = create((set) => ({
  walletBalance: 542300,
  walletAssets: mockWalletAssets,
  totalPnL: 2.3,
  selectedPair: mockTradingPairs[0],
  orders: mockOrders,
  theme: 'dark',
  
  setSelectedPair: (pair) => set({ selectedPair: pair }),
  
  addOrder: (order) => set((state) => ({
    orders: [{ ...order, id: Date.now().toString(), status: 'open', timestamp: new Date() }, ...state.orders]
  })),
  
  cancelOrder: (orderId) => set((state) => ({
    orders: state.orders.filter(order => order.id !== orderId)
  })),
  
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'dark' ? 'light' : 'dark'
  })),
}));

export default useTradingStore;
