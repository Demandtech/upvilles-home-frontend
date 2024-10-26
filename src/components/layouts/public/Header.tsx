import { useNavigate } from "react-router-dom";
import { LogoSvg } from "../../svgs";
import Button from "../../ui/Button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

export default function Header() {
  const navigate = useNavigate();
  return (
    <Navbar
      shouldHideOnScroll
      classNames={{ wrapper: "h-full max-w-[1220px]" }}
      className="bg-white sticky py-1 sm:py-0"
    >
      <NavbarBrand className="block w-full">
        <LogoSvg className="w-[60px] h-[50px] md:w-[122px] md:h-[86px]" />
      </NavbarBrand>
      <NavbarContent className="flex gap-4 !justify-end">
        <NavbarItem>
          <Button
            className="px-5 sm:px-10"
            size="sm"
            disabled={false}
            color="primary"
            type="button"
            ariaLabel="Login navigation button"
            onPress={() => navigate("/auth/login")}
          >
            Login
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="bordered"
            size="sm"
            disabled={false}
            color="default"
            type="button"
            className="px-5 sm:px-10 border-1"
            ariaLabel="Sign up navigation button"
            onPress={() => navigate("/auth/signup")}
          >
            Sign up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
