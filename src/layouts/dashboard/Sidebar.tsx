import { motion } from "framer-motion";
import {
	SettingNavSvg,
	SupportNavSvg,
	DashboardNavSvg,
	ReportNavSvg,
	MaintenanceNavSvg,
	LogoutNavSvg,
	CameraIcon,
	EditIconSvg,
	CloseIcon,
} from "../../components/svgs";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import whitelogo from "../../assets/images/white-logo.png";
import { setLogout } from "../../redux/slices/user";
import { useDispatch } from "react-redux";

const Sidebar = ({
	name,
	image_uri,
	onSidebarClose,
	isSidebarOpen,
}: {
	name: string | undefined;
	image_uri: string | undefined;
	onSidebarClose: () => void;
	isSidebarOpen: boolean;
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		navigate("/auth/login");
		dispatch(setLogout());
	};

	const linkVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: { opacity: 1, x: 0 },
	};

	return (
		<div className="p-5 h-full relative flex gap-7 flex-col w-full">
			<Button
				onPress={onSidebarClose}
				className="absolute right-3 md:hidden rounded-full"
				isIconOnly
			>
				<CloseIcon />
			</Button>
			<div className="flex justify-center">
				<Image src={whitelogo} className="w-28 sm:w-36" />
			</div>
			<div className="flex items-center flex-col">
				<div className="relative h-20 w-20 sm:w-24 sm:h-24 rounded-full">
					<Avatar
						src={image_uri}
						color="default"
						showFallback
						name={name}
						className=" text-large h-full w-full text-white/80 mb-2"
						fallback={<CameraIcon />}
					/>
					<Button
						className="absolute shadow-sm bg-[#003566;] -right-4 bottom-2 rounded-full"
						isIconOnly={true}
						type="button"
						size="md"
					>
						<EditIconSvg />
					</Button>
				</div>
				<p className="text-white">{name}</p>
			</div>
			<ul className="text-white space-y-0.5">
				{[
					{
						to: "/dashboard/properties",
						icon: <DashboardNavSvg />,
						label: "Dashboard",
					},
					{
						to: "/dashboard/maintenance",
						icon: <MaintenanceNavSvg />,
						label: "Maintenance Schedule",
					},
					{ to: "/dashboard/report", icon: <ReportNavSvg />, label: "Report" },
					{
						to: "/dashboard/notifications",
						icon: <ReportNavSvg />,
						label: "Notification",
					},
					{
						to: "/dashboard/settings",
						icon: <SettingNavSvg />,
						label: "Settings",
					},
					{
						to: "/dashboard/support",
						icon: <SupportNavSvg />,
						label: "Support",
					},
				].map((link, index) => (
					<motion.li
						key={link.to}
						variants={linkVariants}
						initial="hidden"
						animate={isSidebarOpen ? "visible" : ""}
						transition={{ duration: 0.4, delay: index * 0.1 }}
						className="w-full"
					>
						<NavLink
							className="w-full text-sm p-3 flex gap-2 rounded-sm hover:bg-white/10 transition-all ease-linear"
							to={link.to}
							onClick={onSidebarClose}
						>
							{link.icon}
							<span>{link.label}</span>
						</NavLink>
					</motion.li>
				))}
			</ul>
			<div className="mt-auto mb-4">
				<Button
					className="w-full text-sm justify-start px-3 rounded-sm text-danger bg-white"
					variant="solid"
					type="button"
					size="md"
					startContent={<LogoutNavSvg />}
					onPress={handleLogout}
				>
					Log out
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
