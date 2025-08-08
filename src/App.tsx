import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { SubdomainDebugger } from "@/components/dev/SubdomainDebugger";
import { ErrorBoundary } from "@/components/errors/ErrorBoundary";
import { initializeApi } from "@/lib/apiInterceptors";
import { getCurrentSubdomain } from "./lib/subdomain";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    initializeApi();
    checkAuth();
  }, [checkAuth]);

  return (
    <ErrorBoundary>
      <div className="fixed bottom-0 left-0 w-full flex items-center px-4 py-2 bg-gray-900 text-white shadow-lg z-50 space-x-6">
        <span className="font-medium">
          Domain:{" "}
          <span className="font-normal">{window.location.hostname}</span>
        </span>
        <span className="font-medium">
          Subdomain:{" "}
          <span className="font-normal">{getCurrentSubdomain()}</span>
        </span>
      </div>

      <SubdomainDebugger />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            style: {
              background: "#10b981",
            },
          },
          error: {
            style: {
              background: "#ef4444",
            },
          },
        }}
      />
    </ErrorBoundary>
  );
}

export default App;
