"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🎭</div>
              <h2 className="text-2xl font-bold text-[#fbbf24] mb-2">
                The Court is in Recess
              </h2>
              <p className="text-gray-400 mb-4">
                Something went wrong. Please refresh the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[#fbbf24] text-[#0f0f1a] rounded-lg font-bold hover:bg-[#f59e0b] transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
