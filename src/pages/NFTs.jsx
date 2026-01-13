import { ImageIcon } from 'lucide-react';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import { Card, CardContent } from '../components/ui/Card';

const NFTs = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6 pb-24 lg:pb-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">NFTs</h1>
          <p className="text-gray-400">NFT marketplace coming soon</p>
        </div>
        
        <Card>
          <CardContent className="py-20 text-center">
            <ImageIcon size={64} className="text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">NFT Marketplace</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Discover, collect, and trade unique digital assets. Our NFT marketplace is launching soon!
            </p>
          </CardContent>
        </Card>
      </div>
      <MobileNav />
    </>
  );
};

export default NFTs;
