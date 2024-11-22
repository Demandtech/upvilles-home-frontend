import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownTrigger,
	DropdownItem,
	DropdownMenu,
} from "@nextui-org/dropdown";
import {
	ChevronDownIcon,
	DashboardNavSvg,
	LogoutNavSvg,
} from "../../components/svgs";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/user";

function UserDropdown({ name }: { name: string }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		Cookies.remove("auth_token");
		dispatch(setUser({ user: null, stats: null }));
	};
	return (
		<div>
			<div className="flex items-center ">
				<div>
					{" "}
					<Avatar size="sm" color="primary" />
				</div>

				<Dropdown
					classNames={{
						content: "min-w-[150px]",
					}}
					className="rounded-none w-full"
				>
					<DropdownTrigger>
						<Button endContent={<ChevronDownIcon />} variant="flat">
							<p className="text-darkGrey">{name}</p>
						</Button>
					</DropdownTrigger>
					<DropdownMenu className="w-[145px]">
						<DropdownItem
							startContent={<DashboardNavSvg />}
							color="primary"
							key="dashboard"
							className="text-primary"
							onClick={() => navigate("/dashboard/properties")}
						>
							Dashboard
						</DropdownItem>
						<DropdownItem
							startContent={<LogoutNavSvg />}
							color="danger"
							key="logout"
							className="text-danger"
							onPress={handleLogout}
						>
							Log out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
}

export default UserDropdown;
