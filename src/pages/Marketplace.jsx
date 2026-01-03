import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { mockBonds, mockListings } from '../data/mockData';
import BondCard from '../components/BondCard';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import toast from 'react-hot-toast';
import { 
  Filter, 
  Search, 
  TrendingUp, 
  Clock,
  Zap,
  ExternalLink
} from 'lucide-react';

const Marketplace = () => {
  const { isConnected, connectWallet, formatAddress, getExplorerUrl } = useWeb3();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [sortBy, setSortBy] = useState('yield');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedBond, setSelectedBond] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [activeTab, setActiveTab] = useState('primary'); // primary or secondary

  const riskLevels = ['all', 'AAA', 'AA', 'A', 'BBB', 'BB'];

  // Filter and sort bonds
  const filteredBonds = mockBonds
    .filter(bond => {
      const matchesSearch = bond.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bond.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = selectedRisk === 'all' || bond.riskLevel === selectedRisk;
      return matchesSearch && matchesRisk && bond.isActive;
    })
    .sort((a, b) => {
      if (sortBy === 'yield') return b.currentYield - a.currentYield;
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'maturity') return a.maturityDate - b.maturityDate;
      return 0;
    });

  const handleBuyBond = (bond) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      connectWallet();
      return;
    }
    setSelectedBond(bond);
    setShowPurchaseModal(true);
  };

  const executePurchase = async () => {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (Number(purchaseAmount) < selectedBond.minInvestment) {
      toast.error(`Minimum investment is $${selectedBond.minInvestment}`);
      return;
    }

    try {
      toast.loading('Processing purchase...', { id: 'purchase' });
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Purchase successful!', { id: 'purchase' });
      setShowPurchaseModal(false);
      setPurchaseAmount('');
    } catch (error) {
      toast.error('Purchase failed. Please try again.', { id: 'purchase' });
    }
  };

  const handleBuyFromListing = async (listing) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      connectWallet();
      return;
    }

    try {
      toast.loading('Processing purchase...', { id: 'listing-purchase' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Purchase successful!', { id: 'listing-purchase' });
    } catch (error) {
      toast.error('Purchase failed', { id: 'listing-purchase' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Bond Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Trade tokenized government bonds from trusted sovereign issuers
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('primary')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'primary'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Primary Market</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('secondary')}
            className={`px-6 py-3 font-semibold transition-all ${
              activeTab === 'secondary'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Secondary Market</span>
            </div>
          </button>
        </div>

        {activeTab === 'primary' ? (
          <>
            {/* Filters */}
            <div className="card mb-8">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Search Bonds
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or issuer..."
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Risk Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Risk Level
                  </label>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedRisk}
                      onChange={(e) => setSelectedRisk(e.target.value)}
                      className="input-field pl-10"
                    >
                      {riskLevels.map(level => (
                        <option key={level} value={level}>
                          {level === 'all' ? 'All Ratings' : level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-field"
                  >
                    <option value="yield">Highest Yield</option>
                    <option value="price">Lowest Price</option>
                    <option value="maturity">Earliest Maturity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Info Alert */}
            {!isConnected && (
              <Alert
                type="info"
                title="Connect Your Wallet"
                message="Connect your Web3 wallet to start trading government bonds"
                action={
                  <button onClick={connectWallet} className="btn-primary text-sm">
                    Connect Wallet
                  </button>
                }
              />
            )}

            {/* Bonds Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredBonds.map(bond => (
                <div key={bond.id}>
                  <BondCard 
                    bond={bond} 
                    onClick={() => handleBuyBond(bond)}
                  />
                  <button
                    onClick={() => handleBuyBond(bond)}
                    disabled={!isConnected}
                    className="w-full mt-4 btn-primary"
                  >
                    Buy Tokens
                  </button>
                </div>
              ))}
            </div>

            {filteredBonds.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No bonds found matching your criteria</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Secondary Market Listings */}
            <Alert
              type="info"
              title="Secondary Market"
              message="Purchase bonds from other investors at discounted prices with instant settlement"
            />

            <div className="grid gap-6 mt-6">
              {mockListings.map(listing => (
                <div key={listing.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {listing.bondName}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Seller: {formatAddress(listing.seller)}</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(listing.listedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {listing.discount > 0 && (
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full">
                        {listing.discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-4 gap-4 my-6">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                      <p className="text-lg font-bold">{listing.amount} tokens</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price per Token</p>
                      <p className="text-lg font-bold text-blue-600">${listing.pricePerToken}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Price</p>
                      <p className="text-lg font-bold">${listing.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => handleBuyFromListing(listing)}
                        disabled={!isConnected}
                        className="btn-primary w-full"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link 
                      to={`/bond/${listing.bondId}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                    >
                      <span>View Bond Details</span>
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Purchase Modal */}
        <Modal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          title="Purchase Bond Tokens"
          footer={
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={executePurchase}
                className="btn-primary flex-1"
              >
                Confirm Purchase
              </button>
            </div>
          }
        >
          {selectedBond && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">{selectedBond.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedBond.issuer}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="card">
                  <p className="text-xs text-gray-500 mb-1">Price</p>
                  <p className="text-xl font-bold">${selectedBond.price}</p>
                </div>
                <div className="card">
                  <p className="text-xs text-gray-500 mb-1">Yield</p>
                  <p className="text-xl font-bold text-green-600">{selectedBond.currentYield}%</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Investment Amount (USD)
                </label>
                <input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  placeholder={`Min. $${selectedBond.minInvestment}`}
                  className="input-field"
                  min={selectedBond.minInvestment}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Minimum investment: ${selectedBond.minInvestment}
                </p>
              </div>

              {purchaseAmount && Number(purchaseAmount) >= selectedBond.minInvestment && (
                <div className="card bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-sm font-medium mb-2">Purchase Summary</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Tokens</span>
                      <span className="font-semibold">
                        {(Number(purchaseAmount) / selectedBond.price).toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Annual Yield</span>
                      <span className="font-semibold text-green-600">
                        ${(Number(purchaseAmount) * selectedBond.currentYield / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Marketplace;
