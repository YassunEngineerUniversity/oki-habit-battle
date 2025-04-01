import { Loader2 } from 'lucide-react';

interface LoadingProps {
  width?: string;
  height?: string;
  color?: string;
}

const Loading = ({
  width = "w-6",
  height = "h-6",
  color = 'border-white-500',
}: LoadingProps) => {
  return (
    <div className={`animate-spin border-2 rounded-full border-t-transparent ${color} ${height} ${width}`}></div>
  );
}

export default Loading;