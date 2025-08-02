import { useState, useEffect } from 'react';
import { MapPin, Building2, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';
import type { Location } from '@/lib/api';

interface LocationHeaderProps {
  onLocationChange?: (locationId: string) => void;
}

export function LocationHeader({ onLocationChange }: LocationHeaderProps) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [availableLocations, setAvailableLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadLocationData();
  }, []);

  const loadLocationData = async () => {
    setIsLoading(true);
    try {
      // Get current location
      const current = await authService.getCurrentLocation();
      setCurrentLocation(current);

      // Get all available locations
      const locations = await authService.getOrganizationLocations();
      setAvailableLocations(locations);
    } catch (error) {
      console.error('Failed to load location data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSwitch = async (locationId: string) => {
    try {
      authService.setCurrentLocation(locationId);
      const newLocation = availableLocations.find(l => l.id === locationId);
      
      if (newLocation) {
        setCurrentLocation(newLocation);
        toast.success(`Switched to ${newLocation.name}`);
        
        if (onLocationChange) {
          onLocationChange(locationId);
        }
        
        // Optionally reload the page to refresh data
        // window.location.reload();
      }
    } catch (error) {
      toast.error('Failed to switch location');
    }
  };

  const handleAccessAllLocations = () => {
    localStorage.removeItem('current_location_id');
    setCurrentLocation(null);
    toast.success('Now accessing all locations');
    
    if (onLocationChange) {
      onLocationChange('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Loading location...</span>
      </div>
    );
  }

  // If no current location is set, show "All Locations" mode
  if (!currentLocation) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">All Locations</span>
          <Badge variant="secondary" className="text-xs">
            Multi-Location Access
          </Badge>
        </div>

        {availableLocations.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Switch Location
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {availableLocations.map((location) => (
                <DropdownMenuItem
                  key={location.id}
                  onClick={() => handleLocationSwitch(location.id)}
                  className="flex items-start space-x-2 p-3"
                >
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">{location.name}</div>
                    {location.address && (
                      <div className="text-xs text-gray-500">
                        {location.address}
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    );
  }

  // Show current location with switch option
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <MapPin className="w-4 h-4 text-green-600" />
        <div>
          <span className="text-sm font-medium">{currentLocation.name}</span>
          {currentLocation.address && (
            <span className="text-xs text-gray-500 ml-2">
              {currentLocation.address}
            </span>
          )}
        </div>
        <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
          Active Location
        </Badge>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Switch
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          {/* Current Location (highlighted) */}
          <DropdownMenuItem className="flex items-start space-x-2 p-3 bg-green-50">
            <Check className="w-4 h-4 text-green-600 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-green-800">{currentLocation.name}</div>
              {currentLocation.address && (
                <div className="text-xs text-green-600">
                  {currentLocation.address}
                </div>
              )}
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Other Locations */}
          {availableLocations
            .filter(location => location.id !== currentLocation.id)
            .map((location) => (
              <DropdownMenuItem
                key={location.id}
                onClick={() => handleLocationSwitch(location.id)}
                className="flex items-start space-x-2 p-3"
              >
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">{location.name}</div>
                  {location.address && (
                    <div className="text-xs text-gray-500">
                      {location.address}
                    </div>
                  )}
                </div>
              </DropdownMenuItem>
            ))}

          <DropdownMenuSeparator />

          {/* Access All Locations Option */}
          <DropdownMenuItem
            onClick={handleAccessAllLocations}
            className="flex items-center space-x-2 p-3"
          >
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-blue-600">Access All Locations</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
