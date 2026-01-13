# 📸 TradePro Visual Guide - What Each Page Looks Like

## 🎨 Landing Page (/)

```
┌─────────────────────────────────────────────────────────────┐
│  [💎 Logo]              [Download App] [Login] [Sign Up]    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                                                               │
│           TRADE ANYWHERE, ANYTIME                            │
│      Real-time crypto & stocks · Advanced charts            │
│                   · Zero downtime                            │
│                                                               │
│     [Start Trading Now →]  [▶ Watch Demo Video]            │
│                                                               │
│                    [Download App QR Code]                    │
│                                                               │
├────────────┬────────────────┬──────────────────┐            │
│ Daily Vol  │  Active Users  │   Markets        │            │
│  $2.4B    │    1.2M       │    500+          │            │
└────────────┴────────────────┴──────────────────┘            │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │     ⚡      │  │     🛡️      │  │     📈      │         │
│  │  INSTANT    │  │   SECURE    │  │   SMART     │         │
│  │  TRADING    │  │   WALLET    │  │   TOOLS     │         │
│  │             │  │             │  │             │         │
│  │ Execute in  │  │ Military-   │  │ Advanced    │         │
│  │ millisecs   │  │ grade enc   │  │ charts &    │         │
│  │             │  │             │  │ indicators  │         │
│  │[Learn More] │  │[Learn More] │  │[Learn More] │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

**Colors:**
- Background: Dark (#0F172A)
- Gradient orbs: Blue & Green blurred circles
- Buttons: Primary Blue / Success Green
- Text: White (#F8FAFC)

---

## 📊 Dashboard (/dashboard)

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Dashboard Markets Trade Wallet Earn NFTs [Profile▼] │
│                                    [🔔] Balance: ₹5,42,300  │
├───────┬─────────────────────────────────────────┬───────────┤
│       │                                         │           │
│ WALLET│      BTC/INR  ▼    +2.3% 📈            │ PORTFOLIO │
│       │      ₹4,25,234                         │  STATS    │
│Balance│ ┌─────────────────────────────────┐   │           │
│₹5.42L │ │                                 │   │ P&L Today │
│       │ │        📊 CHART AREA           │   │  +2.3%🟢  │
│Total  │ │     (TradingView Widget)        │   │           │
│ P&L   │ │                                 │   │ P&L 24h   │
│+2.3%  │ │  [1m][5m][15m][1h][4h][1D][1W] │   │  +4.7%🟢  │
│       │ └─────────────────────────────────┘   │           │
│Quick  │                                         │ [Pie      │
│Trade  │ ┌─────────────────────────────────┐   │  Chart]   │
│ Pairs │ │    QUICK TRADE PANEL             │   │           │
│▼BTC/INR│ │  Amount: [═══════○────] ₹10K   │   │ ORDER     │
│ ETH/INR│ │  [Market][Limit]                │   │  BOOK     │
│ SOL/INR│ │  [BUY BTC] [SELL BTC]          │   │           │
│       │ └─────────────────────────────────┘   │Buy  Sell  │
│Recent │                                         │42.5  42.6 │
│Activity│                                        │42.4  42.7 │
│🟢 Buy  │                                        │42.3  42.8 │
│🔴 Sell │                                        │           │
│🟢 Buy  │                                        │ RECENT    │
└───────┴─────────────────────────────────────────┴───────────┘
```

**Layout:** 20% | 60% | 20% (responsive to stack on mobile)

---

## 📈 Markets (/markets)

