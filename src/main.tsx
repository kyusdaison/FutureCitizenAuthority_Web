import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { WalletProvider } from './contexts/WalletContext.tsx'
import { ToastProvider } from './contexts/ToastContext.tsx'
import { SecurityProvider } from './contexts/SecurityContext.tsx'
import { MarketProvider } from './contexts/MarketContext.tsx'
import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { TelemetryProvider } from './contexts/TelemetryContext.tsx'
import { reportWebVitals } from './utils/webVitals.ts'

// Web Vitals 监控组件
// eslint-disable-next-line react-refresh/only-export-components
const WebVitalsReporter = () => {
  useEffect(() => {
    reportWebVitals();
  }, []);
  return null;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ErrorBoundary>
      <ToastProvider>
        <WalletProvider>
          <MarketProvider>
            <TelemetryProvider>
            <SecurityProvider>
              <WebVitalsReporter />
              <App />
            </SecurityProvider>
            </TelemetryProvider>
          </MarketProvider>
        </WalletProvider>
      </ToastProvider>
    </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
