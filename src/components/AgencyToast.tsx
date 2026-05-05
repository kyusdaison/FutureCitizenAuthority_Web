import { motion } from 'framer-motion';

export type ToastType = 'success' | 'process' | 'error' | 'info';

interface AgencyToastProps {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}

export const AgencyToast = ({ message, type = 'info', onClose }: AgencyToastProps) => {
  const bgColors = {
    success: 'bg-green-500/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]',
    process: 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]',
    error: 'bg-red-500/10 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
    info: 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
  };

  const textColors = {
    success: 'text-green-400',
    process: 'text-yellow-400',
    error: 'text-red-400',
    info: 'text-cyan-400'
  };

  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    process: (
      <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    ),
    error: (
      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`agency-panel border p-4  flex items-start gap-4 backdrop-blur-3xl min-w-[300px] pointer-events-auto ${bgColors[type]}`}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex flex-col">
        <span className={`text-[10px] text-telemetry uppercase font-bold tracking-widest ${textColors[type]} mb-1`}>
          {type === 'process' ? 'System Processing' : `System ${type}`}
        </span>
        <span className="text-xs font-mono text-white leading-relaxed">
          {message}
        </span>
      </div>
      
      {/* Subtle status sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent absolute top-0 -translate-y-full animate-[scan_2s_linear_infinite]" />
      </div>
      
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white/40 hover:text-white/80 transition-colors p-1"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.div>
  );
};
