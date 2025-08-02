import { useState, useEffect } from 'react';
import { Building2, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { authService } from '@/lib/auth';
import { toast } from 'sonner';
import type { Location, Organization } from '@/lib/api';

interface LocationSelectorProps {
  organization: Organization;
  locations: Location[];
  onLocationSelected: (locationId: string) => void;
  onSkip?: () => void;
}

export function LocationSelector({ 
  organization, 
  locations, 
  onLocationSelected,
  onSkip 
}: LocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Check if user already has a location selected
    const currentLocationId = authService.getCurrentLocationId();
    if (currentLocationId) {
      setSelectedLocation(currentLocationId);
      const location = locations.find(l => l.id === currentLocationId);
      if (location) {
        setCurrentLocation(location);
      }
    }
  }, [locations]);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    const location = locations.find(l => l.id === locationId);
    setCurrentLocation(location || null);
  };

  const handleConfirm = () => {
    if (!selectedLocation) {
      toast.error('Please select a location');
      return;
    }

    authService.setCurrentLocation(selectedLocation);
    toast.success(`Selected location: ${currentLocation?.name}`);
    onLocationSelected(selectedLocation);
  };

  const handleSkip = () => {
    // Allow access without specific location (admin/multi-location access)
    if (onSkip) {
      onSkip();
    } else {
      onLocationSelected(''); // Empty string indicates no specific location
    }
  };

  if (locations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <CardTitle>No Locations Found</CardTitle>
            <CardDescription>
              No locations are configured for {organization.businessName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Contact your administrator to set up locations for this organization.
            </p>
            <Button onClick={handleSkip} className="w-full">
              Continue Without Location
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <CardTitle>Select Your Location</CardTitle>
          <CardDescription>
            Choose the location you'll be working from at {organization.businessName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Location Display */}
          {currentLocation && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Selected: {currentLocation.name}
                </span>
              </div>
            </div>
          )}

          {/* Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => (
              <div
                key={location.id}
                className={`
                  relative p-4 border-2 rounded-lg cursor-pointer transition-all
                  ${selectedLocation === location.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => handleLocationSelect(location.id)}
              >
                {/* Selection Indicator */}
                {selectedLocation === location.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )}

                {/* Location Info */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {location.name}
                      </h3>
                      {location.address && (
                        <p className="text-sm text-gray-600 mt-1">
                          {location.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-1">
                    {location.phone && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Phone:</span>
                        <span className="text-xs text-gray-700">{location.phone}</span>
                      </div>
                    )}
                    {location.email && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Email:</span>
                        <span className="text-xs text-gray-700">{location.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {location.id.slice(0, 8)}
                    </Badge>
                    {selectedLocation === location.id && (
                      <Badge className="text-xs bg-blue-600">
                        Selected
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedLocation}
              className="flex-1"
            >
              Continue with Selected Location
            </Button>
            {onSkip && (
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="flex-1"
              >
                Access All Locations
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              You can change your location later in the settings
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
