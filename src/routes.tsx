import { createBrowserRouter, RouteObject } from "react-router-dom";
import DashboardLayout from "./components/layouts/dashboard/DashboardLayout";
import AuthLayout from "./components/layouts/auth/AuthLayout";
import {
  Properties,
  ManageProperty,
  PropertyDetails,
  Home,
  PageNotFound,
  Login,
  Signup,
  ResetPassword,
  Maintenance,
  Settings,
  Report,
  Support,
  Notification,
  ManageMaintenance,
} from "./pages";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "properties/manage",
        element: <ManageProperty />,
      },
      {
        path: "properties/:id",
        element: <PropertyDetails />,
      },

      {
        path: "maintenance",
        element: <Maintenance />,
      },
      {
        path: "maintenance/manage",
        element: <ManageMaintenance />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

const router = createBrowserRouter(routes);

export default router;
