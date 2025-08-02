import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { organizationService } from '@/lib/organizations';
import { toast } from 'sonner';
import { Building, ArrowLeft } from 'lucide-react';
import type { CreateOrganizationDto } from '@/lib/api';

const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
  businessName: z.string().min(1, 'Business name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  subdomain: z.string()
    .min(1, 'Subdomain is required')
    .regex(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/, 
      'Subdomain must contain only lowercase letters, numbers, and hyphens'),
  maxActiveUsers: z.number().min(1, 'Must allow at least 1 user').optional(),
  maxStorageSize: z.number().min(100, 'Must allow at least 100MB storage').optional(),
});

interface CreateOrganizationProps {
  onSuccess: (orgId: string) => void;
  onBack: () => void;
}

export function CreateOrganization({ onSuccess, onBack }: CreateOrganizationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateOrganizationDto>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      maxActiveUsers: 5,
      maxStorageSize: 1000,
    },
  });

  const subdomain = watch('subdomain');

  const onSubmit = async (data: CreateOrganizationDto) => {
    setIsLoading(true);
    try {
      const organization = await organizationService.create(data);
      toast.success('Organization created successfully!');
      onSuccess(organization.id);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create organization';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5" />
                <span>Create Organization</span>
              </CardTitle>
              <CardDescription>
                Set up your business organization to get started
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter organization name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Enter business name"
                    {...register('businessName')}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-red-500">{errors.businessName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex items-center">
                  <Input
                    id="subdomain"
                    type="text"
                    placeholder="your-business"
                    className="rounded-r-none"
                    {...register('subdomain')}
                  />
                  <div className="bg-gray-100 px-3 py-2 text-sm text-gray-600 border border-l-0 rounded-r-md">
                    .yourpos.com
                  </div>
                </div>
                {errors.subdomain && (
                  <p className="text-sm text-red-500">{errors.subdomain.message}</p>
                )}
                {subdomain && (
                  <p className="text-sm text-gray-500">
                    Your POS will be available at: <strong>{subdomain}.yourpos.com</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Admin Account */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Admin Account</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@yourbusiness.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter secure password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Plan Limits */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Plan Limits</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxActiveUsers">Max Active Users</Label>
                  <Input
                    id="maxActiveUsers"
                    type="number"
                    min="1"
                    placeholder="5"
                    {...register('maxActiveUsers', { valueAsNumber: true })}
                  />
                  {errors.maxActiveUsers && (
                    <p className="text-sm text-red-500">{errors.maxActiveUsers.message}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Number of users that can access the system
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStorageSize">Max Storage (MB)</Label>
                  <Input
                    id="maxStorageSize"
                    type="number"
                    min="100"
                    placeholder="1000"
                    {...register('maxStorageSize', { valueAsNumber: true })}
                  />
                  {errors.maxStorageSize && (
                    <p className="text-sm text-red-500">{errors.maxStorageSize.message}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Storage limit for files and data
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="min-w-32">
                {isLoading ? 'Creating...' : 'Create Organization'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
