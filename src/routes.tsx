import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LoginPage, SignupPage, ProtectedRoute, SubdomainGuard, OrganizationChecker } from "@/components/auth";
import { LandingPage } from "@/components/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SubdomainGuard requiresOrganization={false}>
        <LandingPage />
      </SubdomainGuard>
    ),
  },
  {
    path: "/login",
    element: (
      <OrganizationChecker>
        <LoginPage />
      </OrganizationChecker>
    ),
  },
  {
    path: "/signup",
    element: (
      <SubdomainGuard requiresOrganization={false}>
        <SignupPage />
      </SubdomainGuard>
    ),
  },
  // Legacy route redirects
  {
    path: "/pos",
    element: <Navigate to="/app/pos" replace />,
  },
  {
    path: "/admin",
    element: <Navigate to="/app/admin" replace />,
  },
  {
    path: "/customers", 
    element: <Navigate to="/app/customers" replace />,
  },
  {
    path: "/inventory",
    element: <Navigate to="/app/inventory" replace />,
  },
  {
    path: "/taxes",
    element: <Navigate to="/app/taxes" replace />,
  },
  {
    path: "/discounts",
    element: <Navigate to="/app/discounts" replace />,
  },
  {
    path: "/reports",
    element: <Navigate to="/app/reports" replace />,
  },
  {
    path: "/settings",
    element: <Navigate to="/app/settings" replace />,
  },
  {
    path: "/app",
    element: (
      <OrganizationChecker>
        <SubdomainGuard requiresOrganization={true}>
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        </SubdomainGuard>
      </OrganizationChecker>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/app/pos" replace />,
      },
      {
        path: "pos",
        element: <div>POS Interface</div>,
      },
      {
        path: "admin",
        element: <div>Admin Interface</div>,
      },
      {
        path: "customers",
        element: <div>Customer Management Interface</div>,
      },
      {
        path: "inventory",
        element: <div>Inventory Management Interface</div>,
      },
      {
        path: "taxes",
        element: <div>Tax Management Interface</div>,
      },
      {
        path: "discounts",
        element: <div>Discount Management Interface</div>,
      },
      {
        path: "reports",
        element: <div>Sales Reports Interface</div>,
      },
      {
        path: "settings",
        element: <div>Settings Interface</div>,
      },
    ],
  },
]);
