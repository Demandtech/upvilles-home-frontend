import { FC } from "react";
import { Link } from "react-router-dom";
import { FacebookIconSvg, InstagramIconSvg } from "../../components/svgs";
import logo from "../../assets/images/logo.png";
import { Image } from "@nextui-org/image";

const Footer: FC = () => {
  return (
    <div>
      <div className="bg-lightGrey px-6 lg:px-10 py-10 lg:py-14">
        <div className="max-w-[1220px] gap-5 flex flex-col md:flex-row md:justify-between md:items-center mx-auto lg:px-12">
          <div>
            <Link to="/">
              <Image className="w-16 md:w-28" src={logo} />
            </Link>
            <p className="text-xs md:text-sm mt-2">
              Simplifying Property <br /> Management for a Smarter{" "}
              <br className="hidden md:block" /> Tomorrow...
            </p>
          </div>
          <div className="flex items-center gap-5 text-xs md:text-sm">
            <div className="md:border-l-2 md:pl-4 border-[#D0D0D0">
              <Link to="#">Privacy Policy</Link>
            </div>
            <div className="border-l-2 pl-4 border-[#D0D0D0]">
              <Link to="#">Terms and Conditions</Link>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="#">
              <FacebookIconSvg />
            </a>
            <a href="#">
              <InstagramIconSvg />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-2">
        <p className="text-xs md:text-sm font-medium text-default">
          &copy; {new Date().getFullYear()}. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
