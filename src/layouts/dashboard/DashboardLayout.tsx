import { Outlet, useNavigate } from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useQuery, useMutation, UseQueryOptions } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { AxiosResponse } from "axios";
import { setUser } from "../../redux/slices/user";
import { motion } from "framer-motion";
import { ArrowBack } from "../../components/svgs";
import Button from "../../components/ui/Button";

const DashboardLayout: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const { dashboardPageTitle } = useSelector((state: RootState) => state.app);
	const { user } = useSelector((state: RootState) => state.user);
	const { handleRefreshToken, getAuthUser } = useAuth();

	const tokens = Cookies.get("auth_token");

	const toggleSidebar = useCallback(() => {
		if (windowWidth < 768) {
			setIsSidebarOpen((prev) => !prev);
		}
	}, [windowWidth]);

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
			navigate("/auth/login");
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

	useEffect(() => {
		if (!error) return;
		navigate("/auth/login");
	}, [error, navigate]);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (windowWidth > 768) {
			setIsSidebarOpen(true);
		} else {
			setIsSidebarOpen(false);
		}
	}, [windowWidth]);

	return (
		<main
			id="dashboard-layout"
			className="w-full h-screen max-w-[1440px] mx-auto"
		>
			<div className="flex h-full">
				<motion.div
					className={`fixed md:static z-50 bg-black/20  left-0 top-0  h-full`}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					aria-hidden={!isSidebarOpen}
					aria-expanded={isSidebarOpen}
					aria-controls="sidebar"
					initial={{
						width: windowWidth > 768 ? 250 : 0,
						opacity: 0,
					}}
					animate={{
						opacity: isSidebarOpen ? 1 : 0,
						width: isSidebarOpen ? (windowWidth > 768 ? 250 : "100%") : "0",
					}}
					transition={{
						type: "spring",
						stiffness: 300,
						damping: 30,
						duration: 1000,
					}}
				>
					<motion.div
						initial={{ width: windowWidth > 768 ? 250 : 0 }}
						animate={{
							width: isSidebarOpen ? (windowWidth > 768 ? "100%" : "80%") : "0",
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
							duration: 500,
						}}
						className={`h-full bg-primary overflow-auto scrollbar-thin scrollbar-rounded`}
						onClick={(event) => event.stopPropagation()}
					>
						<Sidebar
							isSidebarOpen={isSidebarOpen}
							name={user?.name}
							image_uri={user?.image_url as string | undefined}
							onSidebarClose={toggleSidebar}
						/>
					</motion.div>
				</motion.div>
				<div className="flex-1 relative h-screen overflow-auto">
					<Header
						title={dashboardPageTitle.title}
						showIcon={dashboardPageTitle.showIcon}
						setSidebar={toggleSidebar}
						showNotification={user ? user?.unread_notifications : false}
					/>
					<div className="py-3 px-3 flex items-center gap-3 bg-lightBg md:hidden sticky top-[70px] z-30">
						{dashboardPageTitle.showIcon && (
							<Button
								size="sm"
								isIconOnly
								variant="flat"
								color="default"
								onClick={() => navigate(-1)}
							>
								<ArrowBack />
							</Button>
						)}
						<span className="text-lg justify-start font-semibold">
							{dashboardPageTitle.title}
						</span>
					</div>
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default DashboardLayout;
