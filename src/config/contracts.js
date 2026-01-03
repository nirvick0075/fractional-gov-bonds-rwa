export const BOND_TOKEN_ABI = [
  "function bondMetadata() view returns (string issuer, uint256 maturityDate, uint256 couponRate, uint256 faceValue, uint256 lastCouponPayment, uint256 couponFrequency, string riskLevel, bool isActive)",
  "function calculatePendingCoupon(address holder) view returns (uint256)",
  "function claimCoupon()",
  "function liquidateBond(address buyer, uint256 amount, uint256 price)",
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function daysUntilMaturity() view returns (uint256)",
  "function getBondInfo() view returns (string issuer, uint256 maturityDate, uint256 couponRate, uint256 faceValue, string riskLevel, bool isActive)",
  "function totalCouponsEarned(address holder) view returns (uint256)",
  "event CouponPaid(address indexed holder, uint256 amount)",
  "event BondLiquidated(address indexed seller, address indexed buyer, uint256 amount, uint256 price)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export const MARKETPLACE_ABI = [
  "function createListing(address bondToken, uint256 amount, uint256 pricePerToken) returns (uint256)",
  "function purchaseBonds(uint256 listingId, uint256 amount) payable",
  "function cancelListing(uint256 listingId)",
  "function getActiveListing(uint256 listingId) view returns (address seller, address bondToken, uint256 amount, uint256 pricePerToken, bool isActive)",
  "function listings(uint256 listingId) view returns (address seller, address bondToken, uint256 amount, uint256 pricePerToken, bool isActive)",
  "function nextListingId() view returns (uint256)",
  "event ListingCreated(uint256 indexed listingId, address indexed seller, address bondToken, uint256 amount, uint256 pricePerToken)",
  "event BondPurchased(uint256 indexed listingId, address indexed buyer, uint256 amount, uint256 totalPrice)"
];

// Mock deployed contract addresses - Replace with actual deployed addresses
export const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet / Sepolia Testnet
  bondTokens: {
    'US_TREASURY_2030': '0x1234567890123456789012345678901234567890',
    'US_TREASURY_2035': '0x2345678901234567890123456789012345678901',
    'UK_GILT_2032': '0x3456789012345678901234567890123456789012',
    'GERMAN_BUND_2033': '0x4567890123456789012345678901234567890123',
  },
  marketplace: '0x5678901234567890123456789012345678901234',
};

// Network configurations
export const SUPPORTED_NETWORKS = {
  1: { name: 'Ethereum Mainnet', explorer: 'https://etherscan.io' },
  5: { name: 'Goerli Testnet', explorer: 'https://goerli.etherscan.io' },
  11155111: { name: 'Sepolia Testnet', explorer: 'https://sepolia.etherscan.io' },
  137: { name: 'Polygon Mainnet', explorer: 'https://polygonscan.com' },
  80001: { name: 'Mumbai Testnet', explorer: 'https://mumbai.polygonscan.com' },
};

export const DEFAULT_NETWORK = 11155111; // Sepolia
