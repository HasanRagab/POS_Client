import { Store } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-4 rounded-full animate-pulse">
            <Store className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">POS System</h2>
        <p className="text-gray-600 mb-4">Loading your workspace...</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
};
