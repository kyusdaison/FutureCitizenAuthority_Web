import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import { AgencyToast, type ToastType } from '../components/AgencyToast';
import { AnimatePresence } from 'framer-motion';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

interface ToastItem extends ToastOptions {
  id: string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  // 清理函数
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      // 组件卸载时清理所有定时器
      timers.forEach(timer => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(({ message, type = 'info', duration = 5000 }: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, type, duration };
    
    setToasts((prev) => [...prev, newToast]);

    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);
    
    timersRef.current.set(id, timer);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <AgencyToast 
              key={t.id} 
              message={t.message} 
              type={t.type} 
              onClose={() => removeToast(t.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
