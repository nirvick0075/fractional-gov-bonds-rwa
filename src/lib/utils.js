import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatCurrency(amount, currency = '₹') {
  if (amount >= 10000000) {
    return `${currency}${(amount / 10000000).toFixed(2)}Cr`;
  }
  if (amount >= 100000) {
    return `${currency}${(amount / 100000).toFixed(2)}L`;
  }
  if (amount >= 1000) {
    return `${currency}${(amount / 1000).toFixed(1)}K`;
  }
  return `${currency}${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export function formatPercentage(value) {
  const formatted = Math.abs(value).toFixed(2);
  return value >= 0 ? `+${formatted}%` : `-${formatted}%`;
}

export function formatNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toString();
}

export function getChangeColor(change) {
  return change >= 0 ? 'text-success' : 'text-danger';
}

export function getChangeBgColor(change) {
  return change >= 0 ? 'bg-success/10' : 'bg-danger/10';
}
