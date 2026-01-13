import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  if (currency === 'INR') {
    // Format Indian currency (Lakhs and Crores)
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`
    } else {
      return `₹${amount.toLocaleString('en-IN')}`
    }
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

export function formatNumber(num: number, decimals: number = 2): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(decimals) + 'B'
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K'
  }
  return num.toFixed(decimals)
}

export function getChangeColor(value: number): string {
  return value >= 0 ? 'text-success' : 'text-danger'
}

export function getChangeBgColor(value: number): string {
  return value >= 0 ? 'bg-success/10' : 'bg-danger/10'
}
