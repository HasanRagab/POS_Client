import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, ShoppingCart, BarChart, Users, Settings, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app/pos');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: ShoppingCart,
      title: 'Point of Sale',
      description: 'Fast and efficient checkout process with barcode scanning and multiple payment methods.',
    },
    {
      icon: BarChart,
      title: 'Analytics & Reports',
      description: 'Comprehensive insights into sales, inventory, and customer behavior with real-time dashboards.',
    },
    {
      icon: Users,
      title: 'Customer Management',
      description: 'Track customer purchases, manage loyalty programs, and build lasting relationships.',
    },
    {
      icon: Settings,
      title: 'Inventory Control',
      description: 'Real-time inventory tracking, low stock alerts, and automated reorder management.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with role-based permissions and data backup.',
    },
    {
      icon: Store,
      title: 'Multi-Location',
      description: 'Manage multiple stores from one dashboard with location-specific reporting.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-600 p-4 rounded-full">
                <Store className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Modern POS System
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your business operations with our comprehensive point-of-sale solution.
              Manage sales, inventory, customers, and analytics all in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="px-8 py-3">
                <Link to="/signup">
                  Start Your Business
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-3">
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Free 14-day trial • No credit card required
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to run your business
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our POS system provides all the tools you need to manage your retail operation efficiently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using our POS system to grow their sales.
          </p>
          <Button size="lg" variant="secondary" asChild className="px-8 py-3">
            <Link to="/signup">
              Get Started Today
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-700 p-2 rounded-full">
                <Store className="h-6 w-6 text-gray-300" />
              </div>
            </div>
            <p className="text-gray-400">
              &copy; 2025 POS System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
