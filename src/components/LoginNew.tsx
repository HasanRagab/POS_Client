import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { authService } from '@/lib/auth';
import { subdomainUtils } from '@/lib/subdomain';
import { toast } from 'sonner';
import { Building, AlertCircle, CheckCircle } from 'lucide-react';
import type { LoginDto, Organization } from '@/lib/api';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = LoginDto;

interface LoginProps {
  onLoginSuccess: () => void;
  onCreateOrg: () => void;
}

export function Login({ onLoginSuccess, onCreateOrg }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [orgNotFound, setOrgNotFound] = useState(false);
  const [checkingOrg, setCheckingOrg] = useState(true);
  const [subdomain, setSubdomain] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Check for organization on component mount
  useEffect(() => {
    const checkOrganization = async () => {
      const currentSubdomain = subdomainUtils.getCurrentSubdomain();
      setSubdomain(currentSubdomain);

      if (currentSubdomain) {
        try {
          const org = await authService.getOrganizationBySubdomain();
          if (org) {
            setOrganization(org);
            setOrgNotFound(false);
          } else {
            setOrgNotFound(true);
          }
        } catch (error) {
          setOrgNotFound(true);
        }
      }
      setCheckingOrg(false);
    };

    checkOrganization();
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await authService.login({
        email: data.email,
        password: data.password,
      });

      toast.success('Login successful!');
      onLoginSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToMainDomain = () => {
    subdomainUtils.redirectToMainDomain();
  };

  // Show loading while checking organization
  if (checkingOrg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Checking organization...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show organization not found error
  if (subdomain && orgNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="w-5 h-5 mr-2" />
              Organization Not Found
            </CardTitle>
            <CardDescription>
              The organization "{subdomain}" could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              This subdomain doesn't exist or has been deactivated. Please check the URL or contact support.
            </p>
            <div className="space-y-2">
              <Button onClick={handleGoToMainDomain} className="w-full">
                Go to Main Site
              </Button>
              <Button variant="outline" onClick={onCreateOrg} className="w-full">
                <Building className="w-4 h-4 mr-2" />
                Create New Organization
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="text-center">
            <CardTitle>POS System Login</CardTitle>
            <CardDescription>
              {organization ? `Sign in to ${organization.businessName}` : 'Sign in to your account'}
            </CardDescription>
            
            {/* Show organization info if available */}
            {organization && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {organization.businessName}
                  </span>
                </div>
                <div className="flex justify-center mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {subdomain}.pos.com
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            {/* Only show create organization button if no subdomain */}
            {!subdomain && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Don't have an organization?</p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onCreateOrg}
                >
                  <Building className="w-4 h-4 mr-2" />
                  Create Organization
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
