import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, AlertCircle, Home, Plus } from 'lucide-react';
import { getCurrentSubdomain, getMainDomainUrl } from '@/lib/subdomain';

interface OrganizationNotFoundProps {
  subdomain?: string;
  message?: string;
}

export const OrganizationNotFound = ({ 
  subdomain, 
  message 
}: OrganizationNotFoundProps) => {
  const currentSubdomain = subdomain || getCurrentSubdomain();
  const mainDomainUrl = getMainDomainUrl();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Organization Not Found</h1>
          <p className="text-gray-600 mt-2">
            The organization you're looking for doesn't exist
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold text-center text-red-600">
              "{currentSubdomain}" Not Found
            </CardTitle>
            <CardDescription className="text-center">
              {message || `The organization "${currentSubdomain}" does not exist or may have been removed.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-red-700">
                  <p className="font-medium mb-1">What you can do:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check if you typed the subdomain correctly</li>
                    <li>Contact the organization administrator</li>
                    <li>Create a new organization if you don't have one</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <a href={mainDomainUrl}>
                  <Home className="h-4 w-4 mr-2" />
                  Go to Main Site
                </a>
              </Button>
              
              <Button asChild variant="outline" className="w-full" size="lg">
                <a href={`${mainDomainUrl}/signup`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Organization
                </a>
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Contact Support
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <div className="flex justify-center mb-2">
            <div className="bg-gray-200 p-2 rounded-full">
              <Store className="h-4 w-4 text-gray-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            &copy; 2025 POS System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
