import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { WalletProvider } from './contexts/WalletContext.tsx'
import { ToastProvider } from './contexts/ToastContext.tsx'
import { SecurityProvider } from './contexts/SecurityContext.tsx'
import { MarketProvider } from './contexts/MarketContext.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { reportWebVitals } from './utils/webVitals.ts'

// Web Vitals 监控组件
const WebVitalsReporter = () => {
  useEffect(() => {
    reportWebVitals();
  }, []);
  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ToastProvider>
        <WalletProvider>
          <MarketProvider>
            <SecurityProvider>
              <WebVitalsReporter />
              <App />
            </SecurityProvider>
          </MarketProvider>
        </WalletProvider>
      </ToastProvider>
    </ErrorBoundary>
  </StrictMode>,
)
