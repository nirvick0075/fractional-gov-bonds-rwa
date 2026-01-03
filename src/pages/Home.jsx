import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { 
  Shield, 
  TrendingUp, 
  Zap, 
  Lock, 
  Globe, 
  Users,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Coins
} from 'lucide-react';
import { mockBonds } from '../data/mockData';

const Home = () => {
  const { isConnected, connectWallet } = useWeb3();

  const features = [
    {
      icon: Shield,
      title: 'Government-Backed Security',
      description: 'All bonds are backed by sovereign governments with transparent credit ratings.',
      color: 'blue',
    },
    {
      icon: Coins,
      title: 'Fractional Ownership',
      description: 'Invest in government bonds with as little as $100 through tokenization.',
      color: 'purple',
    },
    {
      icon: Zap,
      title: 'Instant Liquidation',
      description: 'Trade bonds 24/7 on the secondary market with instant settlement.',
      color: 'green',
    },
    {
      icon: Lock,
      title: 'Non-Custodial',
      description: 'You control your assets. Your wallet, your keys, your bonds.',
      color: 'red',
    },
    {
      icon: BarChart3,
      title: 'Automated Yield',
      description: 'Receive coupon payments automatically via smart contracts.',
      color: 'yellow',
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access government bonds from multiple countries in one platform.',
      color: 'indigo',
    },
  ];

  const stats = [
    { label: 'Total Value Locked', value: '$47.3M', icon: TrendingUp },
    { label: 'Active Bonds', value: '24', icon: Shield },
    { label: 'Global Investors', value: '8,429', icon: Users },
    { label: 'Avg. APY', value: '4.8%', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="section-container relative py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Tokenized Government Bonds on Blockchain
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Trade government bonds instantly with fractional ownership and complete transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isConnected ? (
                  <Link to="/marketplace" className="btn-primary bg-white text-blue-600">
                    Explore Marketplace
                  </Link>
                ) : (
                  <button onClick={connectWallet} className="btn-primary bg-white text-blue-600">
                    Connect Wallet to Start
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <stat.icon className="w-8 h-8 mb-3" />
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-container py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose BondChain?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="card-hover">
              <f.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Bonds */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="section-container">
          <h2 className="text-4xl font-bold mb-12">Featured Government Bonds</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockBonds.slice(0, 3).map((bond) => (
              <Link key={bond.id} to={`/bond/${bond.id}`} className="card-hover">
                <h3 className="font-bold text-lg mb-1">{bond.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{bond.issuer}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Yield</p>
                    <p className="text-xl font-bold text-blue-600">{bond.currentYield}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-xl font-bold">${bond.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="section-container text-center">
          <p>&copy; 2026 BondChain. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
