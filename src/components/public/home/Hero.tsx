import { FC } from "react";
import heroImg from "../../../assets/images/hero-img.png";
import { Image } from "@nextui-org/image";
import Button from "../../ui/Button";

import { useNavigate } from "react-router-dom";

const Hero: FC = () => {
	const navigate = useNavigate();
	return (
		<section className="bg-secondary pb-10 md:pb-0">
			<div className="flex flex-col-reverse md:items-center md:gap-10 lg:flex-row bg-secondary max-w-[1220px] mx-auto md:px-6">
				<div className="w-full space-y-5 px-6 md:px-0">
					<h1 className="text-2xl md:text-[3.1rem] font-semibold md:leading-[60px]">
						Streamline Your Property Management with Upville Homes.
					</h1>
					<p className="text-base text-accent">
						Effortlessly manage your assets, reduce downtime, and stay compliant
						with a comprehensive web-based platform tailored for property owners
						and managers in Nigeria
					</p>
					<Button
						variant="solid"
						size="lg"
						color="primary"
						type="button"
						className="px-16 border-1"
						onPress={() => navigate("/auth/signup")}
						ariaLabel="Sign up navigation button"
					>
						Sign up
					</Button>
				</div>
				<div className="w-full">
					<Image alt="Hero Image" src={heroImg} />
				</div>
			</div>
		</section>
	);
};

export default Hero;
