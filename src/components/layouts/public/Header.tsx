import { Link, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import logo from "../../../assets/images/logo.png";
import { Image } from "@nextui-org/image";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export default function Header() {
  const navigate = useNavigate();
  const {user} = useSelector((state: RootState) => state.dashboard);

  return (
    <Navbar
      shouldHideOnScroll
      classNames={{ wrapper: "h-full max-w-[1220px]" }}
      className="bg-white sticky py-1"
    >
      <NavbarBrand className="block w-full">
        <Link to="/">
          <Image className="w-16 md:w-28" src={logo} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="flex gap-4 !justify-end">
        {user ? (
          <NavbarItem>
            <Button
              variant="solid"
              size="sm"
              color="primary"
              type="button"
              className="px-5 sm:px-10 border-1"
              ariaLabel="Sign up navigation button"
              onClick={() => navigate("/dashboard/properties")}
            >
              Dashboard
            </Button>
          </NavbarItem>
        ) : (
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
        )}
      </NavbarContent>
    </Navbar>
  );
}