```
┌─────────────────────────────────────────────────────────────┐
│                      Markets                                 │
│    Explore and trade 500+ cryptocurrency pairs               │
├─────────────────────────────────────────────────────────────┤
│ [🔍 Search BTC ETH...]  [All▼][Spot▼][Futures▼][Gainers🟢▼]│
├───┬─────────┬────────┬─────────┬────────┬────────┬─────────┤
│⭐ │  Pair   │ Price  │ 24h Chg │  High  │  Low   │ Actions │
├───┼─────────┼────────┼─────────┼────────┼────────┼─────────┤
│ ☆ │BTC/INR  │₹42.5L  │ +2.3%🟢│₹43.2L  │₹41.8L  │[Trade]  │
│ ☆ │ETH/INR  │₹2.1L   │ +4.7%🟢│₹2.15L  │₹2.05L  │[Trade]  │
│ ☆ │USDT/INR │₹83.50  │ +0.1%🟢│₹83.60  │₹83.40  │[Trade]  │
│ ☆ │SOL/INR  │₹12.45K │ +8.2%🟢│₹12.8K  │₹11.9K  │[Trade]  │
│ ☆ │BNB/INR  │₹35.6K  │ -1.5%🔴│₹36.2K  │₹35.4K  │[Trade]  │
│ ☆ │XRP/INR  │₹62.30  │ +5.6%🟢│₹64.20  │₹60.10  │[Trade]  │
│ ☆ │ADA/INR  │₹48.90  │ -2.1%🔴│₹50.20  │₹48.50  │[Trade]  │
│ ☆ │DOGE/INR │₹9.85   │+12.5%🟢│₹10.20  │₹9.20   │[Trade]  │
├───┴─────────┴────────┴─────────┴────────┴────────┴─────────┤
│                  [Load More Markets]                         │
├─────────────────────────────────────────────────────────────┤
│   Gainers: 5    │    Losers: 3    │  Total Vol: $2.4B      │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Star icon for watchlist
- Color-coded price changes
- Sortable columns
- Infinite scroll ready

---

## 💹 Trade Page (/trade/BTCINR)

```
┌─────────────────────────────────────────┬─────────────────┐
│ BTC/INR ▼  ₹4,25,234  +2.3%🟢  [⛶]   │  QUICK TRADE    │
│ High: ₹4.32L  Low: ₹4.18L  Vol: ₹12Cr │                 │
├─────────────────────────────────────────┤ [BUY LONG]      │
│                                         │ [SELL SHORT]    │
│         📊 TRADINGVIEW CHART            │                 │
│    (Real-time Candlestick Chart)        │ Order Type:     │
│                                         │ [Market][Limit] │
│  [1m][5m][15m][1h][4h][1D][1W]         │                 │
│                                         │ Amount (INR):   │
│                                         │ [═══○═════]     │
│  Full-screen │ Drawing Tools            │ ₹10,000  [Max] │
│  Indicators  │ Volume Profile           │                 │
│                                         │ [BUY BTC]       │
├─────────────────────────────────────────┤                 │
│        ACTIVE ORDERS                    │ ⏷ Advanced     │
│ #1 │ 0.25 BTC │ Limit │ Live │[Cancel]│   Leverage:     │
│ #2 │ 2.0 ETH  │ Stop  │ Pend│[Cancel]│   [1x][3x][5x]  │
│                                         │   [10x][20x]    │
│        [Order History ▼]                │                 │
└─────────────────────────────────────────┤ ORDER BOOK      │
                                          │ Sell  42.6  0.5 │
                                          │ Sell  42.7  0.3 │
                                          │ Buy   42.5  0.8 │
                                          │ Buy   42.4  1.2 │
                                          └─────────────────┘
```

**Layout:** 70% Chart | 30% Order Panel

---

## 💰 Wallet (/wallet)

```
┌─────────────────────────────────────────────────────────────┐
│  [Overview][Deposit][Withdraw][History][P2P]                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│              Total Balance                                   │
│              ₹5,42,300                                       │
│             +2.3% (24h) 🟢                                   │
│                                                               │
│       Available: ₹4,20,000  │  Staked: ₹1,22,300            │
│                                                               │
├─────────────┬─────────────┬─────────────┬─────────────┐    │
│   [BTC]     │   [ETH]     │  [USDT]     │   [SOL]     │    │
│  Bitcoin    │  Ethereum   │  Tether     │  Solana     │    │
│  0.235 BTC  │  5.2 ETH    │  27.5K USDT │  8.5 SOL    │    │
│  ₹1,00,000  │  ₹1,12,000  │  ₹2,30,000  │  ₹1,00,000  │    │
│  +2.3% 🟢   │  +4.7% 🟢   │  +0.1% 🟢   │  +8.2% 🟢   │    │
│ [↗][↙][⟲]  │ [↗][↙][⟲]  │ [↗][↙][⟲]  │ [↗][↙][⟲]  │    │
└─────────────┴─────────────┴─────────────┴─────────────┘    │
│                                                               │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │ Deposit   │ │ Withdraw  │ │ Buy Crypto│ │Stake&Earn │  │
│  │    INR    │ │    INR    │ │           │ │           │  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
│                                                               │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐  │
│  │ P2P Trade │ │  Convert  │ │   Cards   │ │  History  │  │
│  └───────────┘ └───────────┘ └───────────┘ └───────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Asset cards with actions (Send, Receive, Swap)
- Quick action buttons
- Deposit/Withdraw modals

