import { cn } from '../../lib/utils';

const Skeleton = ({ className = '', width, height }) => {
  return (
    <div 
      className={cn('animate-pulse bg-gray-800 rounded', className)}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
