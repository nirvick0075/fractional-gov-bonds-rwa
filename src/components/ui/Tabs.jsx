import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div>
      <div className="flex space-x-2 border-b border-gray-800 mb-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={cn(
              'px-4 py-2 font-medium transition-colors relative',
              activeTab === index
                ? 'text-primary'
                : 'text-gray-400 hover:text-gray-300'
            )}
          >
            {tab.label}
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
