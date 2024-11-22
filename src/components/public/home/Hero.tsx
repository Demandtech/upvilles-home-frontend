import { FC } from "react";
import heroImg from "../../../assets/images/hero-img.png";
import { Image } from "@nextui-org/image";
import Button from "../../ui/Button";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero: FC<{ name: string }> = ({ name }) => {
	const navigate = useNavigate();

	const headingVariant = {
		initial: { x: -20, opacity: 0 },
		visible: { x: 0, opacity: 1 },
	};

	return (
		<section className="bg-secondary pb-10 md:pb-0 lg:py-10">
			<div className="flex flex-col-reverse md:items-center md:gap-10 lg:flex-row bg-secondary max-w-[1220px] mx-auto md:px-6">
				<div className="w-full space-y-5 px-6 md:px-0">
					<div>
						<motion.h1
							initial="initial"
							animate="visible"
							variants={headingVariant}
							transition={{
								type: "spring",
								damping: 10,
								duration: 0.3,
								stiffness: 100,
								delay: 0.1,
							}}
							className="text-3xl md:text-[3.1rem] font-semibold md:leading-[60px]"
						>
							Streamline Your
						</motion.h1>
						<motion.h1
							initial="initial"
							animate="visible"
							variants={headingVariant}
							transition={{
								type: "spring",
								damping: 20,
								stiffness: 200,
								duration: 0.3,
								delay: 0.2,
							}}
							className="text-3xl md:text-[3.1rem] font-semibold md:leading-[60px]"
						>
							Property Management
						</motion.h1>
						<motion.h1
							initial="initial"
							animate="visible"
							variants={headingVariant}
							transition={{
								type: "spring",
								stiffness: 300,
								damping: 30,
								duration: 0.3,
								delay: 0.3,
							}}
							className="text-3xl md:text-[3.1rem] font-semibold md:leading-[60px]"
						>
							with Upville Homes.
						</motion.h1>
					</div>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="text-base text-accent"
					>
						Effortlessly manage your assets, reduce downtime, and stay compliant
						with a comprehensive web-based platform tailored for property owners
						and managers in Nigeria
					</motion.p>
					<Button
						variant="solid"
						size="lg"
						color="primary"
						type="button"
						className="px-16 border-1"
						onPress={() =>
							navigate(name ? "/dashboard/properties" : "/auth/signup")
						}
						ariaLabel="Sign up navigation button"
					>
						{name ? "Dashboard" : "Sign up"}
					</Button>
				</div>
				<div className="w-full min-h-[300px]">
					<Image
						classNames={{
							img: "object-cover object-center",
						}}
						width={"100%"}
						alt="Hero Image"
						src={heroImg}
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
