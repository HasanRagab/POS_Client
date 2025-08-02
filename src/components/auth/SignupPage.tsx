import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OrganizationsService, CreateOrgDto } from '@/api';
import { Store, Eye, EyeOff, Building2, Globe, Mail, Phone, Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getOrgUrl, getSubdomainInfo } from '@/lib/subdomain';

const signupSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  subdomain: z.string()
    .min(3, 'Subdomain must be at least 3 characters')
    .max(20, 'Subdomain must not exceed 20 characters')
    .regex(/^[a-z0-9-]+$/, 'Subdomain can only contain lowercase letters, numbers, and hyphens')
    .refine((val) => !val.startsWith('-') && !val.endsWith('-'), 'Subdomain cannot start or end with hyphens'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  // Check if we're on the main domain (signup should only be available on main domain)
  const { isMainDomain, isLocalhost } = getSubdomainInfo();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  // Redirect to main domain if accessing signup from subdomain
  if (!isMainDomain && !isLocalhost) {
    window.location.href = `${window.location.protocol}//${window.location.hostname.split('.').slice(-2).join('.')}/signup`;
    return null;
  }

  const watchedSubdomain = watch('subdomain');

  const checkSubdomainAvailability = async (subdomain: string) => {
    if (!subdomain || subdomain.length < 3) return;
    
    try {
      await OrganizationsService.getOrgBySubdomain(subdomain);
      // If we get here, subdomain exists
      return false;
    } catch {
      // If we get an error, subdomain is likely available
      return true;
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);

      // Check subdomain availability one more time
      const isAvailable = await checkSubdomainAvailability(data.subdomain);
      if (!isAvailable) {
        toast.error('Subdomain is already taken. Please choose another.');
        setIsLoading(false);
        return;
      }

      const createOrgData: CreateOrgDto = {
        businessName: data.businessName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        subdomain: data.subdomain,
      };

      const res = await OrganizationsService.createOrg(createOrgData);

      if (res) {
        toast.success('Organization created successfully!');
        const orgUrl = getOrgUrl(data.subdomain);
        window.location.href = `${orgUrl}/login?message=${encodeURIComponent('Account created successfully! You can now log in.')}&email=${encodeURIComponent(data.email)}`;
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error((error as Error).message || 'Failed to create organization. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate: (keyof SignupFormData)[] = step === 1 
      ? ['businessName', 'subdomain'] 
      : ['email', 'phone', 'password', 'confirmPassword'];
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (step === 1) {
        // Check subdomain availability before proceeding
        const isAvailable = await checkSubdomainAvailability(watchedSubdomain);
        if (!isAvailable) {
          toast.error('Subdomain is already taken. Please choose another.');
          return;
        }
      }
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getSubdomainPreview = (subdomain: string) => {
    const { isLocalhost } = getSubdomainInfo();
    if (isLocalhost) {
      return subdomain ? `${subdomain}.localhost:${window.location.port}` : 'yoursubdomain.localhost:5174';
    }
    const mainDomain = window.location.hostname.split('.').slice(-2).join('.');
    return subdomain ? `${subdomain}.${mainDomain}` : `yoursubdomain.${mainDomain}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Your POS</h1>
          <p className="text-gray-600 mt-2">Start your journey with a powerful point-of-sale system</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              Sign Up {step === 1 ? '- Business Info' : '- Account Details'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 1 
                ? 'Tell us about your business' 
                : 'Create your admin account'
              }
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'}`} />
                <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`} />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                      {...register('businessName')}
                      className={errors.businessName ? 'border-red-500' : ''}
                    />
                    {errors.businessName && (
                      <p className="text-sm text-red-600">{errors.businessName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subdomain" className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      Choose Your Subdomain
                    </Label>
                    <Input
                      id="subdomain"
                      placeholder="mystore"
                      {...register('subdomain')}
                      className={errors.subdomain ? 'border-red-500' : ''}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                        e.target.value = value;
                        register('subdomain').onChange(e);
                      }}
                    />
                    {watchedSubdomain && (
                      <p className="text-sm text-gray-600">
                        Your store will be available at: <strong>{getSubdomainPreview(watchedSubdomain)}</strong>
                      </p>
                    )}
                    {errors.subdomain && (
                      <p className="text-sm text-red-600">{errors.subdomain.message}</p>
                    )}
                  </div>

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full"
                    disabled={!watchedSubdomain}
                  >
                    Continue
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Admin Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register('email')}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register('phone')}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        {...register('password')}
                        className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating...
                        </div>
                      ) : (
                        'Create Organization'
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-800 font-medium">
                  Sign in here
                </Link>
              </p>
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
