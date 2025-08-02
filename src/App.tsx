import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { SubdomainDebugger } from "@/components/dev/SubdomainDebugger";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { initializeApi } from "@/lib/apiInterceptors";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Initialize API configuration and token management
    initializeApi();
    
    // Check authentication status
    checkAuth();
  }, [checkAuth]);

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <SubdomainDebugger />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10b981',
            },
          },
          error: {
            style: {
              background: '#ef4444',
            },
          },
        }}
      />
    </ErrorBoundary>
  );
}

export default App;
