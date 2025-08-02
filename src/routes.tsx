import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/layout/Layout';
import { POSInterface } from '@/components/POSInterface';
import { AdminDashboard } from '@/components/AdminDashboard';
import { CustomerManagement } from '@/components/CustomerManagement';
import { InventoryManagement } from '@/components/InventoryManagement';
import { TaxManagement } from '@/components/TaxManagement';
import { DiscountManagement } from '@/components/DiscountManagement';
import { SalesReports } from '@/components/SalesReports';
import { Settings } from '@/components/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/pos" replace />,
          },
          {
            path: 'pos',
            element: <POSInterface />,
          },
          {
            path: 'admin',
            element: <AdminDashboard />,
          },
          {
            path: 'customers',
            element: <CustomerManagement />,
          },
          {
            path: 'inventory',
            element: <InventoryManagement />,
          },
          {
            path: 'taxes',
            element: <TaxManagement />,
          },
          {
            path: 'discounts',
            element: <DiscountManagement />,
          },
          {
            path: 'reports',
            element: <SalesReports />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);
