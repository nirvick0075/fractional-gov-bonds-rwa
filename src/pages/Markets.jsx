import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, TrendingUp } from 'lucide-react';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { mockTradingPairs, platformStats } from '../lib/mockData';
import { formatCurrency, formatPercentage, formatNumber, getChangeColor } from '../lib/utils';

const Markets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  
  const filters = ['All', 'Spot', 'Futures', 'Gainers', 'Losers'];
  
  const filteredPairs = mockTradingPairs.filter(pair => {
    const matchesSearch = pair.baseAsset.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'Gainers') return matchesSearch && pair.change24h > 0;
    if (filter === 'Losers') return matchesSearch && pair.change24h < 0;
    return matchesSearch;
  });
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Markets</h1>
          <p className="text-gray-400">Track all cryptocurrency markets in real-time</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="py-4">
              <div className="text-sm text-gray-400 mb-1">24h Volume</div>
              <div className="text-2xl font-bold text-white">
                ${formatNumber(platformStats.dailyVolume / 83.5)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="text-sm text-gray-400 mb-1">Gainers</div>
              <div className="text-2xl font-bold text-success">{platformStats.totalGainers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="text-sm text-gray-400 mb-1">Losers</div>
              <div className="text-2xl font-bold text-danger">{platformStats.totalLosers}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-96">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search markets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === f
                        ? 'bg-primary text-white'
                        : 'bg-dark-bg text-gray-400 hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Markets Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 text-sm font-semibold text-gray-400"></th>
                    <th className="text-left p-4 text-sm font-semibold text-gray-400">Name</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-400">Price</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-400">24h Change</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-400">24h High</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-400">24h Low</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-400">Volume</th>
                    <th className="text-right p-4 text-sm font-semibold text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPairs.map((pair, index) => (
                    <motion.tr
                      key={pair.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                          <Star size={16} />
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <div className="font-semibold text-white">{pair.baseAsset}</div>
                            <div className="text-xs text-gray-400">{pair.baseAsset}/{pair.quoteAsset}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right font-semibold text-white">
                        {formatCurrency(pair.price)}
                      </td>
                      <td className={`p-4 text-right font-semibold ${getChangeColor(pair.change24h)}`}>
                        {formatPercentage(pair.change24h)}
                      </td>
                      <td className="p-4 text-right text-gray-400">
                        {formatCurrency(pair.high24h)}
                      </td>
                      <td className="p-4 text-right text-gray-400">
                        {formatCurrency(pair.low24h)}
                      </td>
                      <td className="p-4 text-right text-gray-400">
                        ${formatNumber(pair.volume24h / 83.5)}
                      </td>
                      <td className="p-4 text-right">
                        <Link to={`/trade/${pair.id}`}>
                          <Button size="sm">Trade</Button>
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      <MobileNav />
    </>
  );
};

export default Markets;
