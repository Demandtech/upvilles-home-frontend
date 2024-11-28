import { Outlet, useNavigate } from "react-router-dom";
import { FC, useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { motion } from "framer-motion";
import { ArrowBack } from "../../components/svgs";
import Button from "../../components/ui/Button";

const DashboardLayout: FC = () => {
	const navigate = useNavigate();
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const { dashboardPageTitle } = useSelector((state: RootState) => state.app);
	const { user } = useSelector((state: RootState) => state.user);

	const toggleSidebar = useCallback(() => {
		if (windowWidth < 768) {
			setIsSidebarOpen((prev) => !prev);
		}
	}, [windowWidth]);

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
							image_uri={user?.image.url as string | undefined}
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
						<div className="text-lg justify-start font-semibold">
							{dashboardPageTitle.title}
						</div>
					</div>
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default DashboardLayout;
