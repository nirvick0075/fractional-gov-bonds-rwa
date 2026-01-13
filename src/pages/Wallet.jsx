import { useState } from 'react';
import { Send, Download, ArrowUpDown, History, Users } from 'lucide-react';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Tabs from '../components/ui/Tabs';
import useTradingStore from '../store/tradingStore';
import { mockWalletAssets } from '../lib/mockData';
import { formatCurrency, formatPercentage, getChangeColor } from '../lib/utils';

const Wallet = () => {
  const { walletBalance, totalPnL } = useTradingStore();
  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  
  const totalValue = mockWalletAssets.reduce((sum, asset) => sum + asset.value, 0);
  const availableBalance = walletBalance * 0.8;
  const stakedBalance = walletBalance * 0.2;
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
          <p className="text-gray-400">Manage your crypto assets</p>
        </div>
        
        {/* Balance Overview */}
        <Card className="mb-6">
          <CardContent className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-400 mb-2">Total Balance</div>
                <div className="text-3xl font-bold text-white mb-1">
                  {formatCurrency(walletBalance)}
                </div>
                <div className={`text-sm ${getChangeColor(totalPnL)}`}>
                  {formatPercentage(totalPnL)} (24h)
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Available Balance</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(availableBalance)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Staked Balance</div>
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(stakedBalance)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs */}
        <Tabs
          defaultTab={0}
          tabs={[
            {
              label: 'Overview',
              content: (
                <div className="space-y-6">
                  {/* Assets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockWalletAssets.map((asset) => (
                      <Card key={asset.symbol}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-xl font-bold text-white">{asset.symbol}</div>
                              <div className="text-sm text-gray-400">{asset.name}</div>
                            </div>
                            <div className={`text-sm font-semibold ${getChangeColor(asset.change24h)}`}>
                              {formatPercentage(asset.change24h)}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Amount</span>
                              <span className="text-white font-semibold">{asset.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Price</span>
                              <span className="text-white">{formatCurrency(asset.price)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Value</span>
                              <span className="text-white font-semibold">{formatCurrency(asset.value)}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-4">
                            <Button size="sm" variant="outline">Send</Button>
                            <Button size="sm" variant="outline">Swap</Button>
                            <Button size="sm">Trade</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                          onClick={() => setDepositModal(true)}
                          className="flex flex-col items-center gap-2 p-4 bg-dark-bg rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <Download size={24} className="text-primary" />
                          <span className="text-sm text-white">Deposit</span>
                        </button>
                        <button
                          onClick={() => setWithdrawModal(true)}
                          className="flex flex-col items-center gap-2 p-4 bg-dark-bg rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <Send size={24} className="text-primary" />
                          <span className="text-sm text-white">Withdraw</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-dark-bg rounded-lg hover:bg-white/5 transition-colors">
                          <ArrowUpDown size={24} className="text-primary" />
                          <span className="text-sm text-white">Swap</span>
                        </button>
                        <button className="flex flex-col items-center gap-2 p-4 bg-dark-bg rounded-lg hover:bg-white/5 transition-colors">
                          <Users size={24} className="text-primary" />
                          <span className="text-sm text-white">P2P</span>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ),
            },
            {
              label: 'Deposit',
              content: (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Download size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select an asset to deposit</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              label: 'Withdraw',
              content: (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Send size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Select an asset to withdraw</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              label: 'History',
              content: (
                <Card>
                  <CardContent className="py-8 text-center">
                    <History size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No transaction history</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              label: 'P2P',
              content: (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Users size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">P2P trading coming soon</p>
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />
      </div>
      
      {/* Deposit Modal */}
      <Modal isOpen={depositModal} onClose={() => setDepositModal(false)} title="Deposit Crypto">
        <div className="space-y-4">
          <Input label="Select Asset" placeholder="BTC, ETH, USDT..." />
          <Input label="Amount" type="number" placeholder="0.00" />
          <Input label="Network" placeholder="Select network" />
          <Button className="w-full">Generate Deposit Address</Button>
        </div>
      </Modal>
      
      {/* Withdraw Modal */}
      <Modal isOpen={withdrawModal} onClose={() => setWithdrawModal(false)} title="Withdraw Crypto">
        <div className="space-y-4">
          <Input label="Select Asset" placeholder="BTC, ETH, USDT..." />
          <Input label="Amount" type="number" placeholder="0.00" />
          <Input label="Address" placeholder="Enter wallet address" />
          <Input label="Network" placeholder="Select network" />
          <Button className="w-full" variant="danger">Withdraw</Button>
        </div>
      </Modal>
      
      <MobileNav />
    </>
  );
};

export default Wallet;
