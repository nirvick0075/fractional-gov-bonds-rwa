import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { mockBonds } from '../data/mockData';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Shield,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  ExternalLink,
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  Copy,
  BarChart3
} from 'lucide-react';

const BondDetails = () => {
  const { bondId } = useParams();
  const { isConnected, connectWallet, getAddressExplorerUrl, formatAddress } = useWeb3();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const bond = mockBonds.find(b => b.id === bondId);

  if (!bond) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="section-container text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Bond Not Found
          </h1>
          <Link to="/marketplace" className="text-blue-600 dark:text-blue-400 hover:underline">
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const maturityDate = new Date(bond.maturityDate * 1000);
  const daysUntilMaturity = Math.floor((bond.maturityDate * 1000 - Date.now()) / (1000 * 60 * 60 * 24));
  const yearsUntilMaturity = (daysUntilMaturity / 365).toFixed(1);

  const handlePurchase = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      connectWallet();
      return;
    }
    setShowPurchaseModal(true);
  };

  const executePurchase = async () => {
    if (!purchaseAmount || Number(purchaseAmount) < bond.minInvestment) {
      toast.error(`Minimum investment is $${bond.minInvestment}`);
      return;
    }

    try {
      toast.loading('Processing purchase...', { id: 'purchase' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Purchase successful!', { id: 'purchase' });
      setShowPurchaseModal(false);
      setPurchaseAmount('');
    } catch (error) {
      toast.error('Purchase failed', { id: 'purchase' });
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(bond.address);
    toast.success('Contract address copied!');
  };

  const getRiskColor = (risk) => {
    const colors = {
      'AAA': 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
      'AA': 'bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 border-green-200 dark:border-green-800',
      'A': 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      'BBB': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    };
    return colors[risk] || colors['BBB'];
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Bond Details' },
    { id: 'performance', label: 'Performance' },
    { id: 'risks', label: 'Risk Disclosure' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="section-container">
        {/* Back Button */}
        <Link 
          to="/marketplace" 
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Header */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {bond.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{bond.issuer}</p>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold border-2 ${getRiskColor(bond.riskLevel)}`}>
                      {bond.riskLevel} Rated
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold">
                      {bond.symbol}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contract Address */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Contract:</span>
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {formatAddress(bond.address)}
                </code>
                <button onClick={copyAddress} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <Copy className="w-4 h-4" />
                </button>
                <a 
                  href={getAddressExplorerUrl(bond.address) || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>View on Explorer</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 lg:w-80">
              <div className="card bg-blue-50 dark:bg-blue-900/20">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Current Yield</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{bond.currentYield}%</p>
              </div>
              <div className="card bg-green-50 dark:bg-green-900/20">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Price</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">${bond.price}</p>
              </div>
              <div className="card bg-purple-50 dark:bg-purple-900/20">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Coupon Rate</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{(bond.couponRate / 100).toFixed(2)}%</p>
              </div>
              <div className="card bg-orange-50 dark:bg-orange-900/20">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Maturity</p>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{yearsUntilMaturity}y</p>
              </div>
            </div>
          </div>

          {/* Purchase Button */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handlePurchase} className="btn-primary w-full lg:w-auto">
              Purchase Bond Tokens
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  About This Bond
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {bond.description}
                </p>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Government Backed</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Full faith and credit guarantee from sovereign issuer
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Fixed Yield</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Predictable returns with regular coupon payments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Fractional Ownership</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Invest with as little as ${bond.minInvestment}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Instant Liquidity</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trade 24/7 on secondary market
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Supply Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Available</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {bond.availableSupply.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                        style={{ width: `${(bond.availableSupply / bond.totalSupply) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Supply</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {bond.totalSupply.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Min. Investment</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      ${bond.minInvestment}
                    </span>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Maturity Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Maturity Date</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {maturityDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Days Remaining</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {daysUntilMaturity} days
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Years to Maturity</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {yearsUntilMaturity} years
                    </span>
                  </div>
                </div>
              </div>

              <Alert
                type="success"
                title="Automated Payments"
                message="Coupon payments are automatically distributed via smart contract on scheduled dates."
              />
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Technical Bond Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">ISIN</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{bond.symbol}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Face Value</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">${bond.faceValue}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Coupon Rate</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{(bond.couponRate / 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Payment Frequency</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Semi-Annual</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Credit Rating</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{bond.riskLevel}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Issue Date</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Jan 15, 2024</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Currency</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">USD</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Token Standard</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">ERC-20</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Historical Performance
            </h2>
            <div className="flex items-center justify-center py-20 text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>Performance charts coming soon</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-6">
            <Alert
              type="warning"
              title="Investment Risk Disclosure"
              message="Government bonds carry credit risk, interest rate risk, and market risk. Past performance does not guarantee future results."
            />

            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Risk Factors
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Credit Risk',
                    description: 'Risk that the issuer may default on payments. This bond is rated {bond.riskLevel}.',
                  },
                  {
                    title: 'Interest Rate Risk',
                    description: 'Bond prices fall when interest rates rise, affecting secondary market value.',
                  },
                  {
                    title: 'Liquidity Risk',
                    description: 'Secondary market liquidity may vary based on market conditions.',
                  },
                  {
                    title: 'Smart Contract Risk',
                    description: 'Technology risk associated with blockchain smart contracts (audited).',
                  },
                ].map((risk, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{risk.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Purchase Modal */}
        <Modal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
          title={`Purchase ${bond.name}`}
          footer={
            <div className="flex space-x-4">
              <button onClick={() => setShowPurchaseModal(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={executePurchase} className="btn-primary flex-1">
                Confirm Purchase
              </button>
            </div>
          }
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="card">
                <p className="text-xs text-gray-500 mb-1">Price per Token</p>
                <p className="text-xl font-bold">${bond.price}</p>
              </div>
              <div className="card">
                <p className="text-xs text-gray-500 mb-1">Current Yield</p>
                <p className="text-xl font-bold text-green-600">{bond.currentYield}%</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Investment Amount (USD)
              </label>
              <input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                placeholder={`Min. $${bond.minInvestment}`}
                className="input-field"
                min={bond.minInvestment}
              />
              <p className="text-xs text-gray-500 mt-2">
                Minimum investment: ${bond.minInvestment}
              </p>
            </div>

            {purchaseAmount && Number(purchaseAmount) >= bond.minInvestment && (
              <div className="card bg-blue-50 dark:bg-blue-900/20">
                <p className="text-sm font-medium mb-3">Purchase Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tokens</span>
                    <span className="font-semibold">{(Number(purchaseAmount) / bond.price).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Annual Yield</span>
                    <span className="font-semibold text-green-600">
                      ${(Number(purchaseAmount) * bond.currentYield / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maturity Value</span>
                    <span className="font-semibold">
                      ${(Number(purchaseAmount) * (1 + bond.currentYield * yearsUntilMaturity / 100)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BondDetails;
