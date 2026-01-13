import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-light-text mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 bg-dark-bg border border-dark-card rounded-lg',
          'text-light-text placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'transition-all duration-200',
          error && 'border-danger focus:ring-danger',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  )
}
