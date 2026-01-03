# 🏛️ BondChain - Tokenized Government Bond Trading Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Ethers.js](https://img.shields.io/badge/Ethers.js-6.x-8B5CF6?style=for-the-badge&logo=ethereum)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity)

**Next-Generation Government Bond Trading Powered by Blockchain**

[Live Demo](#) · [Documentation](#) · [Smart Contracts](./contracts/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Smart Contracts](#-smart-contracts)
- [User Flows](#-user-flows)
- [Security](#-security)
- [License](#-license)

---

## 🎯 Overview

**BondChain** is a production-grade Web3 platform that tokenizes government bonds into fractional digital assets on the Ethereum blockchain. It enables retail investors to buy, sell, and liquidate government bonds instantly with complete transparency and automated yield distribution.

### Why BondChain?

- 💰 **Accessible:** Invest in government bonds with as little as $100
- ⚡ **Fast:** Instant liquidation and 24/7 trading
- 🔒 **Secure:** Non-custodial architecture with audited smart contracts
- 🌍 **Global:** Access bonds from multiple sovereign issuers
- 📊 **Transparent:** All transactions recorded on-chain

---

## ✨ Core Features

### 🔐 **1. Wallet-Based Authentication**
- Connect via MetaMask or WalletConnect
- No username/password required
- Real-time wallet balance and network display
- Multi-network support (Ethereum, Polygon, Sepolia)

### 📜 **2. Tokenized Government Bonds (RWA)**
- ERC-20 compliant bond tokens
- Fractional ownership support
- Complete metadata: issuer, maturity, coupon rate, risk rating
- Available bonds from US, UK, Germany, Japan, France

### ⚡ **3. Bond Liquidation & Trading**
- **Primary Market:** Buy new bond issuances
- **Secondary Market:** Trade with other investors
- Real-time price and yield updates
- Instant on-chain settlement
- Marketplace listings with discounts

### 📊 **4. Portfolio Dashboard**
- Total portfolio value tracking
- Active bond holdings
- Profit & Loss calculations
- Accrued interest display
- Complete transaction history
- Performance metrics

### 💰 **5. Automated Yield Distribution**
- Smart contract-based coupon payments
- One-click coupon claiming
- Transparent yield calculations
- Semi-annual payment schedule

### 🔍 **6. On-Chain Transparency**
- Every trade recorded on blockchain
- Transaction hash links
- Blockchain explorer integration
- Proof of ownership
- Immutable audit trail

### 🛡️ **7. Security & Trust**
- Non-custodial architecture (you control your funds)
- Audited smart contracts
- Government-backed labeling
- Comprehensive risk disclosure
- Emergency pause functionality

---

## 🛠 Tech Stack

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS with dark mode
- **Routing:** React Router DOM 7.11.0
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

### Web3
- **Library:** Ethers.js 6.x
- **Wallet:** Wagmi + Viem
- **Networks:** Ethereum, Polygon, Sepolia testnet
- **Standards:** ERC-20 tokens

### Smart Contracts
- **Language:** Solidity ^0.8.20
- **Features:**
  - Government Bond Token (ERC-20)
  - Marketplace for secondary trading
  - Automated coupon distribution
  - Reentrancy protection
  - Pausable controls

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MetaMask or WalletConnect wallet
- Modern web browser

### Installation

```bash
# Clone repository
git clone <repo-url>
cd bond-token-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:5173
```

### Building for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
bond-token-frontend/
├── contracts/              # Smart contracts
│   ├── GovernmentBondToken.sol
│   └── BondMarketplace.sol
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── BondCard.jsx
│   │   ├── Modal.jsx
│   │   ├── Alert.jsx
│   │   └── LoadingSpinner.jsx
│   ├── pages/            # Main pages
│   │   ├── Home.jsx
│   │   ├── Marketplace.jsx
│   │   ├── Dashboard.jsx
│   │   └── BondDetails.jsx
│   ├── context/          # React Context
│   │   └── Web3Context.jsx
│   ├── config/           # Configurations
│   │   └── contracts.js
│   ├── utils/            # Helper functions
│   │   └── bondUtils.js
│   ├── data/             # Mock data
│   │   └── mockData.js
│   └── App.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 📝 Smart Contracts

### GovernmentBondToken.sol

Implements a tokenized government bond as an ERC-20 token with additional features:

**Key Functions:**
- `calculatePendingCoupon(address)` - Calculate claimable interest
- `claimCoupon()` - Claim accrued coupon payment
- `liquidateBond()` - Sell bond on secondary market
- `getBondInfo()` - Retrieve bond metadata
- `daysUntilMaturity()` - Calculate remaining days

**Features:**
- Fractional ownership
- Automated coupon calculation
- Maturity date enforcement
- Pausable for emergencies
- Reentrancy protection

### BondMarketplace.sol

Secondary market for trading bond tokens:

**Key Functions:**
- `createListing()` - List bonds for sale
- `purchaseBonds()` - Buy from listing
- `cancelListing()` - Remove listing
- `getActiveListing()` - Query details

**Features:**
- Peer-to-peer trading
- Platform fee collection (0.5%)
- Secure escrow mechanism
- Event logging

---

## 🎯 User Flows

### 1️⃣ Connect Wallet
1. Click "Connect Wallet"
2. Select MetaMask/WalletConnect
3. Approve connection
4. View wallet info

### 2️⃣ Purchase Bonds
1. Browse Marketplace
2. Filter by risk/yield
3. Click bond card
4. Enter investment amount
5. Confirm transaction
6. Receive tokens

### 3️⃣ Manage Portfolio
1. Navigate to Dashboard
2. View holdings & P&L
3. Track accrued interest
4. Claim coupon payments
5. Review transaction history

### 4️⃣ Liquidate Bonds
1. Select bond from portfolio
2. Click "Liquidate"
3. Enter amount to sell
4. Confirm transaction
5. Receive proceeds

### 5️⃣ Secondary Market
1. Go to Marketplace > Secondary
2. Browse listings
3. Purchase at discount
4. Instant settlement

---

## 🔒 Security Features

- ✅ Non-custodial wallet architecture
- ✅ Smart contract reentrancy guards
- ✅ Pausable emergency controls
- ✅ Input validation
- ✅ Secure transaction flows
- ✅ Comprehensive error handling

---

## 📊 Bond Risk Ratings

| Rating | Risk Level | Examples |
|--------|-----------|----------|
| **AAA** | Lowest Risk | US Treasury, German Bunds |
| **AA** | Very Low Risk | UK Gilts, Japan JGBs |
| **A** | Low Risk | France OATs |
| **BBB** | Moderate Risk | Italy BTPs |

---

## 🌐 Supported Networks

- Ethereum Mainnet (Chain ID: 1)
- Polygon Mainnet (Chain ID: 137)
- **Sepolia Testnet (Chain ID: 11155111) - Default**
- Mumbai Testnet (Chain ID: 80001)
- Goerli Testnet (Chain ID: 5)

---

## 🔮 Roadmap

- [ ] Real-time price charts
- [ ] Multi-currency support
- [ ] Mobile app
- [ ] Governance voting
- [ ] Portfolio analytics
- [ ] Tax reporting
- [ ] Layer 2 integration
- [ ] Cross-chain bridges

---

## 📄 License

This project is a demonstration for blockchain hackathon purposes.

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

<div align="center">

**Built for the future of decentralized finance** 🚀

*Democratizing access to government bond investments through blockchain*

Made with ❤️ for Web3

</div>
