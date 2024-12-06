import { useEffect, useCallback, useMemo, useState } from "react";
import { AxiosResponse } from "axios";
import { RouterProvider } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { NextUIProvider } from "@nextui-org/system";
import {
	useMutation,
	useQuery,
	UseQueryOptions,
	useQueryClient,
} from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

import routes from "./routes";
import { setLogout, setUser } from "./redux/slices/user";
import { refreshToken, authUser } from "./helper/apis/authApi";

export default function App() {
	const [redirected, setRedirected] = useState<boolean>(false);
	const tokens = useMemo(() => Cookies.get("auth_token"), []);
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

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
		mutationFn: refreshToken,
		onSuccess: (data) => {
			Cookies.set(
				"auth_token",
				JSON.stringify({
					access_token: data.data.access_token,
					refresh_token: data.data.refresh_token,
				})
			);
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: (error: any) => {
			throw new Error(error);
		},
	});

	const { data: authUserData, error } = useQuery<AxiosResponse, Error>({
		queryKey: ["authUser"],
		queryFn: authUser,
		enabled: tokens ? !isTokenExpired(JSON.parse(tokens).access_token) : false,
	} as UseQueryOptions<AxiosResponse, Error>);

	const authenticateUser = useCallback(async () => {
		if (!tokens) return;

		try {
			const { access_token, refresh_token } = JSON.parse(tokens);

			if (isTokenExpired(access_token)) {
				mutation.mutate(refresh_token);
			}
		} catch (error) {
			console.error(error);
			dispatch(setLogout());
		}
	}, [tokens]);

	useEffect(() => {
		if (!tokens) return;

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

			if (pathname.includes("dashboard") && !redirected) {
				setRedirected(true);
				window.location.href = "/auth/login";
			}
			return;
		}
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
