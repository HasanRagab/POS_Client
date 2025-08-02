import { useEffect, useState } from 'react';
import { OrganizationsService } from '@/api';
import { getCurrentSubdomain, isOrganizationSubdomain } from '@/lib/subdomain';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { OrganizationNotFound } from '@/components/errors/OrganizationNotFound';

interface OrganizationCheckerProps {
  children: React.ReactNode;
}

export const OrganizationChecker = ({ children }: OrganizationCheckerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [organizationExists, setOrganizationExists] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkOrganization = async () => {
      // If we're not on an organization subdomain, no need to check
      if (!isOrganizationSubdomain()) {
        setIsLoading(false);
        setOrganizationExists(true);
        return;
      }

      const subdomain = getCurrentSubdomain();
      
      try {
        setIsLoading(true);
        const response = await OrganizationsService.getOrgBySubdomain(subdomain);
        
        if (response.id) {
          setOrganizationExists(true);
          setError(null);
        } else {
          setOrganizationExists(false);
          setError(`Organization "${subdomain}" not found`);
        }
      } catch (error: unknown) {
        console.error('Organization check failed:', error);
        setOrganizationExists(false);
        
        const apiError = error as { status?: number; message?: string };
        
        // Handle different error types
        if (apiError.status === 404) {
          setError(`Organization "${subdomain}" does not exist`);
        } else if (apiError.status === 500) {
          setError(`Server error while checking organization "${subdomain}". Please try again later.`);
        } else {
          setError(`Unable to verify organization "${subdomain}". Please check your connection.`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkOrganization();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!organizationExists) {
    return <OrganizationNotFound message={error || undefined} />;
  }

  return <>{children}</>;
};
