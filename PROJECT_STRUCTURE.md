# 📁 Project File Structure - Visual Guide

```
fractional-gov-bonds-rwa/
│
├── 📄 Configuration Files
│   ├── next.config.js              # Next.js configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.ts          # Tailwind CSS + Design tokens
│   ├── tailwind.config.js          # (old - can be removed)
│   ├── package.json                # Next.js dependencies
│   ├── package-next.json           # Backup
│   ├── package-old.json            # Original Vite config (backup)
│   ├── postcss.config.js           # PostCSS for Tailwind
│   └── eslint.config.js            # ESLint configuration
│
├── 🚀 Setup & Documentation
│   ├── setup-trading-platform.ps1  # Automated setup script
│   ├── QUICKSTART.md               # Quick start guide
│   ├── TRADING_PLATFORM_README.md  # Complete documentation
│   ├── DESIGN_SYSTEM.md            # Design system reference
│   ├── IMPLEMENTATION_SUMMARY.md   # This implementation summary
│   ├── PROJECT_STRUCTURE.md        # This file
│   └── README.md                   # Original project readme
│
├── 📱 Source Code (src/)
│   │
│   ├── 📄 app/                     # Next.js 15 App Router
│   │   ├── layout.tsx              # Root layout (Header wrapper)
│   │   ├── page.tsx                # Landing page (/)
│   │   ├── globals.css             # Global Tailwind styles
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard page (/dashboard)
│   │   │
│   │   ├── markets/
│   │   │   └── page.tsx            # Markets page (/markets)
│   │   │
│   │   ├── trade/
│   │   │   └── [pair]/
│   │   │       └── page.tsx        # Trade page (/trade/BTCINR)
│   │   │
│   │   ├── wallet/
│   │   │   └── page.tsx            # Wallet page (/wallet)
│   │   │
│   │   ├── earn/
│   │   │   └── page.tsx            # Earn page (/earn)
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx            # Profile page (/profile)
│   │   │
│   │   └── nfts/
│   │       └── page.tsx            # NFTs page (/nfts)
│   │
│   ├── 🎨 components/              # React Components
│   │   │
│   │   ├── ui/                     # Reusable UI Components
│   │   │   ├── Button.tsx          # Button component (5 variants)
│   │   │   ├── Card.tsx            # Card component + Header/Title/Content
│   │   │   ├── Input.tsx           # Input component with labels
│   │   │   ├── Modal.tsx           # Animated modal component
│   │   │   ├── Tabs.tsx            # Animated tabs component
│   │   │   └── Skeleton.tsx        # Loading skeleton components
│   │   │
│   │   ├── layout/                 # Layout Components
│   │   │   ├── Header.tsx          # Main navigation header
│   │   │   └── MobileNav.tsx       # Bottom mobile navigation
│   │   │
│   │   └── dashboard/              # Page-specific Components
│   │       └── DashboardContent.tsx # Dashboard 3-column content
│   │
│   ├── 📚 lib/                     # Library Code
│   │   ├── utils.ts                # Utility functions
│   │   │                           # - formatCurrency()
│   │   │                           # - formatPercentage()
│   │   │                           # - getChangeColor()
│   │   │                           # - cn() (className merger)
│   │   │
│   │   └── mockData.ts             # Mock Trading Data
│   │                               # - mockTradingPairs (8 pairs)
│   │                               # - mockWalletAssets (4 assets)
│   │                               # - mockOrders (3 orders)
│   │                               # - mockStakingOptions (4 options)
│   │                               # - mockCopyTraders (3 traders)
│   │                               # - generateOrderBook()
│   │                               # - generateRecentTrades()
│   │
│   ├── 🏪 store/                   # State Management
│   │   └── tradingStore.ts         # Zustand store
│   │                               # - walletBalance
│   │                               # - walletAssets
│   │                               # - selectedPair
│   │                               # - orders
│   │                               # - theme
│   │
│   └── 📝 types/                   # TypeScript Types
│       └── trading.ts              # Type definitions
│                                   # - Asset
│                                   # - TradingPair
│                                   # - Order
│                                   # - WalletAsset
│                                   # - StakingOption
│                                   # - CopyTrader
│                                   # - OrderBookEntry
│                                   # - Trade
│
└── 🗂️ Old Project Files (Optional to keep)
    ├── contracts/                  # Solidity contracts (old)
    ├── public/                     # Static assets
    ├── index.html                  # Vite entry (not used)
    ├── vite.config.js              # Vite config (not used)
    └── src/ (old)                  # Old Vite React files
        ├── App.jsx                 # (replaced by Next.js)
        ├── main.jsx                # (replaced by Next.js)
        ├── components/             # (old components)
        ├── pages/                  # (old pages)
        └── ...                     # (other old files)
```

