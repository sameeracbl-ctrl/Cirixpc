import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-neutral-900 border border-white/5 p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,204,255,0.1)]">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="text-red-500 w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 italic">
              System <span className="text-[#00ccff]">Failure</span>
            </h1>
            <p className="text-neutral-400 text-sm font-medium mb-8 leading-relaxed">
              The Citrix Foundry has encountered a critical initialization error. This is usually caused by missing environment configurations.
            </p>
            <div className="bg-black/40 rounded-xl p-4 mb-8 text-left border border-white/5">
              <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest mb-2">Error Log:</p>
              <p className="text-[11px] font-mono text-red-400/80 break-words">
                {this.state.error?.message || 'Unknown runtime exception'}
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-[#00ccff] text-black rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#00ccff]/80 transition-all flex items-center justify-center gap-3"
            >
              <RefreshCw size={18} />
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
