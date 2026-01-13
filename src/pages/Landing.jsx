import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { platformStats } from '../lib/mockData';
import { formatNumber } from '../lib/utils';

const Landing = () => {
  const stats = [
    { label: 'Daily Volume', value: `$${formatNumber(platformStats.dailyVolume / 83.5)}` },
    { label: 'Active Users', value: formatNumber(platformStats.activeUsers) },
    { label: 'Markets', value: platformStats.totalMarkets },
  ];
  
  const features = [
    {
      icon: <TrendingUp size={32} className="text-primary" />,
      title: 'Instant Trading',
      description: 'Execute trades instantly with real-time market data and advanced charts'
    },
    {
      icon: <Shield size={32} className="text-success" />,
      title: 'Secure Wallet',
      description: 'Bank-grade security with multi-signature wallets and cold storage'
    },
    {
      icon: <Zap size={32} className="text-warning" />,
      title: 'Smart Tools',
      description: 'Copy trading, staking, and automated strategies for passive income'
    },
  ];
  
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Trade Crypto with
              <br />
              <span className="text-primary">Confidence</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Professional trading platform with advanced tools, real-time data, and secure wallet management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Trading <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/markets">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Markets
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          >
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="text-center py-6">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-white mb-12"
          >
            Why Choose TradePro
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of traders already using TradePro for their crypto journey
              </p>
              <Link to="/dashboard">
                <Button size="lg">
                  Get Started Now <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
      <MobileNav />
    </>
  );
};

export default Landing;
