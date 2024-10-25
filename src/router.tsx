import { createBrowserRouter, RouteObject } from "react-router-dom";
import AccountLayout from "./components/layouts/AccountLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import {
	PropertyDetails,
	Properties,
	Home,
	PageNotFound,
	Login,
	Signup,
	ResetPassword,
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
		path: "/account",
		element: <AccountLayout />,
		children: [
			{
				path: "properties",
				element: <Properties />,
			},
			{
				path: "properties/:id",
				element: <PropertyDetails />,
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
