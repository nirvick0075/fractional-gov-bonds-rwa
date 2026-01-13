# 🎨 TradePro Design System & Components

## Color Palette

### Primary Colors
```
Primary Blue:    #1E40AF ■
Success Green:   #10B981 ■
Danger Red:      #EF4444 ■
Warning Orange:  #F59E0B ■
```

### Background Colors
```
Dark BG:         #0F172A ■
Dark Card:       #1E293B ■
Light Text:      #F8FAFC ■
```

### Trading Colors
```
Green Candle:    #10B981 ■
Red Candle:      #EF4444 ■
```

## Typography Scale

```
H1 Desktop:  72px - "TRADE ANYWHERE, ANYTIME"
H1 Mobile:   48px - "TRADE ANYWHERE, ANYTIME"
H2:          32px - Section Headers
H3:          24px - Card Titles
Body:        16px - Regular text
Small:       14px - Labels, captions
```

## Component Library

### 1. Buttons

```tsx
// Primary Button (Blue)
<Button variant="primary" size="lg">Start Trading</Button>

// Success Button (Green)
<Button variant="success" size="lg">BUY BTC</Button>

// Danger Button (Red)
<Button variant="danger" size="lg">SELL BTC</Button>

// Outline Button
<Button variant="outline" size="md">Login</Button>

// Ghost Button
<Button variant="ghost" size="sm">Cancel</Button>
```

**Sizes:** sm, md, lg
**Variants:** primary, success, danger, outline, ghost

### 2. Cards

```tsx
// Basic Card
<Card>
  <CardContent>Your content here</CardContent>
</Card>

// Card with Header
<Card>
  <CardHeader>
    <CardTitle>Portfolio Stats</CardTitle>
  </CardHeader>
  <CardContent>Stats go here</CardContent>
</Card>

// Hoverable Card
<Card hover>
  <CardContent>Hover to see effect</CardContent>
</Card>
```

### 3. Inputs

```tsx
// Basic Input
<Input placeholder="Enter amount" />

// Labeled Input
<Input label="Email Address" placeholder="your@email.com" />

// Input with Error
<Input 
  label="Password" 
  error="Password is required" 
/>
```

### 4. Modal

```tsx
const [open, setOpen] = useState(false)

<Modal isOpen={open} onClose={() => setOpen(false)} title="Deposit Funds">
  <div>Modal content here</div>
</Modal>
```

**Sizes:** sm, md, lg, xl

### 5. Tabs

```tsx
const [active, setActive] = useState('Overview')
const tabs = ['Overview', 'Security', 'Settings']

<Tabs tabs={tabs} activeTab={active} onChange={setActive} />
```

### 6. Loading States

```tsx
// Basic Skeleton
<Skeleton className="h-12 w-full" />

// Table Skeleton
<TableSkeleton rows={5} />

// Card Skeleton
<CardSkeleton />
```

## Layout Components

### Header
- Fixed navigation bar
- Logo on left
- Navigation links center
- Actions on right (notifications, wallet, profile)
- Mobile hamburger menu
- Responsive design

### Mobile Navigation
- Fixed bottom bar
- 5 main sections (Home, Markets, Trade, Wallet, Profile)
- Active state indicators
- Icon + label
- Badge support for notifications

## Page Layouts

### 1. Landing Page (/)
```
┌────────────────────────────────────┐
│   [Logo]      [Download]  [Login] │
├────────────────────────────────────┤
│                                    │
│     "TRADE ANYWHERE, ANYTIME"      │
│    Real-time crypto & stocks       │
│                                    │
│   [Start Trading]  [Watch Demo]   │
│                                    │
├────────────────────────────────────┤
│  Daily Volume  │  Users  │ Markets│
├────────────────────────────────────┤
│   [Instant Trading Card]           │
│   [Secure Wallet Card]             │
│   [Smart Tools Card]               │
└────────────────────────────────────┘
```

