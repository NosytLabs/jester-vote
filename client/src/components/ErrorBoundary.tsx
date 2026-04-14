import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "wouter";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the entire app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error("[ErrorBoundary] Caught error:", error);
    console.error("[ErrorBoundary] Component stack:", errorInfo.componentStack);

    this.setState({ error, errorInfo });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // Could also send to error reporting service here
    // Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI with jester theme
      return (
        <div className="min-h-screen bg-gradient-court flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="jester-card max-w-md w-full text-center p-8"
          >
            {/* Error Icon */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6"
              style={{
                background: "oklch(0.65 0.22 25 / 0.2)",
                border: "2px solid oklch(0.65 0.22 25)",
                borderRadius: "50%",
              }}
            >
              <AlertTriangle size={40} style={{ color: "oklch(0.65 0.22 25)" }} />
            </motion.div>

            {/* Title */}
            <h1
              className="text-2xl font-black mb-2"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              The Court Adjourned!
            </h1>

            {/* Subtitle */}
            <p className="text-muted-foreground mb-6">
              A jester has caused chaos in the courtroom. Our royal technicians have been notified.
            </p>

            {/* Error Details (collapsed) */}
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View Error Details
                </summary>
                <div className="mt-2 p-3 bg-muted rounded text-xs font-mono overflow-auto max-h-32">
                  <p className="text-red-500">{this.state.error.message}</p>
                  {this.state.errorInfo && (
                    <pre className="mt-2 text-muted-foreground whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                onClick={this.handleReset}
                className="jester-button flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={18} />
                Try Again
              </motion.button>

              <motion.button
                onClick={this.handleReload}
                className="jester-button-outline flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={18} />
                Reload Page
              </motion.button>

              <Link href="/">
                <motion.button
                  className="jester-button-secondary flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home size={18} />
                  Go Home
                </motion.button>
              </Link>
            </div>

            {/* Footer */}
            <p className="text-xs text-muted-foreground mt-6">
              Error ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook for functional components to catch errors in children
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  if (error) {
    throw error;
  }

  return setError;
}

/**
 * Async error boundary wrapper for data fetching
 */
export function AsyncErrorBoundary({
  children,
  loadingFallback,
  errorFallback,
}: {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
}) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <React.Suspense fallback={loadingFallback || <DefaultLoadingFallback />}>
        {children}
      </React.Suspense>
    </ErrorBoundary>
  );
}

function DefaultLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-[oklch(0.75_0.25_140)] border-t-transparent rounded-full"
      />
    </div>
  );
}

export default ErrorBoundary;
