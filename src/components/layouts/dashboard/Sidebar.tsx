import {
	WhiteLogoSvg,
	SettingNavSvg,
	SupportNavSvg,
	DashboardNavSvg,
	ReportNavSvg,
	MaintenanceNavSvg,
	LogoutNavSvg,
	CameraIcon,
	EditIconSvg,
} from "../../svgs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { Avatar } from "@nextui-org/avatar";

const Sidebar = () => {
	const navigate = useNavigate();
	return (
		<div className="p-5 h-full flex gap-7 flex-col w-full">
			<div className="flex justify-center">
				<Link to="/">
					<WhiteLogoSvg className="w-[200px] h-[100px]" />
				</Link>
			</div>
			<div className="flex items-center flex-col">
				<div className="relative w-24 h-24 rounded-full">
					<Avatar
						src=""
						color="default"
						showFallback
						name="Ayomide Ifeoluwa"
						size="lg"
						className=" text-large w-full h-full text-white/80 mb-2"
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
				<p className="text-white">Ayomide Ifeoluwa</p>
			</div>
			<ul className="text-white space-y-3">
				<li className="">
					<NavLink
						className="w-full text-sm items-center px-3 py-2 flex gap-2 rounded-sm hover:bg-white/10 duration-200 ease-linear transition-background"
						to="/dashboard/properties"
					>
						<DashboardNavSvg />
						<span>Dashboard</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className="w-full text-sm items-center px-3 py-2 flex gap-2 rounded-sm hover:bg-white/10 duration-200 ease-linear transition-background"
						to="/dashboard/maintenance"
					>
						<MaintenanceNavSvg />
						<span>Maintenance Schedule</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className="w-full text-sm px-3 py-2 flex gap-2 rounded-sm hover:bg-white/10 duration-200 ease-linear transition-background"
						to="/dashboard/report"
					>
						<ReportNavSvg />
						<span>Report</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className="w-full text-sm px-3 py-2 flex gap-2 rounded-sm hover:bg-white/10 duration-200 ease-linear transition-background"
						to="/dashboard/notification"
					>
						<ReportNavSvg />
						<span>Notification</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className="w-full text-sm px-3 py-2 flex gap-2 rounded-sm hover:bg-white/10 duration-200 ease-linear transition-background"
						to="/dashboard/settings"
					>
						<SettingNavSvg />
						<span>Settings</span>
					</NavLink>
				</li>
			</ul>
			<NavLink
				className="w-full text-sm text-white items-center px-3 py-2 flex gap-2 rounded-sm hover:bg-white/10 duration-200 ease-linear transition-background"
				to="/dashboard/support"
			>
				<SupportNavSvg />
				<span>Support</span>
			</NavLink>
			<div className="mt-auto">
				<Button
					className="w-full text-sm justify-start px-3 rounded-sm"
					variant="light"
					color="danger"
					type="button"
					size="md"
					startContent={<LogoutNavSvg />}
					onPress={() => navigate("/auth/login")}
				>
					Log out
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
