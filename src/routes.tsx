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
	UserProfile,
	ChangePassword,
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
				path: "profile",
				element: <UserProfile />,
			},
			{
				path: "profile/change_password",
				element: <ChangePassword />,
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
				path: "maintenances",
				element: <Maintenance />,
			},
			{
				path: "maintenances/add",
				element: <CreateMaintenance />,
			},

			{
				path: "maintenances/update/:id",
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
