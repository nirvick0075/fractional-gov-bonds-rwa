'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { mockWalletAssets } from '@/lib/mockData'
import { formatCurrency, formatPercentage, getChangeColor } from '@/lib/utils'
import { ArrowUpRight, ArrowDownLeft, Repeat, TrendingUp, Download, Upload, CreditCard, History } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [depositModal, setDepositModal] = useState(false)
  const [withdrawModal, setWithdrawModal] = useState(false)

  const tabs = ['Overview', 'Deposit', 'Withdraw', 'History', 'P2P']

  const totalBalance = mockWalletAssets.reduce((sum, asset) => sum + asset.value, 0)
  const availableBalance = totalBalance * 0.77
  const stakedBalance = totalBalance * 0.23

  const totalChange = mockWalletAssets.reduce((sum, asset) => sum + (asset.value * asset.change24h / 100), 0)
  const totalChangePercent = (totalChange / totalBalance) * 100

  const quickActions = [
    { label: 'Deposit INR', icon: Download, onClick: () => setDepositModal(true), color: 'success' },
    { label: 'Withdraw INR', icon: Upload, onClick: () => setWithdrawModal(true), color: 'danger' },
    { label: 'Buy Crypto', icon: TrendingUp, onClick: () => {}, color: 'primary' },
    { label: 'Stake & Earn', icon: TrendingUp, onClick: () => {}, color: 'warning' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-light-text mb-2">Wallet</h1>
          <p className="text-gray-400">Manage your crypto assets and fiat balance</p>
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

        {activeTab === 'Overview' && (
          <div className="space-y-6">
            {/* Total Balance */}
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Total Balance</div>
                  <div className="text-5xl font-bold text-light-text mb-2">
                    {formatCurrency(totalBalance)}
                  </div>
                  <div className={`flex items-center justify-center space-x-2 ${getChangeColor(totalChangePercent)}`}>
                    <TrendingUp size={20} />
                    <span className="text-xl font-semibold">
                      {formatPercentage(totalChangePercent)} (24h)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
                    <div className="bg-dark-bg rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Available</div>
                      <div className="text-xl font-bold text-light-text">
                        {formatCurrency(availableBalance)}
                      </div>
                    </div>
                    <div className="bg-dark-bg rounded-lg p-4">
                      <div className="text-sm text-gray-400 mb-1">Staked</div>
                      <div className="text-xl font-bold text-light-text">
                        {formatCurrency(stakedBalance)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockWalletAssets.map((asset, index) => (
                <motion.div
                  key={asset.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hover>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white font-bold">
                          {asset.symbol[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-light-text">{asset.symbol}</div>
                          <div className="text-xs text-gray-400">{asset.name}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Amount</span>
                          <span className="text-sm font-semibold text-light-text">{asset.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Value</span>
                          <span className="text-sm font-semibold text-light-text">
                            {formatCurrency(asset.value)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">24h</span>
                          <span className={`text-sm font-semibold ${getChangeColor(asset.change24h)}`}>
                            {formatPercentage(asset.change24h)}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <button className="p-2 bg-dark-bg hover:bg-primary rounded-lg transition-colors text-xs">
                          <ArrowUpRight size={14} className="mx-auto" />
                        </button>
                        <button className="p-2 bg-dark-bg hover:bg-primary rounded-lg transition-colors text-xs">
                          <ArrowDownLeft size={14} className="mx-auto" />
                        </button>
                        <button className="p-2 bg-dark-bg hover:bg-primary rounded-lg transition-colors text-xs">
                          <Repeat size={14} className="mx-auto" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className="flex flex-col items-center space-y-2 p-4 bg-dark-bg hover:bg-dark-card rounded-lg transition-colors"
                      >
                        <div className={`w-12 h-12 bg-${action.color}/20 rounded-full flex items-center justify-center`}>
                          <Icon size={24} className={`text-${action.color}`} />
                        </div>
                        <span className="text-sm text-light-text">{action.label}</span>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['P2P Trade', 'Convert', 'Cards', 'History'].map((action, index) => (
                <Card key={index} hover>
                  <CardContent className="p-6 text-center">
                    <div className="text-light-text font-semibold">{action}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Deposit' && (
          <Card>
            <CardContent className="p-8">
              <div className="max-w-md mx-auto text-center">
                <Download size={48} className="mx-auto mb-4 text-success" />
                <h2 className="text-2xl font-bold text-light-text mb-4">Deposit Funds</h2>
                <p className="text-gray-400 mb-6">
                  Choose your preferred deposit method
                </p>
                <div className="space-y-3">
                  <Button variant="success" size="lg" className="w-full">
                    Bank Transfer (UPI/IMPS)
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Credit/Debit Card
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Crypto Deposit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'Withdraw' && (
          <Card>
            <CardContent className="p-8">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <Upload size={48} className="mx-auto mb-4 text-danger" />
                  <h2 className="text-2xl font-bold text-light-text mb-2">Withdraw Funds</h2>
                  <p className="text-gray-400">
                    Withdraw to your verified bank account
                  </p>
                </div>
                <div className="space-y-4">
                  <Input label="Amount (INR)" placeholder="Enter amount" />
                  <Input label="Bank Account" placeholder="Select account" />
                  <Button variant="danger" size="lg" className="w-full">
                    Withdraw Funds
                  </Button>
                  <p className="text-xs text-gray-400 text-center">
                    Processing time: 1-2 business days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'History' && (
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                        <ArrowDownLeft size={20} className="text-success" />
                      </div>
                      <div>
                        <div className="font-semibold text-light-text">Deposit</div>
                        <div className="text-xs text-gray-400">Jan 14, 2026 10:30 AM</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-success">+₹50,000</div>
                      <div className="text-xs text-gray-400">Completed</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Deposit Modal */}
      <Modal isOpen={depositModal} onClose={() => setDepositModal(false)} title="Deposit Funds">
        <div className="space-y-4">
          <Input label="Amount (INR)" placeholder="Enter amount" />
          <Button variant="success" size="lg" className="w-full">
            Continue to Payment
          </Button>
        </div>
      </Modal>

      {/* Withdraw Modal */}
      <Modal isOpen={withdrawModal} onClose={() => setWithdrawModal(false)} title="Withdraw Funds">
        <div className="space-y-4">
          <Input label="Amount (INR)" placeholder="Enter amount" />
          <Input label="Bank Account" placeholder="Select account" />
          <Button variant="danger" size="lg" className="w-full">
            Withdraw
          </Button>
        </div>
      </Modal>

      <MobileNav />
    </div>
  )
}