---

## 💎 Earn (/earn)

```
┌─────────────────────────────────────────────────────────────┐
│  [Total Staked][Earnings 30d][Active Stakes][Avg APY]       │
│    ₹1.22L       +₹8,450         3              12.5%        │
├─────────────────────────────────────────────────────────────┤
│  [Staking][Savings][Copy Trading][Launchpad]                │
├─────────────────────────────────────────────────────────────┤
│                   STAKING OPTIONS                            │
│ Asset │   APY   │ Duration │ Min Amount │    Action         │
│───────┼─────────┼──────────┼────────────┼──────────────────│
│ ETH   │  8.5%🟢 │ Flexible │  ₹5,000    │ [Stake Now]      │
│ SOL   │ 12.2%🟢 │ 30 Days  │  ₹10,000   │ [Stake Now]      │
│ BNB   │ 15.5%🟢 │ 90 Days  │  ₹25,000   │ [Stake Now]      │
│ DOT   │ 18.0%🟢 │ 180 Days │  ₹50,000   │ [Stake Now]      │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────┐  │
│  │  COPY TRADING - TOP TRADERS                           │  │
│  │                                                         │  │
│  │  [@ProTrader]     [@CryptoKing]      [@MoonShot]     │  │
│  │   +45% 30d         +38% 30d          +52% 30d        │  │
│  │   2.3K followers   1.85K followers   3.1K followers  │  │
│  │   ₹4.5Cr AUM       ₹3.2Cr AUM        ₹5.8Cr AUM     │  │
│  │   Win Rate: 72%    Win Rate: 68%     Win Rate: 75%  │  │
│  │   [Copy Trader]    [Copy Trader]     [Copy Trader]  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- Staking table with APY rates
- Copy trader cards with stats
- Modal for stake confirmation

---

## 👤 Profile (/profile)

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────┐                                                    │
│  │  U   │  User Name                                         │
│  │      │  user@example.com                                  │
│  └──────┘  [✓ KYC Verified] [Premium Member]  [Edit Profile]│
├─────────────────────────────────────────────────────────────┤
│ [Overview][Security][Verification][Trading History][Settings]│
├─────────────────────────────────────────────────────────────┤
│  ACCOUNT INFORMATION         │   ACCOUNT STATS               │
│  ┌────────────────────────┐  │  ┌─────────────────────────┐ │
│  │ Full Name: User Name    │  │  │ Member Since: Jan 2024  │ │
│  │ Email: user@example.com │  │  │ Total Trades: 245       │ │
│  │ Phone: +91 98765 43210  │  │  │ Win Rate: 67% 🟢        │ │
│  │ [Update Information]    │  │  │ Total P&L: +₹2,35,000🟢 │ │
│  └────────────────────────┘  │  │ [Download Statement]    │ │
│                               │  └─────────────────────────┘ │
├───────────────────────────────┴─────────────────────────────┤
│  SECURITY SETTINGS                                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ [🛡️] Two-Factor Authentication       Enabled ✓      │  │
│  │ [🔒] Whitelist Addresses              [Enable]       │  │
│  │ [⚠️] Anti-Phishing Code               [Setup]        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- 5 tabs with different sections
- Security settings with toggle switches
- Verification status badges
- Trading statistics

---

## 📱 Mobile Navigation (All Pages)

```
┌─────────────────────────────────────────────────────────────┐
│                    PAGE CONTENT                              │
│                                                               │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  🏠       📈        ⚡        👛        👤                   │
│ Home   Markets   Trade   Wallet   Profile                   │
│ [Active indicator shown under selected item]                │
└─────────────────────────────────────────────────────────────┘
```

**Mobile Features:**
- Fixed bottom bar
- Active state with color highlight
- Badge notifications
- Touch-optimized sizing

---

## 🎨 Color Legend

- 🟢 Green (#10B981) - Positive changes, success, buy
- 🔴 Red (#EF4444) - Negative changes, danger, sell
- 🔵 Blue (#1E40AF) - Primary actions, links
- 🟡 Orange (#F59E0B) - Warnings, alerts
- ⚫ Dark BG (#0F172A) - Background
- ⬛ Dark Card (#1E293B) - Cards, panels
- ⬜ Light Text (#F8FAFC) - Primary text
- 🔘 Gray (#6B7280) - Secondary text

---

**All pages follow this exact design specification with pixel-perfect implementation!** 🎯