## 🎯 Key Directories Explained

### `/src/app/` - Pages
This is where all your pages live. Each folder = route.
- `page.tsx` files are the actual page components
- `layout.tsx` wraps all pages with Header
- Uses Next.js 15 App Router conventions

### `/src/components/ui/` - UI Components
Reusable components used across all pages:
- **Button** - Used in all pages for actions
- **Card** - Container component for content blocks
- **Input** - Form inputs with styling
- **Modal** - Popup dialogs (used in Wallet, Earn)
- **Tabs** - Tab navigation (used in Wallet, Earn, Profile)
- **Skeleton** - Loading states

### `/src/components/layout/` - Layout Components
- **Header** - Top navigation bar (desktop + mobile)
- **MobileNav** - Bottom navigation bar (mobile only)

### `/src/lib/` - Utilities & Data
- **utils.ts** - Helper functions for formatting
- **mockData.ts** - All mock trading data

### `/src/store/` - State Management
- **tradingStore.ts** - Global state using Zustand

### `/src/types/` - TypeScript
- **trading.ts** - All type definitions

## 📊 Page Component Breakdown

### Landing Page (`app/page.tsx`)
- ✅ Hero section
- ✅ Stats row
- ✅ Feature cards
- ✅ CTA section
- ✅ Footer

### Dashboard (`app/dashboard/page.tsx`)
- ✅ Uses `DashboardContent.tsx` component
- ✅ 3-column responsive grid
- ✅ Chart placeholder
- ✅ Quick trade panel
- ✅ Order book & trades

### Markets (`app/markets/page.tsx`)
- ✅ Filter bar with search
- ✅ Responsive data table
- ✅ 8 trading pairs
- ✅ Stats cards at bottom

### Trade (`app/trade/[pair]/page.tsx`)
- ✅ Dynamic route parameter
- ✅ 70/30 split layout
- ✅ Chart placeholder
- ✅ Order panel with slider
- ✅ Active orders table

### Wallet (`app/wallet/page.tsx`)
- ✅ 5 tabs (Overview, Deposit, Withdraw, History, P2P)
- ✅ Total balance display
- ✅ Asset cards grid
- ✅ Quick actions
- ✅ Modals for deposit/withdraw

### Earn (`app/earn/page.tsx`)
- ✅ 4 tabs (Staking, Savings, Copy Trading, Launchpad)
- ✅ Stats cards
- ✅ Staking options table
- ✅ Copy trader cards
- ✅ Stake modal

### Profile (`app/profile/page.tsx`)
- ✅ 5 tabs (Overview, Security, Verification, History, Settings)
- ✅ Profile header
- ✅ Account forms
- ✅ Security settings
- ✅ Verification status

## 🔍 How to Find Things

### Need to change colors?
→ `tailwind.config.ts` (lines 12-23)

### Need to add a trading pair?
→ `src/lib/mockData.ts` (lines 5-14)

### Need to modify a page?
→ `src/app/[page-name]/page.tsx`

### Need to edit a component?
→ `src/components/ui/[component-name].tsx`

### Need to change global styles?
→ `src/app/globals.css`

### Need to add state?
→ `src/store/tradingStore.ts`

### Need to add types?
→ `src/types/trading.ts`

## 🚀 File Priorities

### ⭐ Essential Files (Don't Delete)
- All files in `src/app/`
- All files in `src/components/`
- All files in `src/lib/`
- All files in `src/store/`
- All files in `src/types/`
- `next.config.js`
- `tsconfig.json`
- `tailwind.config.ts`
- `package.json`

### 📦 Optional Files (Can Remove)
- Old `src/` React files (if migrating fully)
- `contracts/` (old Solidity files)
- `vite.config.js`
- `index.html`
- `package-old.json` (backup)

## 📝 Quick Edit Guide

### To add a new page:
1. Create `src/app/new-page/page.tsx`
2. Add link in `Header.tsx`
3. Add to `MobileNav.tsx` if needed

### To add a new component:
1. Create `src/components/ui/NewComponent.tsx`
2. Export it
3. Import and use in pages

### To add mock data:
1. Edit `src/lib/mockData.ts`
2. Add to appropriate array
3. Import in your page

---

**Use this guide to navigate the 40+ files in this project!** 🗺️
