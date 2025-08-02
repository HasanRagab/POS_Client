import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/useAuthStore';
import { Store, Eye, EyeOff, Building2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getCurrentSubdomain, getSubdomainInfo, getMainDomainUrl } from '@/lib/subdomain';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const currentSubdomain = getCurrentSubdomain();
  const { isMainDomain, isLocalhost } = getSubdomainInfo();

  const from = location.state?.from?.pathname || '/app/pos';
  const signupMessage = location.state?.message || new URLSearchParams(location.search).get('message');
  const signupEmail = location.state?.email || new URLSearchParams(location.search).get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data);
      toast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      toast.error((error as Error).message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          {!isMainDomain && !isLocalhost && (
            <div className="mt-2 mb-2">
              <div className="flex items-center justify-center text-blue-600">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="font-semibold">{currentSubdomain}</span>
              </div>
            </div>
          )}
          <p className="text-gray-600 mt-2">
            {!isMainDomain && !isLocalhost 
              ? `Sign in to your ${currentSubdomain} account`
              : 'Sign in to your POS account'
            }
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {signupMessage && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <p className="text-sm text-green-600">{signupMessage}</p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  defaultValue={signupEmail || ''}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password')}
                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Forgot your password?{' '}
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Contact Support
                </button>
              </p>
              {isMainDomain && (
                <p className="text-sm text-gray-600 mt-2">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                    Create an organization
                  </Link>
                </p>
              )}
              {!isMainDomain && !isLocalhost && (
                <p className="text-sm text-gray-600 mt-2">
                  Need to create an organization?{' '}
                  <a 
                    href={getMainDomainUrl() + '/signup'} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Sign up here
                  </a>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            &copy; 2025 POS System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
