import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

import routes from "./routes";
import useAuth from "./hooks/useAuth";
import { setUser } from "./redux/slices/user";

export default function App() {
	const { handleRefreshToken, getAuthUser } = useAuth();
	const tokens = Cookies.get("auth_token");
	const dispatch = useDispatch();

	const isTokenExpired = (token: string): boolean => {
		try {
			const decoded: { exp: number } = jwtDecode(token);
			return decoded.exp * 1000 < Date.now();
		} catch (err) {
			console.error(err);
			return false;
		}
	};

	const mutation = useMutation({
		mutationKey: ["refresh_token"],
		mutationFn: handleRefreshToken,
		onSuccess: (data) => {
			Cookies.set(
				"auth_token",
				JSON.stringify({
					access_token: data.data.access_token,
					refresh_token: data.data.refresh_token,
				})
			);
		},
		onError: (error) => {
			console.log("Error: ", error);
		},
	});

	const { data: authUserData, error } = useQuery<AxiosResponse, Error>({
		queryKey: ["authUser"],
		queryFn: () => {
			return getAuthUser();
		},
		enabled: tokens ? !isTokenExpired(JSON.parse(tokens).access_token) : false,
	} as UseQueryOptions<AxiosResponse, Error>);

	const authenticateUser = async () => {
		if (!tokens) {
			return;
		}

		try {
			const { access_token, refresh_token } = JSON.parse(tokens);

			if (isTokenExpired(access_token)) {
				mutation.mutate(refresh_token);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		authenticateUser();
	}, [tokens]);

	useEffect(() => {
		if (authUserData) {
			dispatch(
				setUser({
					user: authUserData.data.user,
					stats: authUserData.data.stats,
				})
			);
		}
	}, [authUserData, dispatch]);

	const pathname = window.location.pathname;

	useEffect(() => {
		if (error || !tokens) {
			dispatch(setUser({ user: null, stats: null }));

			if (pathname.includes("dashboard")) {
				window.location.href = "/auth/login";
			}
			return;
		}
		console.log(pathname);
	}, [error, pathname, tokens]);

	return (
		<NextUIProvider>
			<RouterProvider router={routes} />
			<ToastContainer
				transition={Bounce}
				autoClose={3000}
				hideProgressBar={true}
			/>
		</NextUIProvider>
	);
}
