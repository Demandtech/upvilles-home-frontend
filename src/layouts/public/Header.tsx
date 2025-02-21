import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/navbar";
import logo from "../../assets/images/logo.png";
import { Image } from "@nextui-org/image";
import UserDropdown from "./UserDropdown";

export default function Header({ name }: { name: string }) {
	const navigate = useNavigate();

	return (
		<Navbar
			shouldHideOnScroll
			classNames={{ wrapper: "h-full max-w-[1220px] py-2 lg:py-0" }}
			className="bg-white sticky py-1"
		>
			<NavbarBrand className="block w-full">
				<Link to="/">
					<Image className="w-20 md:w-28" src={logo} />
				</Link>
			</NavbarBrand>
			<NavbarContent className="flex gap-4 !justify-end">
				{!name ? (
					<>
						<NavbarItem>
							<Button
								className="px-5 sm:px-10"
								size="sm"
								color="primary"
								type="button"
								ariaLabel="Login navigation button"
								onClick={() => navigate("/auth/login")}
							>
								Login
							</Button>
						</NavbarItem>
						<NavbarItem>
							<Button
								variant="bordered"
								size="sm"
								color="default"
								type="button"
								className="px-5 sm:px-10 border-1"
								ariaLabel="Sign up navigation button"
								onClick={() => navigate("/auth/signup")}
							>
								Sign up
							</Button>
						</NavbarItem>
					</>
				) : (
					<UserDropdown name={name} />
				)}
			</NavbarContent>
		</Navbar>
	);
}