### 2. Dashboard (3-Column)
```
┌──────────┬──────────────────┬──────────┐
│  Wallet  │  BTC/INR Chart   │Portfolio │
│          │                  │  Stats   │
│  P&L     │  [1h 4h 1D 1W]   │          │
│          │                  │  Order   │
│  Quick   │  Trading Panel   │   Book   │
│  Pairs   │  [BUY] [SELL]    │          │
│          │                  │ Recent   │
│ Activity │                  │ Trades   │
└──────────┴──────────────────┴──────────┘
```

### 3. Trade Page (70/30 Split)
```
┌────────────────────────┬──────────┐
│  BTC/INR  ₹42.5L  +2.3%│ Quick    │
├────────────────────────┤  Trade   │
│                        │          │
│   TradingView Chart    │ [BUY]    │
│   [1m 5m 15m 1h 4h]   │ [SELL]   │
│                        │          │
│                        │ Advanced │
│                        │  Orders  │
├────────────────────────┤          │
│   Active Orders Table  │ Order    │
│   [#1 0.25 BTC Limit] │  Book    │
└────────────────────────┴──────────┘
```

### 4. Markets Page
```
┌────────────────────────────────────┐
│  [Search BTC ETH...]  [All▼]      │
├────────────────────────────────────┤
│ # │ Pair   │ Price │ 24h % │Trade│
├───┼────────┼───────┼───────┼─────┤
│⭐│BTC/INR │₹42.5L │+2.3%🟢│[Go] │
│⭐│ETH/INR │₹2.1L  │+4.7%🟢│[Go] │
│⭐│SOL/INR │₹12.4K │+8.2%🟢│[Go] │
└────────────────────────────────────┘
```

### 5. Wallet Page
```
┌────────────────────────────────────┐
│    Total Balance: ₹5,42,300        │
│    Available │ Staked              │
│    ₹4.2L     │ ₹1.22L             │
├────────────────────────────────────┤
│  [BTC Card] [ETH Card] [USDT Card]│
│  [Send][Receive][Swap]             │
├────────────────────────────────────┤
│  [Deposit] [Withdraw] [Buy] [Stake]│
└────────────────────────────────────┘
```

## Animations

### Page Transitions
- Fade in + slide up on mount
- Smooth routing transitions

### Card Hover
```css
hover:scale-105
transition-all duration-300
```

### Button Press
```css
active:scale-95
transition-all duration-200
```

### Modal
- Scale from 0.9 to 1.0
- Backdrop fade in/out
- Spring animation

### List Items
- Stagger animation (delay: index * 0.1s)
- Fade in + slide up

## Responsive Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

### Mobile Adaptations
- Bottom navigation replaces header nav
- 3-column layout becomes stacked
- Tables scroll horizontally or stack
- Cards go full width
- Reduced padding/margins

## Icon Usage

Using Lucide React icons throughout:
- `TrendingUp` / `TrendingDown` - Price changes
- `Zap` - Quick actions
- `Shield` - Security features
- `Wallet` - Wallet section
- `User` - Profile
- `Bell` - Notifications
- `ArrowUpRight` / `ArrowDownLeft` - Transfers
- `Copy` - Copy trading

## Best Practices

1. **Always use formatCurrency()** for money values
2. **Always use formatPercentage()** for % values
3. **Use getChangeColor()** for positive/negative values
4. **Add hover states** to interactive elements
5. **Include loading states** for async operations
6. **Use Card component** for all content blocks
7. **Maintain consistent spacing** using Tailwind classes

## Example Color Usage

```tsx
// Positive changes
<span className="text-success">+2.3%</span>

// Negative changes
<span className="text-danger">-1.5%</span>

// Neutral/Info
<span className="text-primary">BTC/INR</span>

// Secondary text
<span className="text-gray-400">24h Volume</span>

// Primary text
<span className="text-light-text">₹42,500</span>
```

## Grid Layouts

```tsx
// 4 columns on desktop, 2 on tablet, 1 on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// 3 columns with responsive
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// 2 columns equal
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

---

**This design system ensures consistency across the entire platform!** 🎨
