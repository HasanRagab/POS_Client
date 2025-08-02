import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Login } from '@/components/Login';
import { CreateOrganization } from '@/components/CreateOrganization';
import { LocationSelector } from '@/components/LocationSelector';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';
import type { Location as LocationType, Organization } from '@/lib/api';

const queryClient = new QueryClient();

export const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showCreateOrg, setShowCreateOrg] = useState(false);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [availableLocations, setAvailableLocations] = useState<LocationType[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Use the enhanced auth service that checks for organization
    if (authService.isAuthenticated()) {
      try {
        await authService.whoami();
        setIsAuthenticated(true);
        
        // Try to get organization info
        try {
          const org = await authService.getOrganizationBySubdomain();
          setOrganization(org);
        } catch (error) {
          // Organization info not available
          setOrganization(null);
        }
      } catch (error) {
        // Clear auth if token is invalid
        authService.logout();
        setIsAuthenticated(false);
        setOrganization(null);
      }
    } else {
      // Check if there's a subdomain but no authentication
      const orgId = authService.getStoredOrgId();
      if (!orgId) {
        // If no org ID, try to get it from subdomain
        try {
          const org = await authService.getOrganizationBySubdomain();
          if (org) {
            localStorage.setItem('org_id', org.id);
            setOrganization(org);
          }
        } catch (error) {
          // Subdomain organization not found, will be handled in Login component
          setOrganization(null);
        }
      }
    }
    setIsLoading(false);
  };

  const handleLoginSuccess = (needsLocationSelection?: boolean, locations?: LocationType[]) => {
    if (needsLocationSelection && locations) {
      // Show location selector
      setAvailableLocations(locations);
      setShowLocationSelector(true);
    } else {
      // Proceed directly to main app
      setIsAuthenticated(true);
      setShowCreateOrg(false);
      checkAuth();
    }
  };

  const handleLocationSelected = (locationId: string) => {
    // Set the current location and update authentication state
    authService.setCurrentLocation(locationId);
    setShowLocationSelector(false);
    setIsAuthenticated(true);
    setShowCreateOrg(false);
    checkAuth();
    toast.success('Location selected successfully');
  };

  const handleCreateOrgSuccess = (orgId: string) => {
    localStorage.setItem('org_id', orgId);
    setShowCreateOrg(false);
    toast.success('Organization created! Please log in with your admin credentials.');
  };

  const handleShowCreateOrg = () => {
    setShowCreateOrg(true);
  };

  const handleBackToLogin = () => {
    setShowCreateOrg(false);
  };

  if (isLoading) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
        <Toaster />
      </QueryClientProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        {showLocationSelector ? (
          <LocationSelector
            organization={organization!}
            locations={availableLocations}
            onLocationSelected={handleLocationSelected}
          />
        ) : showCreateOrg ? (
          <CreateOrganization 
            onSuccess={handleCreateOrgSuccess}
            onBack={handleBackToLogin}
          />
        ) : (
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            onCreateOrg={handleShowCreateOrg}
          />
        )}
        <Toaster />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
};
