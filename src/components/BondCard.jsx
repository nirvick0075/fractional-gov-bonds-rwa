import { ExternalLink } from 'lucide-react';

const BondCard = ({ bond, onClick }) => {
  const getRiskColor = (risk) => {
    const colors = {
      'AAA': 'text-green-600 bg-green-100 dark:bg-green-900/30',
      'AA': 'text-green-500 bg-green-100 dark:bg-green-900/30',
      'A': 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      'BBB': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
      'BB': 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
      'B': 'text-red-600 bg-red-100 dark:bg-red-900/30',
    };
    return colors[risk] || colors['BBB'];
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div 
      onClick={onClick}
      className="card-hover cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {bond.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {bond.issuer}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(bond.riskLevel)}`}>
          {bond.riskLevel}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Coupon Rate</p>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {(bond.couponRate / 100).toFixed(2)}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Yield</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {bond.currentYield}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Price</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            ${bond.price}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Maturity</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {formatDate(bond.maturityDate)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span>Available</span>
          <span>{bond.availableSupply} / {bond.totalSupply}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${(bond.availableSupply / bond.totalSupply) * 100}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Min. Investment: ${bond.minInvestment}
        </span>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
      </div>
    </div>
  );
};

export default BondCard;
