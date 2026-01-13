import { useState } from 'react';
import { TrendingUp, Users, Rocket, Lock } from 'lucide-react';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Tabs from '../components/ui/Tabs';
import { mockStakingOptions, mockCopyTraders } from '../lib/mockData';
import { formatCurrency, formatNumber } from '../lib/utils';

const Earn = () => {
  const [stakeModal, setStakeModal] = useState(false);
  const [selectedStaking, setSelectedStaking] = useState(null);
  
  const handleStake = (option) => {
    setSelectedStaking(option);
    setStakeModal(true);
  };
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Earn</h1>
          <p className="text-gray-400">Grow your crypto with staking and copy trading</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="py-4">
              <div className="text-sm text-gray-400 mb-1">Total Staked</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(122000)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="text-sm text-gray-400 mb-1">24h Earnings</div>
              <div className="text-2xl font-bold text-success">+{formatCurrency(8450)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="text-sm text-gray-400 mb-1">Active Stakes</div>
              <div className="text-2xl font-bold text-white">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4">
              <div className="text-sm text-gray-400 mb-1">Avg APY</div>
              <div className="text-2xl font-bold text-primary">12.5%</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs
          defaultTab={0}
          tabs={[
            {
              label: 'Staking',
              content: (
                <div className="space-y-4">
                  {mockStakingOptions.map((option) => (
                    <Card key={option.symbol}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                              <Lock className="text-primary" size={24} />
                            </div>
                            <div>
                              <div className="text-xl font-bold text-white">{option.symbol}</div>
                              <div className="text-sm text-gray-400">{option.name}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                              <div className="text-sm text-gray-400">APY</div>
                              <div className="text-lg font-bold text-success">{option.apy}%</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">Min Amount</div>
                              <div className="text-lg font-semibold text-white">{option.minAmount}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">Lock Period</div>
                              <div className="text-lg font-semibold text-white">{option.lockPeriod}</div>
                            </div>
                            <div className="flex items-end">
                              <Button onClick={() => handleStake(option)}>Stake</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              label: 'Savings',
              content: (
                <Card>
                  <CardContent className="py-8 text-center">
                    <TrendingUp size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Flexible savings coming soon</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              label: 'Copy Trading',
              content: (
                <div className="space-y-4">
                  {mockCopyTraders.map((trader) => (
                    <Card key={trader.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">{trader.avatar}</div>
                            <div>
                              <div className="text-xl font-bold text-white">{trader.name}</div>
                              <div className="text-sm text-gray-400">
                                {formatNumber(trader.followers)} followers • {trader.trades} trades
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                              <div className="text-sm text-gray-400">30d P&L</div>
                              <div className="text-lg font-bold text-success">+{trader.pnl30d}%</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">Win Rate</div>
                              <div className="text-lg font-semibold text-white">{trader.winRate}%</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-400">AUM</div>
                              <div className="text-lg font-semibold text-white">
                                ${formatNumber(trader.aum / 83.5)}
                              </div>
                            </div>
                            <div className="flex items-end">
                              <Button>Copy</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ),
            },
            {
              label: 'Launchpad',
              content: (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Rocket size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No active launchpad projects</p>
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />
      </div>
      
      {/* Stake Modal */}
      <Modal isOpen={stakeModal} onClose={() => setStakeModal(false)} title={`Stake ${selectedStaking?.symbol}`}>
        {selectedStaking && (
          <div className="space-y-4">
            <div className="bg-dark-bg rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">APY</span>
                <span className="text-success font-semibold">{selectedStaking.apy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Lock Period</span>
                <span className="text-white">{selectedStaking.lockPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Min Amount</span>
                <span className="text-white">{selectedStaking.minAmount} {selectedStaking.symbol}</span>
              </div>
            </div>
            
            <Input label="Amount" type="number" placeholder={`Min: ${selectedStaking.minAmount}`} />
            
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Estimated Earnings (30 days)</div>
              <div className="text-2xl font-bold text-white">
                0.42 {selectedStaking.symbol}
              </div>
            </div>
            
            <Button className="w-full" size="lg">Confirm Stake</Button>
          </div>
        )}
      </Modal>
      
      <MobileNav />
    </>
  );
};

export default Earn;
