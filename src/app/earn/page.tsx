'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { mockStakingOptions, mockCopyTraders } from '@/lib/mockData'
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils'
import { TrendingUp, Users, Shield, Clock, Award, Copy } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EarnPage() {
  const [activeTab, setActiveTab] = useState('Staking')
  const [stakeModal, setStakeModal] = useState(false)
  const [selectedStake, setSelectedStake] = useState<any>(null)

  const tabs = ['Staking', 'Savings', 'Copy Trading', 'Launchpad']

  const handleStake = (option: any) => {
    setSelectedStake(option)
    setStakeModal(true)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-light-text mb-2">Earn</h1>
          <p className="text-gray-400">Grow your crypto with staking, savings, and copy trading</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Staked', value: '₹1.22L', icon: Shield, color: 'primary' },
            { label: 'Earnings (30d)', value: '+₹8,450', icon: TrendingUp, color: 'success' },
            { label: 'Active Stakes', value: '3', icon: Award, color: 'warning' },
            { label: 'Avg APY', value: '12.5%', icon: Clock, color: 'danger' },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-${stat.color}/20 rounded-full flex items-center justify-center`}>
                      <Icon size={24} className={`text-${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                      <div className="text-xl font-bold text-light-text">{stat.value}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

        {activeTab === 'Staking' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Staking Options</CardTitle>
                  <div className="text-sm text-gray-400">Earn rewards by staking your crypto</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-dark-bg">
                        <th className="text-left p-4 text-sm font-semibold text-gray-400">Asset</th>
                        <th className="text-right p-4 text-sm font-semibold text-gray-400">APY</th>
                        <th className="text-right p-4 text-sm font-semibold text-gray-400">Duration</th>
                        <th className="text-right p-4 text-sm font-semibold text-gray-400 hidden md:table-cell">Min Amount</th>
                        <th className="text-right p-4 text-sm font-semibold text-gray-400">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStakingOptions.map((option, index) => (
                        <motion.tr
                          key={option.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border-b border-dark-bg hover:bg-dark-bg/50 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white font-bold">
                                {option.asset[0]}
                              </div>
                              <div>
                                <div className="font-semibold text-light-text">{option.asset}</div>
                                <div className="text-xs text-gray-400">
                                  {option.isFlexible ? 'Flexible' : 'Locked'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-success font-bold text-lg">
                              {option.apy}%
                            </span>
                          </td>
                          <td className="p-4 text-right text-light-text">
                            {option.duration}
                          </td>
                          <td className="p-4 text-right text-light-text hidden md:table-cell">
                            {formatCurrency(option.minAmount)}
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleStake(option)}
                            >
                              Stake Now
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'High Returns', desc: 'Earn up to 18% APY', icon: TrendingUp },
                { title: 'Secure', desc: 'Protected by smart contracts', icon: Shield },
                { title: 'Flexible', desc: 'Withdraw anytime', icon: Clock },
              ].map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <Icon size={32} className="mx-auto mb-3 text-primary" />
                      <h3 className="font-bold text-light-text mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-400">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'Savings' && (
          <Card>
            <CardHeader>
              <CardTitle>Flexible Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Clock size={64} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-light-text mb-2">
                  Flexible Savings Products
                </h3>
                <p className="text-gray-400 mb-6">
                  Earn interest on your idle crypto with no lock-up period
                </p>
                <Button variant="primary">Explore Savings</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'Copy Trading' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Top Traders</CardTitle>
                  <div className="text-sm text-gray-400">Copy successful traders automatically</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {mockCopyTraders.map((trader, index) => (
                    <motion.div
                      key={trader.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card hover>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {trader.username[1]}
                              </div>
                              <div>
                                <div className="font-bold text-light-text">{trader.username}</div>
                                <div className="text-xs text-gray-400">
                                  {formatNumber(trader.followers)} followers
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-success font-bold text-lg">
                                +{trader.pnl30d}%
                              </div>
                              <div className="text-xs text-gray-400">30d P&L</div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-dark-bg rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">Win Rate</div>
                              <div className="font-bold text-light-text">{trader.winRate}%</div>
                            </div>
                            <div className="bg-dark-bg rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">AUM</div>
                              <div className="font-bold text-light-text">
                                {formatCurrency(trader.aum)}
                              </div>
                            </div>
                          </div>

                          <Button variant="primary" size="sm" className="w-full">
                            <Copy size={16} className="mr-2" />
                            Copy Trader
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle>How Copy Trading Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { step: '1', title: 'Choose a Trader', desc: 'Browse top performers and their stats' },
                    { step: '2', title: 'Set Your Budget', desc: 'Decide how much to allocate' },
                    { step: '3', title: 'Auto Copy', desc: 'Trades are copied automatically' },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-light-text mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'Launchpad' && (
          <Card>
            <CardHeader>
              <CardTitle>Token Launchpad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award size={64} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-bold text-light-text mb-2">
                  Early Access to New Tokens
                </h3>
                <p className="text-gray-400 mb-6">
                  Participate in exclusive token launches and ICOs
                </p>
                <Button variant="primary">View Launches</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Stake Modal */}
      <Modal
        isOpen={stakeModal}
        onClose={() => setStakeModal(false)}
        title={`Stake ${selectedStake?.asset}`}
      >
        <div className="space-y-4">
          <div className="bg-dark-bg rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">APY</span>
              <span className="text-success font-bold">{selectedStake?.apy}%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Duration</span>
              <span className="text-light-text">{selectedStake?.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Min Amount</span>
              <span className="text-light-text">{formatCurrency(selectedStake?.minAmount || 0)}</span>
            </div>
          </div>
          <Input label="Amount to Stake (INR)" placeholder="Enter amount" />
          <div className="bg-dark-bg rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Estimated Earnings (30d)</div>
            <div className="text-2xl font-bold text-success">+₹2,850</div>
          </div>
          <Button variant="success" size="lg" className="w-full">
            Confirm Stake
          </Button>
        </div>
      </Modal>

      <MobileNav />
    </div>
  )
}
