import { Link, Outlet, useLocation } from "react-router-dom";
import { FC } from "react";
import { WhiteLogoSvg } from "../../svgs";

const AuthLayout: FC = () => {
  const { pathname } = useLocation();

  return (
    <main className="max-w-[1440px] mx-auto min-h-screen flex items-center justify-center">
      <div className="h-screen sm:h-[90vh] bg-primary w-screen sm:w-11/12 text-white sm:rounded-3xl">
        <div className="max-w-[600px] h-full overflow-auto p-5 mx-auto scrollbar-hide">
          <div className="flex flex-col gap-1 items-center">
            <Link to="/">
              <WhiteLogoSvg className="w-[60px] h-[50px] md:w-[122px] md:h-[86px]" />
            </Link>
            <h5 className="font-semibold text-lg md:text-2xl text-center">
              {pathname.includes("signup") &&
                "Create Your Upville Homes Account"}
              {pathname.includes("login") &&
                "Login To Your Upville Homes Account"}
              {pathname.includes("reset-password") &&
                "Forgot Your Upville Homes password?"}
            </h5>
            <p className="text-xs sm:text-sm text-center text-white/80">
              {pathname.includes("signup") &&
                "Join Upvile Homes Today and Simplify Your Property Management Journey."}
              {pathname.includes("login") &&
                "Please log in to access your account and maintain your propeerty"}
              {pathname.includes("reset-password") &&
                "Don't worry! Enter your email to reset it and regain access to your account."}
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
