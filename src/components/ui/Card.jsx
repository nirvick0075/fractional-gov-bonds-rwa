import { cn } from '../../lib/utils';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={cn('bg-dark-card rounded-xl p-4 border border-gray-800', className)} {...props}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return <div className={cn('mb-4', className)}>{children}</div>;
};

const CardTitle = ({ children, className = '' }) => {
  return <h3 className={cn('text-lg font-semibold text-white', className)}>{children}</h3>;
};

const CardContent = ({ children, className = '' }) => {
  return <div className={cn('', className)}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };
