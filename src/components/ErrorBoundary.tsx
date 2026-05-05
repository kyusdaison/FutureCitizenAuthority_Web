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
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-8">
          <div className="text-center max-w-lg">
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-fc-gold">Unexpected condition</p>
            <h1 className="text-2xl md:text-3xl font-serif font-light mb-4 leading-tight">
              Something went wrong on this surface.
            </h1>
            <p className="text-sm leading-[1.85] text-slate-400 mb-8">
              The page hit an unexpected condition and could not finish rendering. Reload to recover.
              If this keeps happening, please report it so we can fix the underlying issue.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] border border-fc-gold/40 bg-fc-gold/[0.04] px-6 py-3 text-[11px] font-mono uppercase tracking-[0.2em] text-fc-gold transition-colors hover:border-fc-gold hover:bg-fc-gold/[0.08]"
              >
                Reload page
              </button>
              <a
                href="mailto:security@fca.ms?subject=fca.ms%20unexpected%20error"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] border border-cyan-300/30 bg-cyan-300/[0.04] px-6 py-3 text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-200 transition-colors hover:border-cyan-300/55 hover:bg-cyan-300/10"
              >
                Email security@fca.ms
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
