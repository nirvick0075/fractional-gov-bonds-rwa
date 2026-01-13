import { cn } from '../../lib/utils';

const Input = ({ 
  label, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full px-4 py-2 bg-dark-bg border border-gray-700 rounded-lg text-white placeholder-gray-500',
          'focus:outline-none focus:border-primary transition-colors',
          error && 'border-danger',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger">{error}</p>
      )}
    </div>
  );
};

export default Input;
