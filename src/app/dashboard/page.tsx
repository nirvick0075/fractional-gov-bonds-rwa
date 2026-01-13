import React from 'react'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import DashboardContent from '@/components/dashboard/DashboardContent'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20 lg:pb-6">
        <DashboardContent />
      </main>
      <MobileNav />
    </div>
  )
}
