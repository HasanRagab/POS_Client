import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubdomainInfo, getMainDomainUrl } from '@/lib/subdomain';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

interface SubdomainGuardProps {
  children: React.ReactNode;
  requiresOrganization?: boolean; // true for app routes, false for public routes
}

export const SubdomainGuard = ({ children, requiresOrganization = false }: SubdomainGuardProps) => {
  const navigate = useNavigate();
  const { isMainDomain, isLocalhost } = getSubdomainInfo();

  useEffect(() => {
    // If we require an organization subdomain but we're on the main domain
    if (requiresOrganization && isMainDomain && !isLocalhost) {
      // Redirect to main domain landing page
      window.location.href = getMainDomainUrl();
      return;
    }
    
    // If we're on a subdomain but accessing public routes (signup/landing)
    if (!requiresOrganization && !isMainDomain && !isLocalhost) {
      // Only redirect if it's the landing page - login should stay on subdomain
      if (window.location.pathname === '/') {
        window.location.href = getMainDomainUrl();
        return;
      }
    }
  }, [requiresOrganization, isMainDomain, isLocalhost, navigate]);

  // Show loading while redirecting
  if (requiresOrganization && isMainDomain && !isLocalhost) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
