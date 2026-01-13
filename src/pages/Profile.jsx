import { Shield, Check, Lock, User as UserIcon, Settings, TrendingUp } from 'lucide-react';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Tabs from '../components/ui/Tabs';
import { formatCurrency, formatPercentage } from '../lib/utils';

const Profile = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl">
                👤
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">John Doe</h1>
                <p className="text-gray-400 mb-3">john.doe@example.com</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm flex items-center gap-1">
                    <Check size={14} /> Verified
                  </span>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    Pro Trader
                  </span>
                </div>
              </div>
              <Button>Edit Profile</Button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input label="Full Name" defaultValue="John Doe" />
                      <Input label="Email" type="email" defaultValue="john.doe@example.com" />
                      <Input label="Phone" defaultValue="+91 98765 43210" />
                      <Input label="Date of Birth" type="date" defaultValue="1990-01-01" />
                      <Button className="w-full">Update Information</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Trading Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total Trades</span>
                        <span className="text-white font-semibold">245</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Win Rate</span>
                        <span className="text-success font-semibold">67%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Total P&L</span>
                        <span className="text-success font-semibold">+{formatCurrency(235000)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Member Since</span>
                        <span className="text-white">Jan 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">VIP Level</span>
                        <span className="text-primary font-semibold">Level 3</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ),
            },
            {
              label: 'Security',
              content: (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                          <Shield className="text-success" size={24} />
                          <div>
                            <div className="text-white font-semibold">Two-Factor Authentication</div>
                            <div className="text-sm text-gray-400">Extra security for your account</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-success text-sm">Enabled</span>
                          <Check className="text-success" size={16} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between py-3 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                          <Lock className="text-gray-400" size={24} />
                          <div>
                            <div className="text-white font-semibold">Withdrawal Whitelist</div>
                            <div className="text-sm text-gray-400">Only allow withdrawals to saved addresses</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Enable</Button>
                      </div>
                      
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <Shield className="text-gray-400" size={24} />
                          <div>
                            <div className="text-white font-semibold">Anti-Phishing Code</div>
                            <div className="text-sm text-gray-400">Verify official emails</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">Setup</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input label="Current Password" type="password" />
                      <Input label="New Password" type="password" />
                      <Input label="Confirm New Password" type="password" />
                      <Button className="w-full">Update Password</Button>
                    </CardContent>
                  </Card>
                </div>
              ),
            },
            {
              label: 'Verification',
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Identity Verification</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <Check className="text-success" size={24} />
                        <div>
                          <div className="text-white font-semibold">Email Verification</div>
                          <div className="text-sm text-gray-400">Verified</div>
                        </div>
                      </div>
                      <Check className="text-success" size={20} />
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <Check className="text-success" size={24} />
                        <div>
                          <div className="text-white font-semibold">KYC Verification</div>
                          <div className="text-sm text-gray-400">Approved</div>
                        </div>
                      </div>
                      <Check className="text-success" size={20} />
                    </div>
                    
                    <div className="flex items-center justify-between py-4 border-b border-gray-800">
                      <div className="flex items-center gap-3">
                        <Check className="text-success" size={24} />
                        <div>
                          <div className="text-white font-semibold">PAN Verification</div>
                          <div className="text-sm text-gray-400">Verified</div>
                        </div>
                      </div>
                      <Check className="text-success" size={20} />
                    </div>
                    
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <Check className="text-success" size={24} />
                        <div>
                          <div className="text-white font-semibold">Bank Account</div>
                          <div className="text-sm text-gray-400">Linked</div>
                        </div>
                      </div>
                      <Check className="text-success" size={20} />
                    </div>
                  </CardContent>
                </Card>
              ),
            },
            {
              label: 'Trading History',
              content: (
                <Card>
                  <CardContent className="py-8 text-center">
                    <TrendingUp size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No recent trading history</p>
                  </CardContent>
                </Card>
              ),
            },
            {
              label: 'Settings',
              content: (
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-800">
                      <div>
                        <div className="text-white font-semibold">Email Notifications</div>
                        <div className="text-sm text-gray-400">Receive trading alerts via email</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-800">
                      <div>
                        <div className="text-white font-semibold">SMS Alerts</div>
                        <div className="text-sm text-gray-400">Get price alerts via SMS</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-800">
                      <div>
                        <div className="text-white font-semibold">Trade Confirmations</div>
                        <div className="text-sm text-gray-400">Confirm each trade before execution</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <div className="text-white font-semibold">Dark Mode</div>
                        <div className="text-sm text-gray-400">Use dark theme</div>
                      </div>
                      <input type="checkbox" className="w-5 h-5" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              ),
            },
          ]}
        />
      </div>
      <MobileNav />
    </>
  );
};

export default Profile;

