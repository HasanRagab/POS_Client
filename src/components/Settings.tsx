import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  Store, 
  Users, 
  Bell, 
  Shield,
  Palette,
  Database,
  Wifi
} from 'lucide-react';

export const Settings = () => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" placeholder="Enter business name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="business-address">Business Address</Label>
              <Input id="business-address" placeholder="Enter business address" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="business@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" placeholder="8.25" />
            </div>

            <Button>Save General Settings</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Store className="w-4 h-4 mr-2" />
              Store Configuration
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              User Management
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Database className="w-4 h-4 mr-2" />
              Backup Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Wifi className="w-4 h-4 mr-2" />
              System Status
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="low-stock">Low Stock Alerts</Label>
                <p className="text-sm text-gray-600">Get notified when inventory is low</p>
              </div>
              <Switch id="low-stock" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-reports">Daily Reports</Label>
                <p className="text-sm text-gray-600">Receive daily sales summaries</p>
              </div>
              <Switch id="daily-reports" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="new-orders">New Order Alerts</Label>
                <p className="text-sm text-gray-600">Sound when new orders arrive</p>
              </div>
              <Switch id="new-orders" />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Add extra security to your account</p>
              </div>
              <Switch id="two-factor" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-logout">Auto Logout</Label>
                <p className="text-sm text-gray-600">Logout after inactivity</p>
              </div>
              <Switch id="auto-logout" />
            </div>
            
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <Switch id="dark-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="compact-view">Compact View</Label>
                <p className="text-sm text-gray-600">Reduce spacing in lists</p>
              </div>
              <Switch id="compact-view" />
            </div>
            
            <div className="space-y-2">
              <Label>Language</Label>
              <select className="w-full p-2 border rounded-md">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
