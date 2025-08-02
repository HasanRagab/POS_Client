import { useState, useEffect } from 'react';
import { getSubdomainInfo, getCurrentSubdomain, isOrganizationSubdomain } from '@/lib/subdomain';
import { OrganizationsService } from '@/api';

export const SubdomainDebugger = () => {
  const subdomainInfo = getSubdomainInfo();
  const currentSubdomain = getCurrentSubdomain();
  const [orgExists, setOrgExists] = useState<boolean | null>(null);
  const [orgChecking, setOrgChecking] = useState(false);

  useEffect(() => {
    const checkOrg = async () => {
      if (!isOrganizationSubdomain()) {
        setOrgExists(null);
        return;
      }

      setOrgChecking(true);
      try {
        const response = await OrganizationsService.getOrgBySubdomain(currentSubdomain);
        setOrgExists(!!response.id);
      } catch {
        setOrgExists(false);
      } finally {
        setOrgChecking(false);
      }
    };

    checkOrg();
  }, [currentSubdomain]);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getOrgStatus = () => {
    if (!isOrganizationSubdomain()) return 'N/A';
    if (orgChecking) return 'Checking...';
    if (orgExists === null) return 'Unknown';
    return orgExists ? 'Exists' : 'Not Found';
  };

  const getOrgStatusColor = () => {
    if (!isOrganizationSubdomain()) return 'text-gray-300';
    if (orgChecking) return 'text-yellow-300';
    if (orgExists === null) return 'text-gray-300';
    return orgExists ? 'text-green-300' : 'text-red-300';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-lg shadow-lg text-xs font-mono z-50 min-w-48">
      <div className="font-bold mb-2 text-center">Subdomain Debug</div>
      <div className="space-y-1">
        <div>Subdomain: <span className="text-blue-300">{currentSubdomain || 'none'}</span></div>
        <div>Main Domain: <span className="text-green-300">{subdomainInfo.isMainDomain ? 'Yes' : 'No'}</span></div>
        <div>Localhost: <span className="text-yellow-300">{subdomainInfo.isLocalhost ? 'Yes' : 'No'}</span></div>
        <div>Org Exists: <span className={getOrgStatusColor()}>{getOrgStatus()}</span></div>
        <div className="text-purple-300 text-xs mt-2 pt-1 border-t border-gray-600">
          {window.location.hostname}
        </div>
      </div>
    </div>
  );
};
