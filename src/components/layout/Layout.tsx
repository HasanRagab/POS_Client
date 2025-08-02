import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Store, 
  Settings, 
  LogOut, 
  User, 
  Users, 
  Package, 
  BarChart3,
  Cog,
  Calculator,
  Percent
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AuthService } from '@/api';

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    window.location.reload();
  };

  const navigationItems = [
    { path: '/pos', label: 'POS', icon: Store },
    { path: '/admin', label: 'Admin', icon: Settings },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/inventory', label: 'Inventory', icon: Package },
    { path: '/taxes', label: 'Taxes', icon: Calculator },
    { path: '/discounts', label: 'Discounts', icon: Percent },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Cog },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-bold">POS System</h1>
            
            <nav className="flex space-x-2">
              {navigationItems.map(({ path, label, icon: Icon }) => (
                <Button
                  key={path}
                  variant={location.pathname === path ? 'default' : 'outline'}
                  onClick={() => navigate(path)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-6">

            {user && (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            )}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
