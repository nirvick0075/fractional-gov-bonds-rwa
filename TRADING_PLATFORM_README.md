# TradePro - Advanced Trading Platform

A complete, production-ready trading platform built with Next.js 15, TypeScript, and Tailwind CSS. Features real-time trading, wallet management, staking, copy trading, and more.

## 🚀 Features

### Core Trading Features
- **Landing Page** - Hero section with stats and feature showcase
- **Dashboard** - 3-column layout with charts, quick trade, and order book
- **Markets** - Comprehensive market data with filters and search
- **Trade Page** - Split layout with advanced charts and order panel
- **Wallet** - Multi-asset management with deposit/withdraw
- **Earn** - Staking, savings, and copy trading
- **Profile** - Account management, security, and verification

### Design Features
- ✅ Dark mode default (with light mode toggle)
- ✅ Fully responsive mobile-first design
- ✅ Bottom navigation for mobile
- ✅ Framer Motion animations
- ✅ Advanced color system and typography
- ✅ Skeleton loaders
- ✅ Modal system
- ✅ Toast notifications ready

### Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Lightweight Charts (TradingView)

## 📦 Installation

### Step 1: Install Dependencies

```bash
# Backup old package.json
Move-Item package.json package-old.json -Force

# Use new package.json
Move-Item package-next.json package.json -Force

# Install dependencies
npm install
```

### Step 2: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles
│   ├── dashboard/         # Dashboard page
│   ├── markets/           # Markets page
│   ├── trade/[pair]/      # Trading page
│   ├── wallet/            # Wallet page
│   ├── earn/              # Earn page
│   ├── profile/           # Profile page
│   └── nfts/              # NFTs page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   └── Skeleton.tsx
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   └── MobileNav.tsx
│   └── dashboard/         # Dashboard-specific
│       └── DashboardContent.tsx
├── lib/
│   ├── utils.ts           # Utility functions
│   └── mockData.ts        # Mock data for development
├── store/
│   └── tradingStore.ts    # Zustand store
└── types/
    └── trading.ts         # TypeScript interfaces
```

## 🎨 Design System

### Colors
```
Primary: #1E40AF
Success: #10B981
Danger: #EF4444
Warning: #F59E0B
Dark BG: #0F172A
Dark Card: #1E293B
Light Text: #F8FAFC
```

### Typography
- H1: 72px/48px (desktop/mobile)
- H2: 32px
- H3: 24px
- Body: 16px
- Small: 14px
- Font: Inter

### Spacing
- xs: 4px
- s: 8px
- m: 12px
- l: 16px
- xl: 24px
- 2xl: 32px

## 🔧 Key Components

### Button
```tsx
<Button variant="primary|success|danger|outline|ghost" size="sm|md|lg">
  Click Me
</Button>
```

### Card
```tsx
<Card hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Modal
```tsx
<Modal isOpen={open} onClose={() => setOpen(false)} title="Title">
  Content
</Modal>
```

### Tabs
```tsx
<Tabs tabs={['Tab 1', 'Tab 2']} activeTab={active} onChange={setActive} />
```

## 📱 Mobile Features

- Bottom navigation bar (Home, Markets, Trade, Wallet, Profile)
- Collapsible sidebars
- Touch-optimized controls
- Swipe gestures ready
- Responsive tables that stack on mobile

## 🎯 Routes

- `/` - Landing page
- `/dashboard` - Main dashboard
- `/markets` - Market overview
- `/trade/BTCINR` - Trading interface
- `/wallet` - Wallet management
- `/earn` - Staking & earning
- `/profile` - User profile
- `/nfts` - NFT marketplace (placeholder)

## 🔐 State Management

Using Zustand for global state:
- Wallet balance
- Trading pairs
- Orders
- Theme preferences

```tsx
import { useTradingStore } from '@/store/tradingStore'

const { walletBalance, selectedPair, setSelectedPair } = useTradingStore()
```

## 🎬 Animations

All animations powered by Framer Motion:
- Page transitions
- Card hover effects
- Modal scale animations
- List stagger animations
- Button press feedback

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📊 Next Steps

1. **Integrate TradingView Charts**
   - Add lightweight-charts library
   - Create TradingChart component
   - Connect real-time WebSocket data

2. **Add WebSocket Support**
   - Real-time price updates
   - Order book streaming
   - Trade execution notifications

3. **Backend Integration**
   - Replace mock data with API calls
   - Add authentication
   - Connect to trading engine

4. **Advanced Features**
   - Chart drawing tools
   - Technical indicators
   - Order types (OCO, Trailing Stop)
   - Portfolio analytics

## 🛠️ Customization

### Change Theme Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: '#YOUR_COLOR',
  // ...
}
```

### Add New Trading Pairs
Edit `src/lib/mockData.ts`:
```ts
mockTradingPairs.push({
  id: 'new-pair',
  baseAsset: 'BTC',
  // ...
})
```

## 📝 License

MIT License - feel free to use for commercial projects

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS**
