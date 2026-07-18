interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
  icon?: string;
}

export default function ErrorMessage({ 
  message, 
  onRetry, 
  className = '',
  icon = '⚠️'
}: ErrorMessageProps) {
  return (
    <div className={`bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl flex items-center gap-3 ${className}`}>
      <span className="text-xl">{icon}</span>
      <span className="font-medium flex-1">{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-[#FF6B81] hover:text-[#603060] font-bold underline text-sm transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}