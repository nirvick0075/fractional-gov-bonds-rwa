'use client'

import React from 'react'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Hexagon } from 'lucide-react'

export default function NFTsPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <Card>
          <CardContent className="py-20">
            <div className="text-center max-w-md mx-auto">
              <Hexagon size={64} className="mx-auto mb-4 text-primary" />
              <h1 className="text-3xl font-bold text-light-text mb-4">
                NFT Marketplace
              </h1>
              <p className="text-gray-400 mb-6">
                Discover, collect, and trade unique digital assets
              </p>
              <Button variant="primary" size="lg">
                Coming Soon
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <MobileNav />
    </div>
  )
}
