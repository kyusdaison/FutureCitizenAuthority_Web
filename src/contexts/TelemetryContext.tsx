import { createContext, useContext, type ReactNode } from 'react';
import { useTelemetry, type TelemetryData } from '../hooks/useTelemetry';

const TelemetryContext = createContext<TelemetryData | undefined>(undefined);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const data = useTelemetry(3000);
  return <TelemetryContext.Provider value={data}>{children}</TelemetryContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTelemetryContext() {
  const ctx = useContext(TelemetryContext);
  if (!ctx) throw new Error('useTelemetryContext must be used within TelemetryProvider');
  return ctx;
}
