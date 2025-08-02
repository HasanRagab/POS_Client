import { createBrowserRouter, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/pos" replace />,
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
