'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TabsProps {
  tabs: string[]
  activeTab: string
  onChange: (tab: string) => void
  className?: string
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={`flex space-x-1 bg-dark-bg p-1 rounded-lg ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="relative px-4 py-2 text-sm font-medium transition-colors rounded-md"
        >
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary rounded-md"
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          <span className={`relative z-10 ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
            {tab}
          </span>
        </button>
      ))}
    </div>
  )
}
