import { FC } from "react";
import { Link } from "react-router-dom";
import { LogoSvg, FacebookIconSvg, InstagramIconSvg } from "../../svgs";

const Footer: FC = () => {
	return (
		<div>
			<div className="bg-lightGrey px-10 py-16">
				<div className="max-w-[1220px] gap-5 flex flex-col md:flex-row md:justify-between md:items-center mx-auto lg:px-12">
					<div>
						<Link to="/">
							<LogoSvg />
						</Link>
						<p className="mt-2">
							Simplifying Property <br /> Management for a Smarter <br />{" "}
							Tomorrow...
						</p>
					</div>
					<div className="flex items-center gap-5">
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
				<p className="text-xs md:text-sm font-semibold text-default">
					&copy; {new Date().getFullYear()}. All rights reserved
				</p>
			</div>
		</div>
	);
};

export default Footer;
