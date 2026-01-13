'use client'

import React, { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Shield, Check, AlertTriangle, Download, Settings, User, Lock, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Overview')
  
  const tabs = ['Overview', 'Security', 'Verification', 'Trading History', 'Settings']

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-light-text mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account settings and security</p>
        </div>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-success rounded-full flex items-center justify-center text-white text-4xl font-bold">
                U
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-light-text mb-1">User Name</h2>
                <p className="text-gray-400 mb-3">user@example.com</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-semibold flex items-center">
                    <Check size={14} className="mr-1" /> KYC Verified
                  </span>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                    Premium Member
                  </span>
                </div>
              </div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <Input value="User Name" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <Input value="user@example.com" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone Number</label>
                  <Input value="+91 98765 43210" className="mt-1" />
                </div>
                <Button variant="primary" className="w-full">Update Information</Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Account Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Member Since</span>
                  <span className="font-semibold text-light-text">Jan 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Trades</span>
                  <span className="font-semibold text-light-text">245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-semibold text-success">67%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total P&L</span>
                  <span className="font-semibold text-success">+₹2,35,000</span>
                </div>
                <div className="pt-4 border-t border-dark-bg">
                  <Button variant="outline" className="w-full">
                    <Download size={16} className="mr-2" />
                    Download Statement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield size={24} className="text-success" />
                    <div>
                      <div className="font-semibold text-light-text">Two-Factor Authentication</div>
                      <div className="text-xs text-gray-400">Enabled</div>
                    </div>
                  </div>
                  <Check size={20} className="text-success" />
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Lock size={24} className="text-gray-400" />
                    <div>
                      <div className="font-semibold text-light-text">Whitelist Addresses</div>
                      <div className="text-xs text-gray-400">Not enabled</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Enable</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle size={24} className="text-warning" />
                    <div>
                      <div className="font-semibold text-light-text">Anti-Phishing Code</div>
                      <div className="text-xs text-gray-400">Set up protection</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Setup</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Confirm Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button variant="primary" className="w-full">Change Password</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'Verification' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                      <Check size={24} className="text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-light-text">KYC Verification</div>
                      <div className="text-xs text-gray-400">Verified on Jan 10, 2026</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-success text-white rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                      <Check size={24} className="text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-light-text">PAN Verification</div>
                      <div className="text-xs text-gray-400">Verified on Jan 10, 2026</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-success text-white rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                      <Check size={24} className="text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-light-text">Bank Account</div>
                      <div className="text-xs text-gray-400">Verified on Jan 10, 2026</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-success text-white rounded-full text-xs font-semibold">
                    Verified
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download size={16} className="mr-2" />
                    Download Tax Report (FY 2025-26)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText size={16} className="mr-2" />
                    Update Documents
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download size={16} className="mr-2" />
                    Download Trading History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'Trading History' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trading Statistics</CardTitle>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Trades', value: '245', color: 'primary' },
                  { label: 'Win Rate', value: '67%', color: 'success' },
                  { label: 'Total P&L', value: '+₹2.35L', color: 'success' },
                  { label: 'Best Trade', value: '+₹45K', color: 'warning' },
                ].map((stat, index) => (
                  <div key={index} className="bg-dark-bg rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                    <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="h-64 flex items-center justify-center bg-dark-bg rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-gray-400">Performance Chart</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'Settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-light-text">Email Notifications</div>
                    <div className="text-xs text-gray-400">Receive trade alerts via email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-light-text">SMS Notifications</div>
                    <div className="text-xs text-gray-400">Receive important alerts via SMS</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-light-text">Price Alerts</div>
                    <div className="text-xs text-gray-400">Get notified of price changes</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-dark-bg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Settings size={16} className="mr-2" />
                  API Keys Management
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText size={16} className="mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download size={16} className="mr-2" />
                  Export Account Data
                </Button>
                <div className="pt-4 border-t border-dark-bg">
                  <Button variant="danger" className="w-full">
                    Close Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  )
}
