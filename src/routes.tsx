import { createBrowserRouter, RouteObject } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import {
	AddProperty,
	EditProperty,
	Properties,
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
	CreateMaintenance,
	UpdateMaintenance,
	AddTenant,
	EditTenant,
	TenantDetail,
	MaintenanceDetails,
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
				path: "properties/add",
				element: <AddProperty />,
			},
			{
				path: "properties/edit/:id",
				element: <EditProperty />,
			},

			{
				path: "properties/:id",
				element: <PropertyDetails />,
			},
			{
				path: "tenants/:id",
				element: <TenantDetail />,
			},
			{
				path: "tenants/add/:current_property",
				element: <AddTenant />,
			},
			{
				path: "tenants/edit/:id",
				element: <EditTenant />,
			},
			{
				path: "maintenance",
				element: <Maintenance />,
			},
			{
				path: "maintenance/add",
				element: <CreateMaintenance />,
			},
			{
				path: "maintenance/:id",
				element: <MaintenanceDetails />,
			},
			{
				path: "maintenance/update/:id",
				element: <UpdateMaintenance />,
			},
			{
				path: "notifications",
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
