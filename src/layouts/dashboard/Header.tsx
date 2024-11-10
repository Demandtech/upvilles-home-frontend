import { ChangeEvent, useCallback, useState } from "react";
import Button from "../../components/ui/Button";
import { Input } from "@nextui-org/input";
import {
	NotificationIconSvg,
	SearchIconSvg,
	ArrowBack,
} from "../../components/svgs";
import { debounce } from "../../utils/debounce";
import { useNavigate, useLocation } from "react-router-dom";
import { HamburgerIcon } from "../../components/svgs";

const Header = ({
	title,
	showIcon,
	setSidebar,
}: {
	title: string;
	showIcon: boolean;
	setSidebar: () => void;
}) => {
	const [searchValue, setSearchValue] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	async function searchDate(query: string) {
		setSearchValue(query);
	}

	const handleSearch = useCallback(debounce(searchDate, 500), []);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		handleSearch(event.target.value);
	}

	return (
		<div
			id="dashboard-header"
			className={`${
				location.pathname.includes("tenants") ||
				location.pathname.includes("maintenance/add") ||
				location.pathname.includes("maintenance/update") ||
				location.pathname.includes("notification") ||
				location.pathname.includes("setting") ||
				location.pathname.includes("support") ||
				location.pathname.includes("report")
					? "bg-white"
					: "bg-lightBg"
			} px-3 py-3 sm:py-5 sm:px-5 sticky top-0 z-40`}
		>
			<div className="flex gap-3 justify-between items-center">
				<div className="flex items-center">
					{showIcon && (
						<Button
							type="button"
							variant="light"
							size="sm"
							className="bg-transparent text-default justify-start px-0 min-w-[30px] pr-5 hidden md:block"
							onPress={() => navigate(-1)}
						>
							<ArrowBack />
						</Button>
					)}
					<Button
						variant="flat"
						color="default"
						className="md:hidden rounded-full"
						type="button"
						isIconOnly
						onClick={setSidebar}
					>
						<HamburgerIcon />
					</Button>
					<p
						className={`font-semibold hidden md:block  text-2xl lg:min-w-28 text-nowrap`}
					>
						{title}
					</p>
				</div>
				<div className="w-full max-w-sm">
					<Input
						startContent={
							<Button
								variant="light"
								className="border-rounded rounded-full"
								size="sm"
								type="button"
								isIconOnly
								disabled
							>
								<SearchIconSvg />
							</Button>
						}
						type="text"
						size="md"
						name="search"
						placeholder="Search property, tenants... "
						required={false}
						onChange={handleChange}
						value={searchValue}
					/>
				</div>
				<div>
					<Button
						variant="flat"
						className="border-rounded rounded-full"
						size="md"
						type="button"
						isIconOnly
						onClick={() => navigate("/dashboard/notifications")}
					>
						<NotificationIconSvg />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Header;
