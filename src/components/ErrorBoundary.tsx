import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    // 可以在这里集成Sentry等错误追踪服务
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 border border-red-500/50 bg-red-500/10 flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold mb-4 font-serif">System Anomaly Detected</h1>
            <p className="text-gray-400 mb-8 text-sm">
              An unexpected error has occurred. Please reload the interface.
            </p>
            <button 
              onClick={this.handleReload}
              className="px-8 py-3 bg-fc-gold text-black text-xs font-bold tracking-[0.3em] uppercase hover:bg-white transition-colors"
            >
              Reload System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
