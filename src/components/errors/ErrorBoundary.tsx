import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { getMainDomainUrl } from '@/lib/subdomain';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = getMainDomainUrl();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-orange-600 p-3 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Something went wrong</h1>
              <p className="text-gray-600 mt-2">
                An unexpected error occurred
              </p>
            </div>

            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl font-semibold text-center text-orange-600">
                  Application Error
                </CardTitle>
                <CardDescription className="text-center">
                  We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {this.state.error && (
                  <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                    <p className="text-sm text-orange-700 font-mono">
                      {this.state.error.message}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button onClick={this.handleRefresh} className="w-full" size="lg">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Page
                  </Button>
                  
                  <Button onClick={this.handleGoHome} variant="outline" className="w-full" size="lg">
                    <Home className="h-4 w-4 mr-2" />
                    Go to Main Site
                  </Button>
                </div>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Still having issues?{' '}
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Contact Support
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
