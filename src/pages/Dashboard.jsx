import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { mockUserPortfolio, mockBonds } from '../data/mockData';
import Alert from '../components/Alert';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ExternalLink,
  Download,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Gift
} from 'lucide-react';

const Dashboard = () => {
  const { isConnected, account, connectWallet, formatAddress, getExplorerUrl } = useWeb3();
  const [showLiquidateModal, setShowLiquidateModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [liquidateAmount, setLiquidateAmount] = useState('');

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <Wallet className="w-20 h-20 text-blue-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Connect Your Wallet
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Connect your Web3 wallet to view your portfolio and manage your bond investments
            </p>
            <button onClick={connectWallet} className="btn-primary">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  const portfolio = mockUserPortfolio;
  const isProfitable = portfolio.returnPercentage >= 0;

  const handleLiquidate = (holding) => {
    setSelectedHolding(holding);
    setShowLiquidateModal(true);
  };

  const executeLiquidation = async () => {
    if (!liquidateAmount || Number(liquidateAmount) <= 0 || Number(liquidateAmount) > selectedHolding.amount) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      toast.loading('Processing liquidation...', { id: 'liquidate' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Liquidation successful!', { id: 'liquidate' });
      setShowLiquidateModal(false);
      setLiquidateAmount('');
    } catch (error) {
      toast.error('Liquidation failed', { id: 'liquidate' });
    }
  };

  const handleClaimCoupon = async (holding) => {
    if (holding.accruedInterest <= 0) {
      toast.error('No coupon available to claim');
      return;
    }

    try {
      toast.loading('Claiming coupon...', { id: 'claim' });
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`Claimed $${holding.accruedInterest.toFixed(2)}!`, { id: 'claim' });
    } catch (error) {
      toast.error('Claim failed', { id: 'claim' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Portfolio Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tokenized government bond investments
          </p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Value</span>
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              ${portfolio.totalValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Invested: ${portfolio.totalInvested.toLocaleString()}
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Return</span>
              {isProfitable ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <p className={`text-3xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              ${portfolio.totalReturn.toLocaleString()}
            </p>
            <p className={`text-xs mt-1 flex items-center ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {portfolio.returnPercentage.toFixed(2)}%
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Accrued Interest</span>
              <Gift className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600">
              ${portfolio.accruedInterest.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Available to claim
            </p>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Holdings</span>
              <Wallet className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {portfolio.holdings.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Active bonds
            </p>
          </div>
        </div>

        {/* Holdings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Your Bond Holdings
            </h2>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="space-y-4">
            {portfolio.holdings.map((holding, index) => {
              const bond = mockBonds.find(b => b.id === holding.bondId);
              const profitLoss = holding.totalValue - (holding.amount * holding.avgPurchasePrice);
              const profitLossPercent = ((holding.currentPrice - holding.avgPurchasePrice) / holding.avgPurchasePrice) * 100;

              return (
                <div key={index} className="card">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                            {holding.bondName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {bond?.issuer || 'Government Issuer'}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          bond?.riskLevel === 'AAA' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}>
                          {bond?.riskLevel || 'AAA'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Amount</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{holding.amount} tokens</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg. Buy Price</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">${holding.avgPurchasePrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Price</p>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">${holding.currentPrice}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Value</p>
                          <p className="font-bold text-blue-600">${holding.totalValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">P&L</p>
                          <p className={`font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 lg:w-48">
                      {holding.accruedInterest > 0 && (
                        <button
                          onClick={() => handleClaimCoupon(holding)}
                          className="btn-primary bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center space-x-2"
                        >
                          <Gift className="w-4 h-4" />
                          <span>Claim ${holding.accruedInterest.toFixed(2)}</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleLiquidate(holding)}
                        className="btn-secondary flex items-center justify-center space-x-2"
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Liquidate</span>
                      </button>
                      <Link
                        to={`/bond/${holding.bondId}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Transaction History
          </h2>

          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Bond</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Tx Hash</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                        tx.type === 'purchase' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      }`}>
                        {tx.type === 'purchase' ? 'Purchase' : 'Coupon'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{tx.bondName}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {tx.type === 'purchase' ? `${tx.amount} tokens` : `$${tx.amount}`}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={getExplorerUrl(tx.txHash) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                      >
                        <span>{tx.txHash.slice(0, 10)}...</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Liquidate Modal */}
        <Modal
          isOpen={showLiquidateModal}
          onClose={() => setShowLiquidateModal(false)}
          title="Liquidate Bond Tokens"
          footer={
            <div className="flex space-x-4">
              <button onClick={() => setShowLiquidateModal(false)} className="btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={executeLiquidation} className="btn-primary flex-1">
                Confirm Liquidation
              </button>
            </div>
          }
        >
          {selectedHolding && (
            <div>
              <Alert
                type="info"
                title="Instant Settlement"
                message="Your bonds will be sold on the secondary market with instant on-chain settlement."
              />

              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">{selectedHolding.bondName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Current Holdings: {selectedHolding.amount} tokens
                </p>

                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Amount to Liquidate (tokens)
                  </label>
                  <input
                    type="number"
                    value={liquidateAmount}
                    onChange={(e) => setLiquidateAmount(e.target.value)}
                    placeholder={`Max: ${selectedHolding.amount}`}
                    className="input-field"
                    max={selectedHolding.amount}
                    min="1"
                  />
                </div>

                {liquidateAmount && Number(liquidateAmount) > 0 && (
                  <div className="card bg-green-50 dark:bg-green-900/20">
                    <p className="text-sm font-medium mb-2">Expected Proceeds</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${(Number(liquidateAmount) * selectedHolding.currentPrice).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      @ ${selectedHolding.currentPrice} per token
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
